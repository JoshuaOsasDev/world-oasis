import Heading from "../ui/Heading/Heading";
import Row from "../ui/Row/Row";

function Account() {
  return (
    <>
      <Heading as="1">Update your account</Heading>

      <Row>
        <Heading as="3">Update user data</Heading>
        <p>Update user data form</p>
      </Row>

      <Row>
        <Heading as="3">Update password</Heading>
        <p>Update user password form</p>
      </Row>
    </>
  );
}

export default Account;
