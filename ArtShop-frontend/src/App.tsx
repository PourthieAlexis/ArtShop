import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { createGlobalStyle } from "styled-components";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const GlobalStyle = createGlobalStyle`
  body {  
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }
`;

const queryClient = new QueryClient()


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <main>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <Routes />
        </QueryClientProvider>
      </main>
    </BrowserRouter>
  );
};

export default App;
