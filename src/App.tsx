import { FlowList } from "./flowList";

const data = Array.from({ length: 50 }, (_, i) => {
  return {
    id: i,
    name: `gholi-${i}`,
  };
});

const App = () => {
  return (
    <div style={{ padding: 50 }}>
      <FlowList
        data={data}
        renderItem={({ name }) => <div>{name}</div>}
        width={820}
        itemSize={[80]}
      />
    </div>
  );
};

export default App;
