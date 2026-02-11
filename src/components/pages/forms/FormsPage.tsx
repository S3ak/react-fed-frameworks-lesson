// import DugnadRegistrationForm from "../../ui/dugnad/Dugnad";
// import ValidatedNameForm from "../../ui/forms/validated-name-form/ValidatedNameForm";
// import SimpleNameForm from "../../ui/simple-name-form/SimpleNameForm";
// import RHFSimpleNameForm from "../../ui/simple-name-form/SimpleNameFormWithRHF";
import RHFDugnadForm from "../../ui/dugnad/DugnadWithRHF";
import RHFDugnadFormWithZOD from "../../ui/dugnad/DugnadWithRHFZOD";
import RHFSimpleNameFormWithZod from "../../ui/simple-name-form/SimpleNameFormWithRHFZOD";

function FormsPage() {
  return (
    <div>
      <h1>Forms Page</h1>
      <RHFDugnadFormWithZOD />
      {/* <RHFSimpleNameFormWithZod /> */}
      {/* <RHFDugnadForm /> */}
      {/* <RHFSimpleNameForm /> */}
      {/* <ValidatedNameForm /> */}
      {/* <SimpleNameForm /> */}
      {/* <DugnadRegistrationForm /> */}
    </div>
  );
}

export default FormsPage;
