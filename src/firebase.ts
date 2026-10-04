import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    if (user) {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: user.email === 'mansoora.ahmed.pk@gmail.com' ? 'admin' : 'customer',
        updatedAt: serverTimestamp()
      }, { merge: true });
    }
    return user;
  } catch (error: any) {
    if (error?.code === 'auth/popup-closed-by-user' || error?.name === 'AbortError' || error?.code === 'auth/cancelled-popup-request') {
      console.log('Firebase Login popup was dismissed by user.');
      return null;
    }
    console.error('Firebase Login Error:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Firebase Logout Error:', error);
    throw error;
  }
};
