import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [chips, setChips] = useState<any>([]);

  const onkeydownHandler = (e: any) => {
    if (e.key === "Enter" && input.trim() !== "") {
      setChips((prev: any) => [...prev, input]);
      setInput("");
    }
  };

  const handleRemoveChip = (index: any) => {
    const copyChips = [...chips];
    copyChips.splice(index, 1);
    setChips(copyChips);
  };

  return (
    <div className="container">
      <h1>Chip Input</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => onkeydownHandler(e)}
      />
      {chips && (
        <div className="chipsArray">
          {chips.map((chip: any, index: number) => {
            return (
              <p
                key={index}
                className="chip"
                onClick={() => {
                  handleRemoveChip(index);
                }}
              >
                {chip}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
