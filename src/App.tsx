import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
// icons
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import useScript from './useScript';
//@ts-ignore
import Sidebar from './components/Sidebar';
//@ts-ignore
import Header from './components/Header';
//@ts-ignore
import Login from './Login';
import { useEffect,useState } from 'react';
//@ts-ignore
import Loader from './components/loader/Loader'
import FetchCM from './components/FetchCM'
import ClassList from './components/ClassList';
import MyProfile from './components/MyProfile';
import { useContext } from 'react';
import { AuthProvider } from './AuthProvider';
import Stash from './components/Stash';
import GradePrediction from './components/GradePrediction';


const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function JoyOrderDashboardTemplate() {
  const status = useScript(`https://unpkg.com/feather-icons`);
  const[token,setToken] = useState();
  const[isLoading,setIsLoading] = useState(true);
  const[activeComponent, setActiveComponent] = useState('Home');
  useEnhancedEffect(() => {
    // Feather icon setup: https://github.com/feathericons/feather#4-replace
    // @ts-ignore
    if (typeof feather !== 'undefined') {
      // @ts-ignore
      feather.replace();
    }
  }, [status]);
  useEffect(() =>{
    console.log(activeComponent);
    const fakeDataFetch = () => {
      setTimeout(()=>{
        setIsLoading(false);

      },4000)
    }

    fakeDataFetch();

    const loggedUser = localStorage.getItem('user');
    if(loggedUser){
      const foundUser = JSON.parse(loggedUser)
      setToken(foundUser);
    }
  },[]);

  if(!token){
    return <Login setToken={setToken} set={function (...args: any[]) {
      throw new Error('Function not implemented.');
    } } />
  }
  if(token !== undefined){
    
    localStorage.setItem('user',JSON.stringify(token))  ;
  }
  const handleLogout = () => {
    // Set the state to null when the Logout button is clicked
    setToken(undefined);
    localStorage.clear();
  };

  const renderComponent = () => {
    switch(activeComponent){
      case 'Home' :
        return <GradePrediction token={token} />
      case 'Class' :
        return <ClassList token={token}/>
      case 'Profile':
          return <MyProfile token={token} />
      case 'Stash':
          return <Stash token={token}/>
      default :
        return <GradePrediction/>
    }


  }

  const setActiveComponents = (prop:string) => {
    setActiveComponent(prop);
  }



  return (
    <AuthProvider>{(
    isLoading ? (<Loader/>) : (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <Sidebar handleLogout={handleLogout} setActiveComponent= {setActiveComponents} token={token}/>
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: {
              xs: 2,
              md: 6,
            },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: {
              xs: 2,
              sm: 2,
              md: 3,
            },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon  />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                onClick={() => {setActiveComponent('Home')}}
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              <Typography color="primary" fontWeight={500} fontSize={12}>
                {activeComponent}
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              display: 'flex',
              my: 1,
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h2">{activeComponent}</Typography>
            
          </Box>
          
          {renderComponent()}
          {/* <OrderList /> */}
        </Box>
      </Box>
    </CssVarsProvider>
  ))}</AuthProvider>);
  
}

