import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
function About() {
  return (
    <div>
      <List>
        <ListItem>
          <ListItemAvatar sx={{minWidth: '35px'}}>
              <AccountCircleIcon />
          </ListItemAvatar>
          <ListItemText primary="Jhovi Biron Monterde"/>
        </ListItem>
        <ListItem>
          <ListItemAvatar sx={{minWidth: '35px'}}>
              <LocationOnIcon />
          </ListItemAvatar>
          <ListItemText primary="Blk 66 Lot 25 Channel Ridge view Babatngon leyte"/>
        </ListItem>
        <ListItem>
          <ListItemAvatar sx={{minWidth: '35px'}}>
              <FolderIcon />
          </ListItemAvatar>
          <ListItemText primary="Jovino"/>
        </ListItem>
      </List>
    </div>
  )
}

export default About
