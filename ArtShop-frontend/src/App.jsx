
import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import "./App.css";

const GlobalStyle = createGlobalStyle`
  body {  
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

`;
function App() {
  return (
    <BrowserRouter>
      <main>
        <GlobalStyle />
        <Routes />
      </main>
    </BrowserRouter>
  );
}

export default App;
