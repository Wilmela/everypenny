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
  //   from: string;
  //   to: string;
  firstName: string;
};
const WelcomeTemplate = ({ firstName }: Props) => {
  return (
    <Html>
      <Head />
      <Font
        fontFamily="Karla"
        fallbackFontFamily="Verdana"
        webFont={{
          url: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Preview>Make Every Penny Count!.</Preview>
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
            <Text>Hello {firstName}</Text>
            <Section>
              <Text className="text-2xl">Welcome to Every Penny</Text>
              <Link
                href="https://www.everypenny.ng"
                className="text-white border border-green-500 rounded-md p-4 w-fit"
              >
                Visit
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeTemplate;
