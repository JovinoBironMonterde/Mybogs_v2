"use client";
import React, { useState, useEffect } from 'react';
import { db } from '../connection/firebaseConfig';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FollowDialog from './FollowDialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const checkEmail = async () => {
      if (email) {
        const exists = await checkIfEmailExists(email);
        setIsFollowing(exists);
      }
    };
    checkEmail();
  }, [email]);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

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
    <Box>
      {!isMobile && (
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, maxWidth: '400px' },
            borderRadius: '10px', overflow: 'hidden',
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box sx={{ m: 1,width: '100%', maxWidth: '300px', display: 'flex', backgroundColor: '#fff', p: 0.3, borderRadius: '4px' }} variant="filled">
            <TextField
            fullWidth
              size="small"
              id="email"
                label="Email Address"
              sx={{ backgroundColor: '#f8f8f8', borderRadius: '0' }}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ px: 4, ml: 0.3 }}>
              {isFollowing ? 'Followed' : 'Follow'}
            </Button>
          </Box>
        </Box>
      )}
      {isMobile && (
        <Box sx={{ m: 1, display: 'flex', p: 0.3, borderRadius: '4px' }} variant="filled">
          <Button type="button" variant="contained" onClick={handleDialogOpen} color="primary" sx={{ px: 4, ml: 0.3 }}>
            {isFollowing ? 'Followed' : 'Follow'}
          </Button>
        </Box>
      )}
      <FollowDialog open={dialogOpen} onClose={handleDialogClose} />
    </Box>
  );
}
