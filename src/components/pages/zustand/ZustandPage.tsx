import useName from "../../../hooks/name/nameStore";

function ZustandPage() {
  const firstName = useName((state) => state.firstName);
  const lastName = useName((state) => state.lastName);
  const handleFirstNameChange = useName((state) => state.updateFirstName);
  const handleLastNameChange = useName((state) => state.updateLastName);
  return (
    <div>
      <h1>This page demostrates state management</h1>

      <section>
        <form action="">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => handleFirstNameChange(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => handleLastNameChange(e.target.value)}
            />
          </div>
        </form>
      </section>
    </div>
  );
}

export default ZustandPage;
