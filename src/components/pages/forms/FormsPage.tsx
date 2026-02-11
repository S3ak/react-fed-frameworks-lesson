// import DugnadRegistrationForm from "../../ui/dugnad/Dugnad";
// import ValidatedNameForm from "../../ui/forms/validated-name-form/ValidatedNameForm";
// import SimpleNameForm from "../../ui/simple-name-form/SimpleNameForm";
import RHFSimpleNameForm from "../../ui/simple-name-form/SimpleNameFormWithRHF";

function FormsPage() {
  return (
    <div>
      <h1>Forms Page</h1>
      <RHFSimpleNameForm />
      {/* <ValidatedNameForm /> */}
      {/* <SimpleNameForm /> */}
      {/* <DugnadRegistrationForm /> */}
    </div>
  );
}

export default FormsPage;
