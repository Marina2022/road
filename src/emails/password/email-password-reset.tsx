import React from 'react';
import {Html} from "@react-email/html";
import {Body} from "@react-email/body";
import {Container} from "@react-email/container";
import {Head} from "@react-email/head";
import {Section} from "@react-email/section";
import {Text} from "@react-email/text";
import {Button} from "@react-email/button";
import {Tailwind} from "@react-email/tailwind";

type EmailPasswordResetProps = {
  toName: string,
  url: string
}

const EmailPasswordReset = ({toName, url}: EmailPasswordResetProps) => {
  return (
    <Html>
      <Head/>
      <Tailwind>
        <Body className="font-sans m-8 text-center">
          <Container>
            <Section>
              <Text>
                Hello, {toName}! You have requested to reset your password. Click the button below to reset your
                password.
              </Text>
            </Section>
            <Section>
              <Button className="bg-black rounded text-white p-2 px-4 m-2 cursor-pointer" href={url}>Reset Password</Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailPasswordReset.PreviewProps = {toName: "Мариночка", url: "http://localhost:3000/"};

export default EmailPasswordReset;