import { useState } from "react";
import "./App.css";
import "./Components/Connexion/Connexion";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        Allo
        <Connexion/>
      </div>
    </>
  );
}

export default App;
