// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  // signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC7lRbb-tagI15_GTKMX13pgAqlK1OvfsQ',
  authDomain: 'react-register-auth.firebaseapp.com',
  projectId: 'react-register-auth',
  storageBucket: 'react-register-auth.appspot.com',
  messagingSenderId: '767174871292',
  appId: '1:767174871292:web:d34342e1afd1f5cf932f79'
}


// Initialize Firebase
initializeApp(firebaseConfig)


export const auth = getAuth()


//SIGN UP AND SIGN IN WITH EMAIL AND PASSWORD
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if( !email || !password ) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

