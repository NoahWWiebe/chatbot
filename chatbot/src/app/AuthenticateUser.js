// AuthenticateUser.js

import { connect } from 'react-redux';
import { setUser, logout } from '../user-slice';
import Conversation from './Conversation'
import React, { useEffect, useRef } from 'react';
import {
  GradientBackground,
  LoginField,
  LoginButton,
  LoadingSpinner,
  LoginSection,
  SignIn,
  SignInH2,
  SignInContent,
  SignInForm
} from './styles/StyledComps';
import axios from 'axios';


const AuthenticateUser = ({ user, setUser, logout }) => {
  // Local states userName and userPassword to handle user input for authentication.
  const [userName, setUserName] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // Function to attempt login
  const login = async () => {
    setLoading(true); // Set loading to true before making the API call

    const user_query = { user_name: userName, user_password: userPassword };

    try {
      // Asks the authenticate api to login
      const response = await axios.post("http://noah.211.ics.compsci.cc:7116/api/authenticate",
        user_query
      );

      // If logged in
      if (response.data.authenticated === true) {
        // Update time in db
        await axios.post("http://noah.211.ics.compsci.cc:7116/api/updateLastLogin", {
          user_id: response.data.account.user_id
        });
        setUser(response.data.account); // Uses redux slice to logged in
      } else {
        // Empty fields if not incorrect login info
        setUserName("");
        setUserPassword("");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    } finally {
      setLoading(false); // Set loading to false after the API call completes
    }
  };

  const inputRef = useRef(null);

  useEffect(() => {
    // Focus on the input element when the component mounts
    inputRef.current.focus();
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      login();
    }
  };

  // Displays the current user's name or "Guest" if not logged in.
  // It also provides input fields for username and password and a login/logout button.
  return (
    <GradientBackground>
      {!user ?
        <>
          <LoginSection>
            <SignIn>
              <SignInContent>
                <SignInH2>Sign In</SignInH2>
                <SignInForm>
                  <LoginField
                    type="text"
                    onKeyDown={handleKeyPress}
                    onChange={(e) => { setUserName(e.target.value); }}
                    placeholder="Enter username"
                    value={userName}
                    ref={inputRef}
                  />
                  <LoginField
                    type="password"
                    onKeyDown={handleKeyPress}
                    onChange={(e) => { setUserPassword(e.target.value); }}
                    placeholder="Enter password"
                    value={userPassword}
                  />
                  <LoginButton
                    onKeyDown={handleKeyPress}
                    onClick={login}
                  >
                    {loading ? <LoadingSpinner /> : "Login"}
                  </LoginButton>
                </SignInForm>
              </SignInContent>
            </SignIn>
          </LoginSection>
        </>
        : <Conversation logout={logout}></Conversation>
      }
    </GradientBackground>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, { setUser, logout })(AuthenticateUser);