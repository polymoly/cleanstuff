import { useState } from "react";
import { Text, View } from "reactjs-view";
import { DataTypes, useFaker } from "./stuffs/faker";
import { InfiniteView } from "./stuffs/infiniteLoader";

const model = {
  name: DataTypes.STRING,
  age: DataTypes.NUMBER,
};

const App = () => {
  const data = useFaker(model, 1000, "en");
  const [page, setPage] = useState<number>(0);

  return (
    <div style={{ padding: 50 }}>
      <InfiniteView
        data={data.slice(0, page + 20)}
        next={() => setPage((prev) => prev + 20)}
        width={300}
        height={400}
        itemSize={60}
      >
        {({ name, age }) => (
          <View
            style={{
              width: "100%",
              minHeight: 60,
              background: "teal",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              paddingInline: 12,
              paddingBlock: 16,
              borderBottom: "1px solid #ccc",
            }}
          >
            <Text size={14} color="#fff">
              {name}
            </Text>
            <Text size={14} color="#fff">
              {age}
            </Text>
          </View>
        )}
      </InfiniteView>
    </div>
  );
};

export default App;
