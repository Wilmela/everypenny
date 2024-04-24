import {
  Head,
  Html,
  Container,
  Text,
  Section,
  Preview,
  Link,
  Font,
  Tailwind,
  Body,
} from "@react-email/components";

type Props = {
  regId: string;
  email: string;
  firstName: string;
};
const ContributionTemplate = ({ firstName, regId, email }: Props) => {
  return (
    <Html>
      <Head />
      <Font
        fontFamily="Karla"
        fallbackFontFamily="Verdana"
        webFont={{
          url: "https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Preview>Make Every Penny Count</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: "#36ee2f",
                accent: "#e9e6d4",
              },
            },
          },
        }}
      >
        <Body>
          <Container>
            <Text>Hello Admin</Text>
            <Section>
              <Text>
                User with name: {firstName}, email: {email} and regId: {regId}{" "}
                just made a contribution awaiting verification.
              </Text>
              <Link href="https://www.everypenny.ng">Visit</Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContributionTemplate;
