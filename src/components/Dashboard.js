import React from "react";
import { useDispatch } from "react-redux";
import { clearState } from "../Store/UserSlice";
import { useNavigate } from 'react-router-dom';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { 
	Toolbar, List, Typography, Divider, IconButton, Badge
} from '@mui/material/';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import {MenuItems} from './MenuItems';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
	easing: theme.transitions.easing.sharp,
	duration: theme.transitions.duration.leavingScreen,
  }),
  	...(open && {
    	marginLeft: drawerWidth,
    	width: `calc(100% - ${drawerWidth}px)`,
    	transition: theme.transitions.create(['width', 'margin'], {
      		easing: theme.transitions.easing.sharp,
      		duration: theme.transitions.duration.enteringScreen,
    	}),
  	}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();


function DashboardContent() {
	const [open, setOpen] = React.useState(true);
	const toggleDrawer = () => {
    	setOpen(!open);
  	};

  	const 
		dispatch = useDispatch(),
		navigate = useNavigate();	
	
	const logOut = () => {	
		dispatch(clearState());		
		navigate("/")
	}
  
  	return (
    <ThemeProvider theme={mdTheme}>
    	 <AppBar position="absolute" open={open}>
    	 	<Toolbar
            	sx={{
              		pr: '24px', // keep right padding when drawer closed
            	}}
          	>
          		<IconButton
					edge="start"
					color="inherit"
					aria-label="open drawer"
					onClick={toggleDrawer}
					sx={{
					marginRight: '36px',
					...(open && { display: 'none' }),
					}}
            	>
              		<MenuIcon />
            	</IconButton>
            	<Typography
					component="h1"
					variant="h6"
					color="inherit"
					noWrap
					sx={{ flexGrow: 1 }}
					>
					Dashboard
				</Typography>
				<IconButton color="inherit">
              		<Badge badgeContent={4} color="secondary">
                		<NotificationsIcon />
              		</Badge>
            	</IconButton>
            	<IconButton color="inherit" onClick={logOut} >
            		<LogoutIcon />
            	</IconButton>
          	</Toolbar>
    	 </AppBar>
    	 <Drawer variant="permanent" open={open}>
    	 	<Toolbar
	            sx={{
	              display: 'flex',
	              alignItems: 'center',
	              justifyContent: 'flex-end',
	              px: [1],
	            }}
	        >
	        	<IconButton onClick={toggleDrawer}>
              		<ChevronLeftIcon />
            	</IconButton>
	       	</Toolbar>
	       	<Divider />
           	<List><MenuItems logOut={logOut} /></List>
          	<Divider />
    	</Drawer>
    </ThemeProvider>);
}


export default function Dashboard() {
  return <DashboardContent />;
}