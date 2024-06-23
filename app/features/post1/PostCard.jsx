import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Image from 'next/image';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MessageIcon from '@mui/icons-material/Message';
import { Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { db } from '@/app/connection/firebaseConfig';
import { collection, addDoc, query, getDocs, Timestamp } from "firebase/firestore";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import image1 from '../../asset/img/img1.jpeg';
import Profile from '../../asset/img/profile.jpg';



function PostCard() {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);


  useEffect(() => {
    const fetchLikesCount = async () => {
      const q = query(collection(db, "Post1"));
      const querySnapshot = await getDocs(q);
      setLikesCount(querySnapshot.size);
    };

    const fetchComments = async () => {
      const q = query(collection(db, "Post1Comments"));
      const querySnapshot = await getDocs(q);
      const fetchedComments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(fetchedComments);
    };

    fetchLikesCount();
    fetchComments();
  }, []);


  const handleLike = async () => {
    try {
      setLiked(!liked);
      const docRef = await addDoc(collection(db, "Post1"), {
        liked: !liked,
        timestamp: Timestamp.now(),
      });
      console.log("Document written with ID: ", docRef.id);
      setLikesCount(prevCount => liked ? prevCount - 1 : prevCount + 1);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "Post1Comments"), {
        comment: comment,
        name: name,
        timestamp: Timestamp.now(),
      });
      console.log("Comment added with ID: ", docRef.id);
      setComments([...comments, { id: docRef.id, comment: comment, name: name, timestamp: Timestamp.now() }]);
      setComment("");
      setName("");
      handleClose();
    } catch (e) {
      console.error("Error adding comment: ", e);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowAllComments = () => {
    setShowAllComments(true);
  };

  return (
    <Box>
      <Box sx={{ p: 1, mb: 1, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '45px', height: '45px', overflow: 'hidden', borderRadius: '50%' }}>
          <Image src={Profile} alt="Profile Image" width={45} height={45} />
        </Box>
        <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 18 }}>Jovino Monterde</Typography>
          <Typography sx={{ fontSize: 12, ml: 1, color: 'green' }}>June 20, 2024 12:46AM</Typography>
        </Box>
      </Box>
      <CardMedia>
        <Image
          src={image1}
          alt="green iguana"
          layout="responsive"
          width={100}
          height={75}
        />
      </CardMedia>
      <CardContent sx={{ pb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" onClick={handleLike} sx={{ cursor: 'pointer' }}>
            <Typography sx={{ mr: 1 }}>{likesCount}</Typography>
            {liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
            <Typography>{liked ? "Liked" : "Like"}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <MessageIcon />
            <Typography sx={{ ml: 1 }}>{comments.length}</Typography>
          </Box>
        </Box>
      </CardContent>
      <Box sx={{ px: 3, mb: 4 }}>
        {comments.slice(0, showAllComments ? comments.length : 1).map((comment) => (
          <Box key={comment.id} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccountCircleIcon sx={{ fontSize: 38 }} />
              <Typography sx={{ textAlign: 'left', ml: 1, fontWeight: 'bold' }}>{comment.name}</Typography>
              <Typography sx={{ textAlign: 'left', fontSize: 12, color: '#888', ml: 1 }}>
                {comment.timestamp && new Date(comment.timestamp.seconds * 1000).toLocaleString()}
              </Typography>
            </Box>
            <Typography sx={{ textAlign: 'left', ml: 3, pl:3 }}>{comment.comment}</Typography>
          </Box>
        ))}
        {comments.length > 2 && !showAllComments && (
          <Button onClick={handleShowAllComments}>Show more comments</Button>
        )}
      </Box>
      <Box sx={{ px: 4, mb: 3 }}>
        <TextField
          id='ShowCommentDialog'
          fullWidth
          label="Comment"
          multiline
          maxRows={4}
          sx={{ backgroundColor: 'transparent' }}
          onClick={handleOpen}
        />
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{"Add a Comment"}</DialogTitle>
        <DialogContent>
          <Box sx={{ px: 2, mb: 2 }}>
            <Box sx={{ backgroundColor: '#f8f8f8', my: 3 }}>
              <TextField
                id="name"
                label="Nickname"
                fullWidth
                value={name}
                onChange={(event) => setName(event.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                id="filled-multiline-flexible"
                label="Comment"
                multiline
                maxRows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ backgroundColor: 'transparent' }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ m: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" sx={{ ml: 2 }} onClick={handleCommentSubmit}>Post</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PostCard;
