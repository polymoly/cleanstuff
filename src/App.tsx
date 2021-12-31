import { View } from "reactjs-view";
import { ActionView } from "./stuffs/actionView";
import { useStyles } from "./style";

function App() {
  const classes = useStyles();

  return (
    <View style={{ padding: 50 }}>
      <ActionView
        onPress={() => {}}
        className={classes.action}
        interactions={{
          whenActive: classes.active,
          whenHovered: classes.hover,
        }}
      >
        سلام من به تو یار قدیمی
      </ActionView>
    </View>
  );
}

export default App;
