"use client";
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Cover from '../asset/img/cover.webp';
import ProfileImage from '../asset/img/profile.jpg'
import { Typography, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Avatar from '@mui/material/Avatar';
import { db } from '../connection/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function Profile() {
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const fetchFollowersCount = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "followers"));
        const count = querySnapshot.size; // Get the size of the query snapshot (total documents)
        setFollowersCount(count);
      } catch (error) {
        console.error("Error fetching followers count: ", error);
      }
    };

    fetchFollowersCount();
  }, []);

  return (
    <div>
      <Box sx={{mb:4}}>
        <Box sx={{ width: '100%', height: '300px', position: 'relative', overflow: 'hidden' }}>
          <Image 
            src={Cover} 
            alt="Cover Image" 
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </Box>
        <Box sx={{backgroundColor: '#e3f2fd', height: 'auto',position: 'relative', pb:3 }}>
          <Box  sx={{mx: 'auto', width: '140px'}}>
            <Box sx={{width: '140px', height: '140px', position: 'absolute', overflow: 'hidden', borderRadius: '50%', top:'-80px'}}>
              <Image 
                src={ProfileImage} 
                alt="Profile Image" 
              />
            </Box>
          </Box>
          <Box sx={{pt:'80px', position: 'relative'}}>
            <Typography textAlign='center' fontSize={40} sx={{ letterSpacing: 6 }}>Jovino Monterde</Typography>
          </Box>
          <Box sx={{mb:2}}>
            <Typography textAlign='center' fontSize={25} sx={{ letterSpacing: 6 }}>{followersCount}</Typography>
            <Typography textAlign='center' fontSize={12} sx={{ letterSpacing: 3 }}>Followers</Typography>
          </Box>
          <Stack direction="row" spacing={3} sx={{ justifyContent: 'center'}}>
              <FacebookIcon color="action" />
              <InstagramIcon color="action" />
              <LinkedInIcon color="action" />
          </Stack>
        </Box>
      </Box>
    </div>
  );
}

export default Profile;
