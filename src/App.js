import React, { useState, useEffect } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import { 
  firebaseAppAuth,
  providers,
  getMessages,
  sendMessage
} from './config/firebase';

import Header from './components/Header';
import MessagesList from './components/MessagesList';
import Form from './components/Form';

import Button from '@material-ui/core/Button';

import './App.scss';

const App = ({ signInWithGoogle, signOut, user }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const getMessagesFromFirebase = async () => {
    const messages = await getMessages();

    setMessages(messages);
  };

  useEffect(() => {
    getMessagesFromFirebase();
  }, []);

  const handleSignIn = () => signInWithGoogle();

  const handleSignOut  = async () => signOut();

  const handleSendMessage = event => {
     event.preventDefault();

     if (!message) {
        return;
     }

     const { displayName, photoURL } = user.providerData[0];

     sendMessage({
       text: message,
       name: displayName,
       picture: photoURL
     });

     getMessagesFromFirebase();

     setMessage('');
  };

  const handleOnChenge = event => setMessage(event.target.value);

  const isAuth = !!user;
  
  return (
    <div className="App">
      <Header>
        {!isAuth && (
          <Button 
            color="inherit"
            onClick={handleSignIn}
          >
            Sign in
          </Button>
        )}

        {isAuth && (
          <Button 
            color="inherit"
            onClick={handleSignOut}
          >
            Sign out
          </Button>          
        )}
      </Header>

      {isAuth && (
        <>
          <MessagesList 
            messages={messages}   
          />

          <Form
            onSendMessage={handleSendMessage}
            onChange={handleOnChenge}
            value={message}
          />
        </>
      )}
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
