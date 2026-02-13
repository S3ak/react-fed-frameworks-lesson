import Card from "../../../components/card/Card";
import UserProfile from "../../../components/user-profile/UserProfile";
import EventCard from "../../../components/event-card/EventCard";
import Counter from "../../../components/counter/Counter";
import UserSettings from "../../../components/user-settings/UserSettings";
import ToggleMessage from "../../ui/toggle-message/ToggleMessage";
import NameInput from "../../../components/name-input/NameInput";
import LoadingIndicator from "../../../components/loading-indicator/LoadingIndicator";
import MunicipalityList from "../../../components/municipalities/Municipalities";
import InputLogger from "../../../components/input-logger/InputLogger";
import UserGreeting from "../../../components/user-greeting/UserGreeting";
import Timer from "../../../components/timer/Timer";
import MouseTracker from "../../../components/mouse-tracker/MouseTracker";
import { useEffect, useState } from "react";
import UserContext from "../../../hooks/user/UserContext";
import type { OptionalUser, User } from "../../../types";

function HomePage() {
  const [user, setUser] = useState<OptionalUser>({});

  const alertMe = () => {
    alert("Foo");
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://dummyjson.com/users/${2}`);
      const data: User = await res.json();

      setUser(data);
    }

    fetchData();
  }, []);

  return (
    <>
      <main>
        <section>
          <UserContext.Provider value={user}>
            <hr />
            <MouseTracker />
            <hr />
            <Timer />
            <hr />
            <UserGreeting />
            <hr />
            <InputLogger />
            <hr />
            {/* <SafeCounter /> */}
            <hr />
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
          </UserContext.Provider>
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
    </>
  );
}

export default HomePage;
