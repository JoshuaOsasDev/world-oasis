import Heading from "../ui/Heading/Heading";
import UpdateSetting from "../features/settings/UpdateSettingsForm";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Row from "../ui/Row/Row";
function Settings() {
  return (
    <Row>
      <Heading as="1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
