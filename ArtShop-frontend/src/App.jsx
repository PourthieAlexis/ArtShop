
import { createGlobalStyle } from "styled-components";
import "./App.css";
import Auth from "./components/Auth/Auth";

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
      <Auth />
    </div>
  );
}

export default App;
