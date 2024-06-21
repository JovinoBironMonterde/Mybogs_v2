// SignIn.js
import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function SignIn() {
  const signInWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Signed in as:', result.user.email);
        alert(`Signed in as: ${result.user.email}`);
      })
      .catch((error) => {
        console.error('Error signing in:', error);
        alert(`Error signing in: ${error.message}`);
      });
  };

  return (
    <button onClick={signInWithGoogle}>Sign In with Google</button>
  );
}

export default SignIn;
