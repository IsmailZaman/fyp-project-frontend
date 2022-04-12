import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Container } from '@mui/material';
import { CardMedia } from '@mui/material';
import logo1 from './logo1.png'
import ProfileMenu from './ProfileMenu';

const drawerWidth = 240;
const roundButtons ={
    borderRadius:'12px', 
    margin: '10px 0 10px 0'
}



function Layout(props) {
  const { window,children } = props;
  
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
        <Container>
            <CardMedia
                component='img'
                height='90'
                src={logo1}
                sx={{borderRadius: '8px', 
                    marginTop: '20px',
                    marginBottom: '10px'}}
                
            />
        </Container>
      <Container>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            
                <ListItem button key={text} sx={roundButtons}>

                    <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText color="secondary" primary={text} />
                </ListItem>
          
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
            
            <ListItem button key={text}>
                <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
          
        ))}
      </List>
      </Container>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          //alignItems: 'center'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon sx={{backgroundColor: 'white !important'}} />
          </IconButton>
          <Typography color="secondary" variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
            Admin Dashboard
          </Typography>
          <ProfileMenu />
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, background: 'red'}}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth},
            
            
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
           
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, overflowY: "scroll", 
        maxHeight: '100vh',
        //backgroundImage: `url(${bg})`,
        color: 'white'
    
    }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export default Layout