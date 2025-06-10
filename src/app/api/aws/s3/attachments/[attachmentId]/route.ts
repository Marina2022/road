import {prisma} from "@/lib/prismaClient";
import {NextRequest} from "next/server";
import {getAuthOrRedirect} from "@/utils/authUtils";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {s3} from "@/lib/aws";
import {GetObjectCommand} from "@aws-sdk/client-s3";
import {generateS3Key} from "@/utils/generateS3Key";
import {isComment, isTicket} from "@/features/attachments/types";


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ attachmentId: string }> }
) {
  await getAuthOrRedirect();

  const { attachmentId } = await params;

  const attachment = await prisma.attachment.findUniqueOrThrow({
    where: { id: attachmentId },
    include: { ticket: true, comment: {include: {ticket: true}} },    
  });
  
  const subject = attachment.ticket ?? attachment.comment
  if (!subject) throw new Error('Invalid subject');

  let organizationId = ''

  switch (attachment.entity) {
    case 'TICKET':
      if (isTicket(subject))
        organizationId = subject.organizationId as string
      break
    case 'COMMENT':
      if (isComment(subject))
        organizationId = subject.ticket.organizationId as string
      break
    default: throw new Error('Unknown entity')
  }
  
  
  const presignedUrl = await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: generateS3Key({
        organizationId,
        entityId: subject.id,
        entity: attachment.entity,
        fileName: attachment.name ,
        attachmentId
      }),
    }),
    { expiresIn: 5 * 60 }
  );

  const s3Response = await fetch(presignedUrl);

  if (!s3Response.ok || !s3Response.body) {
    return new Response("Ошибка загрузки файла из S3", { status: 500 });
  }

  const headers = new Headers();

  // копируем важные заголовки из ответа S3
  const contentType = s3Response.headers.get("Content-Type") || "application/octet-stream";
  const contentLength = s3Response.headers.get("Content-Length");

  headers.set("Content-Type", contentType);
  if (contentLength) {
    // headers.set("Content-Length", contentLength);


    const contentType = s3Response.headers.get("Content-Type") || "application/octet-stream";
    headers.set("Content-Type", contentType);  }

  // заголовок Content-Disposition для скачивания
  const encodedName = encodeURIComponent(attachment.name);
  headers.set("Content-Disposition", `attachment; filename*=UTF-8''${encodedName}`);

  return new Response(s3Response.body, {
    status: 200,
    headers,
  });
}
