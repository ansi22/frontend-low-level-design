import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<any>([]);
  const [cache, setCache] = useState<any>([]);

  const fetchData = async () => {
    if (cache[input]) {
      setResults(cache[input]);
      return;
    }
    const data = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const json = await data.json();
    setResults(json?.recipes);
    setCache((prev: any) => ({ ...prev, [input]: json?.recipes }));
  };

  useEffect(() => {
    const intervalId = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearInterval(intervalId);
  }, [input]);

  return (
    <div className="container">
      <h1>Auto Complete</h1>
      <input
        type="text"
        className="searchInput"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
      />

      {input && results && (
        <div className="displayContainer">
          {results.map((recipe: any) => {
            return (
              <p key={recipe.id} className="displayRecipe">
                {recipe.name}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
