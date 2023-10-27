import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import PropTypes from 'prop-types'
// @ts-ignore
import GoogleIcon from './components/GoogleIcon.tsx';
import logo from './logomcm.svg';
import logodark from './logomcm-dark.svg';
import sideimage from './mycarrymark.svg';




interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}



function ColorSchemeToggle({ onClick, ...props }: IconButtonProps) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="neutral" disabled />;
  }
  return ( 
    <Box sx={{
                  gap: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              ><IconButton
              id="toggle-mode"
              size="sm"
              variant="outlined"
              color="neutral"
              aria-label="toggle light/dark mode"
              {...props}
              onClick={(event) => {
                if (mode === 'light') {
                  setMode('dark');
                } else {
                  setMode('light');
                }
                onClick?.(event);
              }}
            >
              {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
            </IconButton>
                <Box
                component='img'
                sx={{
                  height:290,
                  width: 350,
                  alignItems: 'center',
                  justifyContent:'right'

                }}
                src={mode === 'light' ? logo : logodark} 
                />
                
              </Box>
  );
}

export default function JoySignInSideTemplate({setToken}) {
  return (
      <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ':root': {
              '--Collapsed-breakpoint': '769px', // form will stretch when viewport is below `769px`
              '--Cover-width': '50vw', // must be `vw` only
              '--Form-maxWidth': '800px',
              '--Transition-duration': '0.4s', // set to `none` to disable transition
            },
          }}
        />
        <Box
          sx={(theme) => ({
            width:
              'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
            transition: 'width var(--Transition-duration)',
            transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(255 255 255 / 0.2)',
            [theme.getColorSchemeSelector('dark')]: {
              backgroundColor: 'rgba(19 19 24 / 0.4)',
            },
          })}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100dvh',
              width:
                'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
              maxWidth: '100%',
              px: 2,
            }}
          >
            <Box
              component="header"
              sx={{
                py: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              <ColorSchemeToggle />
                
            </Box>
            
            <Box
              component="main"
              sx={{
                my: 'auto',
                py: 2,
                pb: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: 400,
                maxWidth: '100%',
                mx: 'auto',
                borderRadius: 'sm',
                '& form': {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                },
                [`& .${formLabelClasses.asterisk}`]: {
                  visibility: 'hidden',
                },
              }}
            >
              <Stack gap={4} sx={{ mb: 2 }}>
                <Stack gap={1}>
                  <Typography level="h3">Sign in</Typography>
                  <Typography level="body-sm">
                    New to company?{' '}
                    <Link href="#replace-with-a-link" level="title-sm">
                      Sign up!
                    </Link>
                  </Typography>
                </Stack>

                <Button
                  variant="soft"
                  color="neutral"
                  fullWidth
                  startDecorator={<GoogleIcon />}
                >
                  Continue with Google
                </Button>
              </Stack>
              <Divider
                sx={(theme) => ({
                  [theme.getColorSchemeSelector('light')]: {
                    color: { xs: '#FFF', md: 'text.tertiary' },
                    '--Divider-lineColor': {
                      xs: '#FFF',
                      md: 'var(--joy-palette-divider)',
                    },
                  },
                })}
              >
                or
              </Divider>
              <Stack gap={4} sx={{ mt: 2 }}>
                <form
                  onSubmit={async (event: React.FormEvent<SignInFormElement>) => {
                    event.preventDefault();

                    
                    const formElements = event.currentTarget.elements;
                    const data = {
                      email: formElements.email.value,
                      password: formElements.password.value,
                      persistent: formElements.persistent.checked,
                    };
                    

                    const formAction = "http://localhost:5555/auth/signin"
                    const formMethod = "POST"
          
                  
                    fetch(formAction,{
                      
                       method: formMethod,
                       body: JSON.stringify(data),
                       headers: {
                          "Content-Type" : "application/json",
                       },
                    })
                    .then((response)=>response.json())
                    .then((responseData) => { 
                      if(responseData.email === data.email) {
                      const userJson = JSON.stringify(responseData)
                  
                      setToken(userJson)
                      console.log(userJson);
                     
                    }else{ alert("invalid account or password") 
                    }

                    })
                    .catch((error) => {
                      console.log(error);
                    })
                    
                    
                  
                  }}
                >
                  <FormControl required>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" name="email" />
                  </FormControl>
                  <FormControl required>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" name="password" />
                  </FormControl>
                  <Stack gap={4} sx={{ mt: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Checkbox size="sm" label="Remember me" name="persistent" />
                      <Link level="title-sm" href="#replace-with-a-link">
                        Forgot your password?
                      </Link>
                    </Box>
                    <Button type="submit" fullWidth>
                      Sign in
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Box>
            <Box component="footer" sx={{ py: 3 }}>
              <Typography level="body-xs" textAlign="center">
                © Your company {new Date().getFullYear()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            height: '100%',
            position: 'fixed',
            right: 0,
            top: 0,
            bottom: 0,
            left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
            transition:
              'background-image var(--Transition-duration), left var(--Transition-duration) !important',
            transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
            backgroundColor: 'background.level1',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage:
              `url(https://cdn.discordapp.com/attachments/1167483960692056216/1167493724251631626/mycarrymark_3.png?ex=654e5442&is=653bdf42&hm=7a661bf066fdd2a3a1cc047c189cdcb274d1097ceb28d7f027346674dc0d0f04&)`,
            [theme.getColorSchemeSelector('dark')]: {
              backgroundImage:
                'url(https://cdn.discordapp.com/attachments/1167483960692056216/1167494499686162462/mycarrymark_4.png?ex=654e54fb&is=653bdffb&hm=d9b74edc800d205a50919a0f497c1fd3fead7426e9dcaaefe11b5737fa1ee1ab&)',
            },
          })}
        />
      </CssVarsProvider>
  );
}

JoySignInSideTemplate.propTypes = {
  set: PropTypes.func.isRequired
}