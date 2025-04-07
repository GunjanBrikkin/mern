import FrontFile from "./components/view.jsx";
import Header from "../src/components/Header.jsx";
import TaskDeatiles from "../src/components/taskDeatiles.jsx";
import { useState } from "react";

function App() {
  const [refreshList, setRefreshList] = useState(false);

  return (
    <div>
      <Header />
      <TaskDeatiles
        onCreate={() => {
          console.log("onCreate triggered 🚀");
          setRefreshList((pre) => !pre); // here we also write refreshList in place of pre
        }}
      />
      <FrontFile refresh={refreshList} />
    </div>
  );
}

export default App;
