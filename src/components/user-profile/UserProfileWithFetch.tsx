import useFetch from "../../hooks/fetch/useFetch";
import type { User } from "../../types";
// import styles from "./UserProfile.module.css";

interface IProps {
  userId: string | number;
}

export default function UserProfileWithFetch({ userId }: IProps) {
  const {
    isLoading,
    error,
    data: user,
  } = useFetch<User>(`https://dummyjson.com/users/${userId}`);

  if (isLoading) return <p>Laster profil...</p>;
  if (error) return <p>Feil: {error}</p>;
  if (!user) return <p>Ingen brukerdata.</p>;

  return (
    <div style={{ border: "1px solid grey", margin: "10px", padding: "10px" }}>
      <h1>{user.firstName}</h1>
      <p>E-post: {user.email}</p>
    </div>
  );
}
