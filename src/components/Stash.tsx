import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Divider from '@mui/joy/Divider';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Chip from '@mui/joy/Chip';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

// Icons import
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Snackbar  from '@mui/joy/Snackbar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
// custom
import Layout from './Layout';
import TableFiles from './TableFiles';
import { FormControl, FormLabel,DialogContent } from '@mui/joy';
import Skeleton from '@mui/joy/Skeleton';

interface FormElements extends HTMLFormControlsCollection {
  filename : HTMLInputElement;
}
interface AddClassFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function FilesExample({token}:any) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [file, setFile] = React.useState(null);
  const [files, setFiles] = React.useState([]);
  const [reload, setReload] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const user = JSON.parse(token);
  

  React.useEffect(() => {
    fetch(`https://mycarrymark-node-afiffahmis-projects.vercel.app/auth/${user.email}/files`)
      .then(response => response.json())
      .then(data => {setFiles(data);
        setReload(false);
      setLoading(false);})
      .catch(error => console.error('Error:', error));

      console.log(files)
  }, [reload]);

  const handleFileChange = (event:any) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async (event:any) => {
    event.preventDefault();

    if(!file){
      console.error("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append('filename', file);
  
    const formAction = `https://mycarrymark-node-afiffahmis-projects.vercel.app/auth/${user.email}/upload`
    const formMethod = "POST"

    fetch(formAction,{
      method: formMethod,
      body: formData,
    }).then((response)=>response.json()).then((data)=>{
      setReload(true); 
    })
    .catch((error)=>{
      console.log(error);
    })

    setOpen(false);
  }

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
        </Layout.SideDrawer>
      )}
      <Stack
        id="tab-bar"
        direction="row"
        justifyContent="space-around"
        spacing={1}
        sx={{
          display: { xs: 'flex', sm: 'none' },
          zIndex: '999',
          bottom: 0,
          position: 'fixed',
          width: '100dvw',
          py: 2,
          backgroundColor: 'background.body',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        
      </Stack>
 
            
  
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 2,
            }}
          >
             <Button sx={{mx: {md:5, xs:5}, pb:{md:1}, xs:{md:4}} } onClick={() => setOpen(true)}>Add</Button>
            {' '}
            <Sheet
              variant="outlined"
              sx={{
                borderRadius: 'sm',
                gridColumn: '1/-1',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Upload a file
          </Typography>
          <DialogContent>select any file to upload.</DialogContent>
          <form
            onSubmit={uploadFile}
          >
            <Stack spacing={2} direction='row'>
              <Stack spacing={2}>
              <FormControl>
                <FormLabel>File : </FormLabel>
                <input type='file' name='filename' onChange={handleFileChange}></input>
              </FormControl>
              <Button type="submit">upload</Button>
              </Stack>
              
              
            </Stack>
          </form>
        </Sheet>
      </Modal>
              <TableFiles files = {files} loading = {loading}/>
            </Sheet>
            <Sheet
              variant="outlined"
              sx={{
                display: { xs: 'inherit', sm: 'none' },
                borderRadius: 'sm',
                overflow: 'auto',
                backgroundColor: 'background.surface',
                '& > *': {
                  '&:nth-child(n):not(:nth-last-child(-n+4))': {
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  },
                },
              }}
            >
            </Sheet>
            <Card variant="outlined" size="sm">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">lotr-two-towers.pdf</Typography>
                  <Typography level="body-sm">132.2MB</Typography>
                </Box>
                <Dropdown>
                  <MenuButton
                    variant="plain"
                    size="sm"
                    sx={{
                      maxWidth: '32px',
                      maxHeight: '32px',
                      borderRadius: '9999999px',
                    }}
                  >
                    <IconButton
                      component="span"
                      variant="plain"
                      color="neutral"
                      size="sm"
                    >
                      <MoreVertRoundedIcon />
                    </IconButton>
                  </MenuButton>
                  <Menu
                    placement="bottom-end"
                    size="sm"
                    sx={{
                      zIndex: '99999',
                      p: 1,
                      gap: 1,
                      '--ListItem-radius': 'var(--joy-radius-sm)',
                    }}
                  >
                    <MenuItem>
                      <EditRoundedIcon />
                      Rename file
                    </MenuItem>
                    <MenuItem>
                      <ShareRoundedIcon />
                      Share file
                    </MenuItem>
                    <MenuItem sx={{ textColor: 'danger.500' }}>
                      <DeleteRoundedIcon  />
                      Delete file
                    </MenuItem>
                  </Menu>
                </Dropdown>
              </Box>
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderTop: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="primary" sx={{ borderRadius: 0 }}>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?auto=format&fit=crop&q=80&w=3024&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                </AspectRatio>
              </CardOverflow>
              <Typography level="body-xs">Added 27 Jun 2023</Typography>
            </Card>
          </Box>
     
    </CssVarsProvider>
  );
}