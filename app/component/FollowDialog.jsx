"use client";
import React, { useState, useEffect } from 'react';
import { db } from '../connection/firebaseConfig';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

export default function FollowDialog({ open, onClose }) {
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
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ component: 'form', onSubmit: handleSubmit }}>
      <DialogTitle>Follow</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To follow to this website, please enter your email address here. We will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained" color="primary">
          {isFollowing ? 'Followed' : 'Follow'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
