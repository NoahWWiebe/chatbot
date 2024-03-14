// StyledComps.js
// All Styled Components

import styled, { keyframes } from 'styled-components';

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const StyledMessage = styled.div`
  padding: 8px;
  margin: 4px;
  margin-top: 10px;
  border-radius: 8px;
  background-color: ${props => (props.type === 'user' ? '#9b9b9b' : '#5f5f5f')};
  align-self: ${props => (props.type === 'user' ? 'flex-end' : 'flex-start')};
`;

export const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const GradientBackground = styled.div`
  background: linear-gradient(90deg, #000000, #858585, #000000);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 10s ease infinite;
  height: 100vh; /* Adjust as needed */
  margin: 0;
`;

export const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
`;

export const LoginSpinner = styled.img`
  width: 32px; 
  height: 32px; 
  animation: ${spin} 10s linear infinite;
`;

export const SpinningFavicon = styled.img`
  width: 35px; 
  height: 35px; 
  align-self: self-start; // Aligns to the left
  animation: ${spin} 10s linear infinite;
`;

export const LoginContainer = styled.div`
  background-color: #333;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;    
  margin: 0;
`;

export const LoginField = styled.input`
  position: relative;
  width: 100%;
  background: white;
  border: none;
  outline: none;
  padding: 25px 10px 7.5px;
  border-radius: 4px;
  color: black;
  font-weight: 500;
  font-size: 1em;
  text-align: center;
`;

export const LoginButton = styled.button`
  background-color: white;
  padding: 10px;
  color: #000;
  font-weight: 600;
  font-size: 1.35em;
  letter-spacing: 0.05em;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #808080;
  }
`;

export const ConversationContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  height: 100vh;
  width: 80vw;
  overflow-y: auto;
`;

export const ChatbotHeading = styled.div`
  position: fixed;
  top: 0;
  padding: 1em;    
  max-width: 800px; 
  width: 80vw;
  background-color: #333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
`;

export const HeadingH1 = styled.h1`
  color: #ecf0f1;
`;

export const UserSection = styled.div`  
  color: #ecf0f1;
`;

export const LogoutButton = styled.button`
  background-color: #e74d3cd8;
  color: #ecf0f1;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
  font-size: 15px;

  &:hover {
    background-color: #c03a2bc9;
  }
`;

export const CenterThis = styled.div`
  display: flex;
  justify-content: center; /* Center the child elements horizontally */
  align-items: center;
`;

export const ConversationContent = styled.div`
  margin-top: 40px;
  margin-bottom: 145px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ConversationEntryContainer = styled.div`
  position: fixed;
  bottom: 0;
  max-width: 800px; 
  width: 80vw;
  background-color: #333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #333;
  padding: 20px;
  margin: 10px;
`;

export const InputTextArea = styled.textarea`
  flex: 1;
  width: 100%;
  padding: 10px;
  background-color: #444;
  color: #fff;
  border: none;
  border-radius: 5px;
  resize: none;
`;

export const InputButton = styled.button`
  margin: 0;
  margin-left: 10px;
  border-radius: 5px;
  background-color: #444;
  color: #fff;
  font-size: 75px;
  height: 80px;
`;

export const SignIn = styled.div`
    background-color: #333;
    position: absolute;
  width: 400px; 
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  border-radius: 4px;
  box-shadow: 0 15px 35px rgba(0,0,0,9);
`;

export const LoginSection = styled.section`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  flex-wrap: wrap;
  overflow: hidden;
`;

export const SignInH2 = styled.h2`
  font-size: 2em;
  color: #ecf0f1;
  text-transform: uppercase;
`;

export const SignInContent = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
`;

export const SignInForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;