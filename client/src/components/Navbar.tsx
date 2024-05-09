import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import "../styles/navbar.css"
// import { EventAvailableRounded } from '@mui/icons-material';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;


export default function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const Navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [navItems, setNavItems] = React.useState<string[]>(['Home', 'About', 'Login']);


  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const isAuth = localStorage.getItem('isAuth') === 'true';
      if(isAuth) {
        setNavItems(['Home', 'About', 'Logout']);
        return; 
      }
      setNavItems(['Home', 'About', 'Login']);
  
      console.log("setInterval", isAuth);
      
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, []); 
  
  const handleNavbarClickHome = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("home", event);
    if(localStorage.getItem('isAuth') === 'true') Navigate("/home") 
      else Navigate("/login")
  }
  const handleNavbarClickAbout = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("about", event);
    Navigate("/about")
  }
  const handleNavbarClickLogin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const val = navItems.includes('Logout');
    if (val){
      console.log("logout", event);
      localStorage.clear();
      setNavItems(['Home', 'About', 'Login']);
      Navigate("/login")
    } else {
      console.log("login", event);
      Navigate("/login")
    }
  }

  const drawer = (
    <Box style={{color: 'rgb(182, 181, 182)'}} onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Travelopia
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem  key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' ,color: 'rgb(182, 181, 182)'}}>
              <ListItemText  primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar  style={{backgroundColor: 'rgb(133, 89, 35)'}} className='navbarMain'  component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography  style={{fontWeight: '1000'}}
      variant="h6"
      component="div"
      sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>Travelopia</Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {/* {navItems.map((item) => ( */}
              <Button style={{ fontWeight: 'bold'}}onClick={(event)=> handleNavbarClickHome(event)} sx={{ color: '#fff' }}>
                HOME
              </Button>
              <Button style={{ fontWeight: 'bold'}}onClick={(event)=> handleNavbarClickAbout(event)}  sx={{ color: '#fff' }}>
                ABOUT
              </Button>
              <Button style={{ fontWeight: 'bold'}}onClick={(event)=> handleNavbarClickLogin(event)}   sx={{ color: '#fff' }}>
                {navItems[2]}
              </Button>
            {/* ))} */}
          </Box>
        </Toolbar>
      </AppBar>
      <nav >
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
       
      </Box>
    </Box>
  );
}
