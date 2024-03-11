"use client"
import { Provider } from 'react-redux'
import store from '../store'
import AuthenticateUser from './AuthenticateUser'
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    overflow: hidden; /* Prevent body from scrolling */
    font-family: 'Helvetica', sans-serif;
  }
`;

export default function Home() {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <AuthenticateUser />
      </Provider>
    </>
  )
}