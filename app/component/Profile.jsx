import React from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Cover from '../asset/img/cover.webp';
import ProfileImage from '../asset/img/profile.jpg'
import { Typography, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Profile() {
  return (
    <div>
      <Box>
        <Box sx={{ width: '100%', height: '300px', position: 'relative', overflow: 'hidden' }}>
          <Image 
            src={Cover} 
            alt="Cover Image" 
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </Box>
        <Box sx={{backgroundColor: '#f4f4f4', height: '200px',position: 'relative', }}>
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
