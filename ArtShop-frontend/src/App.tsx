import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import styled, { createGlobalStyle } from "styled-components";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getToken, isTokenValid } from "./services/tokenServices";
import { signIn } from "./reducers/authenticationSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Epilogue from '../public/fonts/Epilogue-VariableFont_wght.ttf'

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Epilogue';
  src: url(${Epilogue}) format('truetype');

}

  body {  
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Epilogue-VariableFont_wght', sans-serif;
  }
`;


const queryClient = new QueryClient()


const App: React.FC = () => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token && isTokenValid(token)) dispatch(signIn(token));
    setIsLogin(false);
  }, []);

  if (isLogin) return null;

  return (
    <BrowserRouter>
      <Main>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <Routes />
        </QueryClientProvider>
        <ToastContainer />
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.main`
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
`

export default App;
