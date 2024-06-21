"use client";
import React, { useState } from 'react';
import { db } from './connection/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DisplayMessages from './comment/DisplayMessages';
import Appbar from './component/appbar';

async function addDataToFireStore(name, email, message) {
  try {
    const docRef = await addDoc(collection(db, "comment"), {
      name: name,
      email: email,
      message: message,
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
}

export default function StateTextFields() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const added = await addDataToFireStore(name, email, message);
    if (added) {
      setName("");
      setEmail("");
      setMessage("");
      alert("Data added to Firestore DB!");
    } else {
      alert("Failed to add data to Firestore DB.");
    }
  }

  return (
    <div> 

      {/* <DisplayMessages/> */}
      {/* <Appbar></Appbar> */}
    
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="name"
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        id="email"
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        id="message"
        label="Message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
    </div>
  );
}
