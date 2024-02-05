import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBox';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ScienceRoundedIcon from '@mui/icons-material/Science'
import SmartToyRoundedIcon from '@mui/icons-material/SmartToy'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import ColorSchemeToggle from './ColorSchemeToggle';
import { closeSidebar } from '../utils';
import JoyOrderDashboardTemplate from '../App';
import MuiLogo from './MuiLogo';
import axios from 'axios';

let classSelect:boolean = false;
let homeSelect:boolean = true;
let stashSelect:boolean = false;
let predictionSelect:boolean = false;

function onSelected(select:string){

  predictionSelect = false;
  homeSelect = false;
  classSelect = false;
  stashSelect = false;
  switch (select){
    case 'home':
      homeSelect = true;
      break;
    case 'class':
      classSelect = true;
      break;
    case 'stash':
      stashSelect = true;
      break;
    case 'prediction':
      predictionSelect = true;
      break;
    default :
      homeSelect = true;
      break;
  }
}

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);

  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}
//@ts-ignore
export default function Sidebar({handleLogout,setActiveComponent,token}:SidebarProps) {
  const [inputValues, setInputValues] = React.useState({
    firstName: '',
    lastName: '',
    role: '',
  });
  React.useEffect(() => {
    fetchData();
    
    
  },[token]); 
  const handleSideBtn:any = (componentName:string) =>{
  setActiveComponent(componentName);
}



const fetchData = async () => {
  try {
    const response = await axios.get(`https://mycarrymark-node-afiffahmis-projects.vercel.app/carrymark/${user.providerData[0].uid}/profile`);
    const data = response.data;
    setInputValues({
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const user = JSON.parse(token);
console.log(user);
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: {
          xs: 'fixed',
          md: 'sticky',
        },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <IconButton variant="soft" color="primary" size="sm">
          <MuiLogo />
        </IconButton>
        <Typography level="title-lg">MyCarrymark</Typography>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>
  
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton onClick={() => {onSelected('home')}} selected={homeSelect}>
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" onClick={() => handleSideBtn('Home')}>Home</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => {onSelected('class')}} selected={classSelect}>
              <GroupRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" onClick={() => handleSideBtn('Class')}>Class</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              role="menuitem"
              component="a"
              onClick={() => {onSelected('stash')}} selected={stashSelect}
            >
              <FolderRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" onClick={() => handleSideBtn('Stash')}>Stash</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AccountBoxRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm" >Users</Typography>
                    
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    onClick={() => handleSideBtn('Profile')}
                  >
                    My profile 
                    {inputValues.firstName ?  '' : <Chip size='sm' variant='solid' color='primary'>1</Chip> }
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
        </List>

        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton onClick={() => {onSelected('prediction');handleSideBtn('Prediction')}} selected={predictionSelect}>
              <ScienceRoundedIcon/>
              Grade prediction
              <Chip size='sm' color='primary' variant='solid' >
                Beta
              </Chip>
            </ListItemButton>
          </ListItem>
        </List>
        
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant="outlined"
          size="sm"
          src={user.providerData[0].photoURL ? user.providerData[0].photoURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiqFXMci09aURe0zxu_kJflYFJ2PefRiVyyA&usqp=CAU'}
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{inputValues.firstName ? inputValues.firstName : <Chip size='sm' color='danger'>Please update profile</Chip>}</Typography>
          <Typography level="body-xs">{user.providerData[0].uid}</Typography>
        </Box>
        <Button size="sm" variant="plain" color="neutral" onClick={handleLogout}>
          <LogoutRoundedIcon />
        </Button>
      </Box>
    </Sheet>
  );
}