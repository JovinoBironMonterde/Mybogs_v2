"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PostCard from './features/post1/PostCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function MainPost() {
  return (
   
      <Box sx={{ flexGrow: 1, p:3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={8}>
            <Box sx={{ flexGrow: 1, p:3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Item><PostCard/></Item>
                </Grid>
                <Grid item xs={12}>
                  <Item>xs=4</Item>
                </Grid>
                <Grid item xs={12}>
                  <Item>xs=4</Item>
                </Grid>
                <Grid item xs={12}>
                  <Item>xs=8</Item>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Box sx={{ flexGrow: 1, p:3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Item>xs=4</Item>
                </Grid>
                <Grid item xs={12}>
                  <Item>xs=4</Item>
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