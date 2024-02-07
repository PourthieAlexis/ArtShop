
import { createGlobalStyle } from "styled-components";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Accueil from "./Components/Accueil/Accueil";
const GlobalStyle = createGlobalStyle`
  body {  
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

`;
function App() {
  return (
    <div>
      <GlobalStyle />
      <Accueil />
    </div>
  );
}

export default App;
