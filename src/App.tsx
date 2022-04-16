import { Select } from "./stuffs/select";

const options = [
  {
    label: "gholi 1",
    value: 1,
  },
  {
    label: "gholi 2",
    value: 2,
  },
  {
    label: "gholi 3",
    value: 3,
  },
];

const App = () => {
  return (
    <div style={{ padding: 120 }}>
      <Select options={options} wrapperStyle={{ marginTop: 200 }} />
    </div>
  );
};

export default App;
