import { CircularSkeleton } from "./stuffs/loader/circular";

function App() {
  return (
    <CircularSkeleton isLoading={true}>
      <div>app</div>
    </CircularSkeleton>
  );
}

export default App;
