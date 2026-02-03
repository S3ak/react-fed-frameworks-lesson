import { useContext, useEffect, useState } from "react";
import UserContext from "../../hooks/user/UserContext";
import type { OptionalUser } from "../../types";

function UserGreeting() {
  const [userX, setUserX] = useState<OptionalUser>({});
  const [searchName, setSearchName] = useState("");
  const { id } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      const data = await res.json();

      setUserX(data);
    }

    fetchData();
  }, [id]);

  return (
    <div>
      <label htmlFor="changeUser">Change User</label>
      <input
        type="text"
        value={searchName}
        onChange={(e) => {
          setSearchName(e.target.value);
        }}
      />
      <h2>Hello {userX?.firstName}</h2>
    </div>
  );
}

export default UserGreeting;
