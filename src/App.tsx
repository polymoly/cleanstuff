import "antd/dist/antd.css";
import { DataTypes, useFaker } from "./stuffs/faker";
import { Button, Wrapper } from "./stuffs/styled";

const model = {
  id: DataTypes.NUMBER,
  name: DataTypes.STRING,
  createData: DataTypes.DATE,
  isActive: DataTypes.BOOLEAN,
};

function App() {
  const data = useFaker(model, 10);
  console.log(data);
  return (
    <div style={{ margin: 50 }}>
      <Wrapper
        size={40}
        color={"green"}
        style={{ background: "#ccc" }}
        onClick={() => console.log("a")}
      >
        gholi
      </Wrapper>
      <Button onClick={(e: any) => e.preventDefault()} width={300}>
        add
      </Button>
    </div>
  );
}

export default App;
