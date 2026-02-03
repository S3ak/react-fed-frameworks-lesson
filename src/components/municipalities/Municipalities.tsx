import Card from "../card/Card";

const municipalities = [
  { title: "Oslo" },
  { title: "Stavanger" },
  { title: "Bergen" },
  { title: "Trondheim" },
  { title: "Tromsø" },
];

const mWithIds = municipalities.map((m) => {
  return {
    ...m,
    id: crypto.randomUUID(),
  };
});

export default function MunicipalityList() {
  // Render the array of list items inside a <ul>
  return (
    <div>
      <h2>Norske Kommuner</h2>
      <ul>
        {mWithIds.map(({ id, title }, index) => (
          <Card title={title} key={id}>
            id: {id}
            idnex: {index}
          </Card>
        ))}
      </ul>
    </div>
  );
}
