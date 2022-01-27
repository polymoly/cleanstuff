import { View } from "reactjs-view";
import { SplitView } from "./stuffs/splitView";

const App = () => {
  return (
    <View style={{ padding: 50, height: "100%" }}>
      <SplitView shouldPersist>
        <SplitView.Pane>
          <View style={{ flex: 1, background: "red" }}>child 1</View>
        </SplitView.Pane>
        <SplitView.Pane>
          <View style={{ flex: 1, background: "blue" }}>child 2</View>
        </SplitView.Pane>
      </SplitView>
    </View>
  );
};

export default App;
