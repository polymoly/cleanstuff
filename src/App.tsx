import { Page1 } from "./page1";
import { withObserve } from "./stuffs/responsive/withObserve";

const App = withObserve(({ observationRef }) => {
  return (
    <div
      ref={observationRef}
      style={{
        height: 600,
        width: 600,
        maxWidth: "100%",
        padding: 50,
        background: "#ccc",
      }}
    >
      <Page1 />
    </div>
  );
});

export default App;
