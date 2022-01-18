import { useState } from "react";
import { View } from "reactjs-view";
import { InfinitePager } from "./stuffs/infinitePager";

const data = Array.from({ length: 200 }, (_, i) => {
  return {
    id: i,
    title: `item-${i}`,
  };
});

const App = () => {
  const [page, setPage] = useState<number>(0);

  return (
    <div style={{ padding: 50 }}>
      <InfinitePager
        total={200}
        height={500}
        width={350}
        threshold={0.9}
        data={data.slice(0, page + 20)}
        itemSize={44}
        next={() => {
          console.log("reached!");
          setPage((p) => p + 20);
        }}
      >
        {({ title }) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              background: "#ccc",
              color: "#222",
              width: "100%",
              flex: 1,
            }}
          >
            {title}
          </View>
        )}
      </InfinitePager>
    </div>
  );
};

export default App;
