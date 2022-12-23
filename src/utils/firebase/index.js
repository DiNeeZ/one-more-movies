// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  // signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

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
export const db = getFirestore()


//SIGN UP AND SIGN IN WITH EMAIL AND PASSWORD
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

//CREATING USER DOCUMENT IN FIRESTORE DB

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return

  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (err) {
      console.log('error creating a user', err.message)
    }
  }

  return userDocRef
}

//GET AUTH USER FROM FIRESTORE

export const getUserFromFirestore = async (uid) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  try {
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  } catch (err) {
    console.log('error getting a user', err.message)
  }
}

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback) 
