import Card from "./components/card/Card";
import Footer from "./components/footer/Footer";
import UserProfile from "./components/user-profile/UserProfile";
import EventCard from "./components/event-card/EventCard";
import Counter from "./components/counter/Counter";
import UserSettings from "./components/user-settings/UserSettings";
import ToggleMessage from "./components/toggle-message/ToggleMessage";
import NameInput from "./components/name-input/NameInput";
import LoadingIndicator from "./components/loading-indicator/LoadingIndicator";
import MunicipalityList from "./components/municipalities/Municipalities";

function App() {
  const alertMe = () => {
    alert("Foo");
  };

  return (
    <>
      <header>
        <h1>React Website</h1>
        <p>We are learning how to use react</p>
      </header>

      <main>
        <section>
          <MunicipalityList />
          <hr />
          <Counter />
          <hr />
          <UserSettings />
          <hr />
          <ToggleMessage handleOnClick={alertMe}>FOO BAR</ToggleMessage>
          <hr />
          <NameInput />
          <hr />
          <LoadingIndicator />
        </section>
        <section title="event-section">
          <EventCard
            title="17. mai-feiring"
            date="2024-05-17"
            location="Slottsplassen, Oslo"
          />
        </section>

        <section title="BrukerInfo Section">
          <Card title="Brukerinfo">
            <UserProfile name="Kari Nordmann" city="Bergen" age={30} isActive />
          </Card>

          <Card title="Brukerinfo">
            {" "}
            <UserProfile
              name="Ola Nordmann"
              city="Trondheim"
              age={25}
              isActive={false}
            />
          </Card>
        </section>

        <Card>
          {/* This paragraph and button are passed as props.children to Card */}
          <p>Dette er annet innhold i et kort uten tittel.</p>
          <button>En knapp</button>
        </Card>
      </main>

      <Footer />
    </>
  );
}

export default App;
