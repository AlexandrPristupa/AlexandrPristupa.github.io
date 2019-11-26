import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { config } from './config';

const app = firebase.initializeApp(config);

export const firebaseAppAuth = app.auth();
export const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export const getMessages = () => {
    return new Promise((res) => {
      const messagesDataBase = firebase
        .database()
        .ref("messages/")
        .limitToLast(500)

      messagesDataBase.on("value", snapshot => {
        const messages = [];

        snapshot.forEach(child => {
          const message = child.val();

          messages.push({
            id: child.key,
            text: message.text,
            name: message.name,
            picture: message.picture 
          });
        });

      res(messages)
    })
  })
};

export const sendMessage = message => {
  firebase
    .database()
    .ref("messages/")
    .push(message)
};