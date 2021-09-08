import { AvatarSkeleton } from "./stuffs/loader/avatar";
import { CardSkeleton } from "./stuffs/loader/card";
import { LabelSkeleton } from "./stuffs/loader/label";
import { SimpleSkeleton } from "./stuffs/loader/simple";

function App() {
  return (
    <div style={{ margin: 50 }}>
      <CardSkeleton isLoading={true}>
        <div>hello</div>
      </CardSkeleton>
    </div>
  );
}

export default App;
