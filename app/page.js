"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PostCard from './features/post1/PostCard';
import PostCard2 from './features/Post2/PostCard2';
import PostCard3 from './features/post3/PostCard3';
import { CardMedia } from '@mui/material';
import About from './component/About';
import bg from './asset/img/bg.webp'
import bg2 from './asset/img/bg2.webp'
import cover from './asset/img/cover.webp'
import npm from './asset/img/npm.webp'
import img1 from './asset/img/img1.jpeg'
import profile from './asset/img/profile.jpg'
import Image from 'next/image';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function MainPost() {
  return (
   
      <Box sx={{ flexGrow: 1, p:0 }}>
        <Grid container spacing={2} >
          <Grid item xs={12} md={8} lg={8}>
            <Box sx={{ flexGrow: 1, pr: { xs: 2, md: 2 },pl: { xs: 2, md: 4 }, overflowY: 'scroll', height: '100vh' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Item><PostCard/></Item>
                </Grid>
                <Grid item xs={12}>
                  <Item><PostCard2 /></Item>
                </Grid>
                <Grid item xs={12}>
                  <Item><PostCard3/></Item>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Box sx={{ flexGrow: 1, pr: { xs: 2, md: 4 },pl: { xs: 2, md: 0 } }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Item><About/></Item>
                </Grid>
                <Grid item xs={12}>
                  <Item>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
                      <Grid item xs={6}>
                        <Item sx={{minHeight: '120px'}}>
                          <CardMedia>
                            <Image
                              src={bg}
                              alt="green iguana"
                              layout="responsive"
                              width={100}
                              height={100}
                            />
                          </CardMedia>
                        </Item>
                      </Grid>
                      <Grid item xs={6}>
                        <Item sx={{minHeight: '120px'}}>
                          <CardMedia>
                            <Image
                              src={npm}
                              alt="green iguana"
                              layout="responsive"
                              width={100}
                              height={100}
                            />
                          </CardMedia>
                        </Item>
                      </Grid>
                      <Grid item xs={6}>
                        <Item sx={{minHeight: '120px'}}>
                          <CardMedia>
                            <Image
                              src={bg2}
                              alt="green iguana"
                              layout="responsive"
                              width={100}
                              height={100}
                            />
                          </CardMedia>
                        </Item>
                      </Grid>
                      <Grid item xs={6}>
                        <Item sx={{minHeight: '120px'}}>
                          <CardMedia>
                            <Image
                              src={img1}
                              alt="green iguana"
                              layout="responsive"
                              width={100}
                              height={100}
                            />
                          </CardMedia>
                        </Item>
                      </Grid>
                      <Grid item xs={12}>
                        <Item>
                        <CardMedia>
                          <Image
                            src={cover}
                            alt="green iguana"
                            layout="responsive"
                            width={100}
                            height={100}
                          />
                        </CardMedia>
                        </Item>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <Item>xs=8</Item>
                </Grid>
              </Grid>
            </Box>
          </Grid>
      </Grid>
      </Box>
  );
}