import resend from "@/lib/resend";
import EmailPasswordReset from "@/emails/password/email-password-reset";

type SendEmailPasswordResetParams = {
  name: string, email: string, url: string
}

const sendEmailInvitation = async ({name, email, url}: SendEmailPasswordResetParams) => {

  const result = await resend.emails.send({
    from: 'email@mardev.ru',
    to: [email],
    subject: 'Invitation',
    react: <EmailPasswordReset toName={name} url={url}/>,
  });
  

  if (result.error) {
    console.log("error = ", result.error) ;
  }
  
  return result
}

export default sendEmailInvitation;
