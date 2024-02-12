import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { createGlobalStyle } from "styled-components";
import "./App.css";

const GlobalStyle = createGlobalStyle`
  body {  
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }
`;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <main>
        <GlobalStyle />
        <Routes />
      </main>
    </BrowserRouter>
  );
};

export default App;
