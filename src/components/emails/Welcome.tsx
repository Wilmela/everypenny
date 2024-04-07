import {
  Head,
  Html,
  Container,
  Text,
  Section,
  Preview,
} from "@react-email/components";

type Props = {
//   from: string;
//   to: string;
  message: string;
};
const Welcome = ({ message }: Props) => {
  return (
    <Html>
      <Head>
        <title>Welcome to Every Penny</title>
      </Head>
      <Preview>{`Message from ${message}`}</Preview>

      <Container>
        <Text>Welcome, Please verify</Text>
        <Section>
          {/* <Text>{from}</Text>
          <Text>{to}</Text> */}
          <Text>{message}</Text>
        </Section>
      </Container>

    </Html>
  );
};

export default Welcome;
