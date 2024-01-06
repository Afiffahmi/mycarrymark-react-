import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import axios from 'axios';
import Snackbar from '@mui/joy/Snackbar';
import LinearProgress from '@mui/joy/LinearProgress';
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";


export default function MyProfile({token}:any) {
    const user = JSON.parse(token);
    const [inputValues, setInputValues] = React.useState({
      firstName: '',
      lastName: '',
      role: '',
    });
    const [reload, setReload] = React.useState(false);
    const [successful, setSuccessful] = React.useState(false);



    React.useEffect(() => {
      fetchData();
      
    }, [reload]); 

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
        setReload(false);
      } catch (error) {
        console.error(error);
      }
    };


    
    const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValues({
        ...inputValues,
        [field]: event.target.value,
      });
    };

    const updateData = async () => {
      try {
        const response = await axios.post(`https://mycarrymark-node-afiffahmis-projects.vercel.app/carrymark/${user.providerData[0].uid}/profile`, inputValues);
        console.log(response.data);
        setSuccessful(true);
        setReload(true);
        
      } catch (error) {
        console.error(error);
      }

    };

  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: {
            sm: -100,
            md: -110,
          },
          bgcolor: 'background.body',
          zIndex: 9995,
        }}
      >
               {successful ? (
          <Snackbar
            open={reload}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            autoHideDuration={3000}
            size="lg"
            color="success"
            variant="solid"
            invertedColors
            onClose={(event, reason) => {
              if (reason === 'clickaway') {
                return;
              }
            }}
            startDecorator={
              <AspectRatio
                variant="solid"
                ratio="1"
                sx={{
                  minWidth: 40,
                  borderRadius: "50%",
                  boxShadow: "0 2px 12px 0 rgb(0 0 0/0.2)",
                }}
              >
                <div>
                  <Check />
                </div>
              </AspectRatio>
            }
            endDecorator={
              <IconButton
                onClick={() => {
                  setSuccessful(false);
                }}
                variant="plain"
                sx={{
                  "--IconButton-size": "32px",
                  transform: "translate(0.5rem, -0.5rem)",
                }}
              >
                <Close />
              </IconButton>
            }
            sx={{ alignItems: "flex-start", overflow: "hidden" }}
          >
            <div>
              <Typography level="title-lg">Success</Typography>
              <Typography level="body-sm">
                Done editing your profile
              </Typography>
            </div>
            <LinearProgress
              variant="solid"
              color="success"
              value={40}
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                borderRadius: 0,
              }}
            />
          </Snackbar>
        ) : null} 
      </Box>

      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          maxWidth: '800px',
          mx: 'auto',
          px: {
            xs: 2,
            md: 6,
          },
          py: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Personal info</Typography>
            <Typography level="body-sm">
              Customize how your profile information will apper to the networks.
            </Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiqFXMci09aURe0zxu_kJflYFJ2PefRiVyyA&usqp=CAU"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>

            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{
                    display: {
                      sm: 'flex-column',
                      md: 'flex-row',
                    },
                    gap: 2,
                  }}
                >
                  <Input size="sm" placeholder="First name" value={inputValues.firstName} onChange={handleInputChange('firstName')} required/>
                  <Input size="sm" placeholder="Last name" value={inputValues.lastName} onChange={handleInputChange('lastName')} sx={{ flexGrow: 1 }} required/>
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input size="sm" defaultValue="Senior Lecturer" value={inputValues.role} onChange={handleInputChange('role')} required/>
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                size="sm"
                type="email"
                startDecorator={<EmailRoundedIcon />}
                placeholder="email"
                defaultValue={user.providerData[0].uid}
                sx={{ flexGrow: 1 }}
                disabled
              />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="solid" onClick={updateData}>
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}