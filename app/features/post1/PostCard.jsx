import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Image from 'next/image';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MessageIcon from '@mui/icons-material/Message';
import { Typography, TextField, Button } from '@mui/material';
import { db } from '@/app/connection/firebaseConfig';
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Ensure the image path is correct
import image1 from '../../asset/img/img1.jpeg';

function PostCard() {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchLikesCount = async () => {
      const q = query(collection(db, "Post1"));
      const querySnapshot = await getDocs(q);
      setLikesCount(querySnapshot.size);
    };

    const fetchComments = async () => {
      const q = query(collection(db, "Post1Comments"));
      const querySnapshot = await getDocs(q);
      const fetchedComments = querySnapshot.docs.map(doc => doc.data());
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
        timestamp: new Date(),
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
        timestamp: new Date(),
      });
      console.log("Comment added with ID: ", docRef.id);
      setComments([...comments, { comment: comment, timestamp: new Date() }]);
      setComment("");
    } catch (e) {
      console.error("Error adding comment: ", e);
    }
  };

  return (
    <Box>
      <CardMedia>
        <Image
          src={image1}
          alt="green iguana"
          width='100%' 
          height='auto' 
        />
      </CardMedia>
      <CardContent sx={{ pb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" onClick={handleLike} sx={{ cursor: 'pointer' }}>
            <Typography sx={{mr:1}}>{likesCount}</Typography>
            {liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
            <Typography>{liked ? "Liked" : "Like"}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <MessageIcon />
            <Typography  sx={{ml:1}}>{comments.length}</Typography>
          </Box>
        </Box>
      </CardContent>
      <Box sx={{ px: 4, mb: 4 }}>
        {comments.map((comment, index) => (
          <Box sx={{mb: 2, display: 'flex'}}>
          <AccountCircleIcon sx={{mr: 1}}/>
          <Typography key={index}>{comment.comment}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ px: 2, mb: 2, }}>
        <Box sx={{ display: 'flex', alignItems: "center", backgroundColor: '#f8f8f8' }}>
          <TextField
            fullWidth
            id="filled-multiline-flexible"
            label="Comment"
            multiline
            maxRows={4}
            variant="filled"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{backgroundColor: 'transparent'}}
          />
          <Button variant="contained" sx={{ ml: 2 }} onClick={handleCommentSubmit}>Post</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default PostCard;
