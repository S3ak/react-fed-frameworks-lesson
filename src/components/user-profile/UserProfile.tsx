import styles from "./UserProfile.module.css";

interface IProps {
  name: string;
  city: string;
  age: number;
  isActive?: boolean;
}

export default function UserProfile({ name, city, age, isActive }: IProps) {
  // Accessing the props using dot notation
  return (
    <div style={{ border: "1px solid grey", margin: "10px", padding: "10px" }}>
      <h2>Navn: {name}</h2>
      <p>By: {city}</p>
      <p>Alder: {age}</p>
      <p
        style={{
          color: isActive ? "green" : "red",
        }}
      >
        Status: {isActive ? "Aktiv" : "Inaktiv"}
      </p>
    </div>
  );
}
