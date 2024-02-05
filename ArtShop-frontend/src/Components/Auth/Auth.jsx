import styled from 'styled-components';
import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import PropTypes from 'prop-types';

const Auth = ({ page }) => {
  const [isSignUp, setIsSignUp] = useState(page === "Register" ? true : false);

  const toggleForm = (isSignUp) => {
    setIsSignUp(isSignUp);
  };

  return (
    <>
      <Logo>Logo</Logo>
      <AuthSection>
        <FormAuth>
          <ButtonGroup>
            <button onClick={() => toggleForm(true)} className={isSignUp ? 'active' : ''}>
              Sign Up
            </button>
            <button onClick={() => toggleForm(false)} className={!isSignUp ? 'active' : ''}>
              Sign In
            </button>
            <Underline
              className={`underline ${isSignUp ? 'active1' : 'active2'}`}
            />
          </ButtonGroup>
          {isSignUp
            ? <SignUp />
            : <SignIn />}
        </FormAuth>
      </AuthSection >
    </>
  )
}

Auth.propTypes = {
  page: PropTypes.string.isRequired,
};


const AuthSection = styled.section`
  width: 100%;
  height:100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Logo = styled.div`
  position: absolute;
  width: 100%;
  height: 2rem;
  padding: 2rem;
  font-size: x-large;
  box-sizing: border-box;
`

const FormAuth = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonGroup = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;

  button{
    font-size: large;
    background-color: white;
    border: 2px solid white;
    width: 15rem;
    padding: 1rem;
    cursor: pointer;
  } 

  .active1 {
  transform: translateX(0%);
}

  .active2 {
  transform: translateX(100%);
}
`

const Underline = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 2px;
  background-color: black;
  transition: transform 0.5s ease-in-out, width 0.5s ease-in-out;
`

export default Auth