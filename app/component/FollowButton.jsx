"use client";
import React, { useState, useEffect } from 'react';
import { db } from '../connection/firebaseConfig';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

async function addDataToFirestore(email) {
  try {
    const docRef = await addDoc(collection(db, "followers"), {
      email: email,
      followedAt: new Date().toISOString()
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
}

async function checkIfEmailExists(email) {
  const q = query(collection(db, "followers"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

export default function FollowButton() {
  const [email, setEmail] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkEmail = async () => {
      if (email) {
        const exists = await checkIfEmailExists(email);
        setIsFollowing(exists);
      }
    };
    checkEmail();
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFollowing) {
      const added = await addDataToFirestore(email);
      if (added) {
        setIsFollowing(true);
        alert("User followed successfully!");
      } else {
        alert("Failed to follow user.");
      }
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '400px' },
        borderRadius: '10px', overflow: 'hidden',
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Box sx={{ m: 1, width: '200px', display: 'flex', backgroundColor: 'gray', p: 0.3, borderRadius: '4px' }} variant="filled">
        <TextField
          size="small"
          id="email"
          sx={{ backgroundColor: '#d6dbdc', width: '100%', borderRadius: '0' }}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ px: 4, ml: 0.3 }}>
          {isFollowing ? 'Followed' : 'Follow'}
        </Button>
      </Box>
    </Box>
  );
}
