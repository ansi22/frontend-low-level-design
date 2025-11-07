import React, { useState } from "react";

import {
  addNodeToList,
  deleteNodeFromList,
  editNode,
  folderData,
} from "./data";
import List from "./components/list";

export default function App() {
  const [data, setData] = useState<any>(folderData);

  return (
    <div>
      <h1>File Explorer</h1>
      <List
        list={data}
        addNodeToList={addNodeToList}
        deleteNodeFromList={deleteNodeFromList}
        editNode={editNode}
        setData={setData}
      />
    </div>
  );
}
