import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import './App.css';
import { NavButton } from './NavButton';
import { MyCalendar } from './MyCalendar';
import Account from './Account';
import { getAuth, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { GoogleAuthProvider } from 'firebase/auth';
import { useEffect } from 'react';

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        setLoading(false);
        setUser(user);
      } else {
        // User is signed out
        // ...
        setLoading(false);
        setUser(undefined);
      }
    });
  });

  const signin = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        navigate('/calendar');
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  // auth.currentUser && console.log(auth.currentUser.uid, 'user');
  if (loading)
    return (
      <div
        style={{
          height: '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button isLoading></Button>
      </div>
    );

  if (user == undefined) {
    return (
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <VStack spacing={8}>
              <div className="myNavbar"></div>
              <Box>
                <h1 className="main">Please Log In</h1>
                <br />
                <Button onClick={signin} leftIcon={<FaGoogle />}>
                  Login
                </Button>
              </Box>
            </VStack>
          </Grid>
        </Box>
      </ChakraProvider>
    );
  }
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <div className="myNavbar">
              <Flex p={5} justifyContent="center" w="30vw">
                <NavButton path="calendar" color="twitter" text="Calendar" />
                <NavButton path="account" color="twitter" text="Account" />
                {/* <NavButton path="" color="twitter" text="Home" /> */}
              </Flex>
              <ColorModeSwitcher pos="fixed" zIndex={3} top="5" right="5" />
            </div>
            <div className="main">
              <Routes>
                <Route path="/" element={<Navigate to="/calendar" />} />
                <Route path="calendar" element={<MyCalendar user={user} />} />
                <Route path="account" element={<Account user={user} />} />
              </Routes>
            </div>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
