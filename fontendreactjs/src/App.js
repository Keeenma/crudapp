import React from "react";
import TheRouter from "./router";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
      </div>
      <TheRouter />
    </div>
  );
}

export default App;
