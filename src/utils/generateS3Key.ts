import {Entity} from "@prisma/client";

type generateS3KeyArgs = {
  organizationId: string,  
  fileName: string,
  attachmentId: string,
  entityId: number | string,
  entity: Entity,
}

export const generateS3Key = ({
                                organizationId,
                                entityId,
                                entity,
                                fileName,
                                attachmentId
                              }: generateS3KeyArgs) => {
  return `${organizationId}/${entity}/${entityId}/${fileName}-${attachmentId}`
}