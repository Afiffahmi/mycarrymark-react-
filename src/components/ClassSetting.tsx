import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Switch from '@mui/joy/Switch';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';
import ModalOverflow from '@mui/joy/ModalOverflow';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import SettingsRounded from "@mui/icons-material/SettingsRounded"; 
import { IconButton, Input } from '@mui/joy';
import Box from '@mui/joy/Box';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

export default function ModalDialogOverflow({images,data,selectedId,setReload,setSuccessful}:any) {
  const [layout, setLayout] = React.useState<ModalDialogProps['layout'] | undefined>(
    undefined,
  );
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setInputValues({
      courseCode: data.courseCode,
      courseName: data.courseName,
      groupClass: data.groupClass,
      part: data.part,
    });
  }, [data]);

  const [inputValues, setInputValues] = React.useState({
    courseCode: '',
    courseName: '',
    groupClass: '',
    part: '',
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [field]: event.target.value,
    });
  };

  const updateData = async () => {
    try {
      const response = await axios.put(`https://mycarrymark-node-afiffahmis-projects.vercel.app/class/update/${selectedId}`, inputValues);
      console.log(response.data);
      setSuccessful(true);
      setReload(true);
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Stack direction="row" spacing={1}>
        <IconButton
          variant="outlined"
          color="neutral"
          onClick={() => {
            setOpen(true);
          }}
        >
          <SettingsRounded/>
        </IconButton>
      </Stack>
      <Modal
        open={open}
        onClose={() => {
          setLayout(undefined);
        }}
        sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', // Aligns the modal to the right
            overflow: 'auto' // Allows scrolling if the content overflows
          }}
      >
        <Box sx={{ width: '100%' }}>
        <ModalOverflow >
          <ModalDialog aria-labelledby="modal-dialog-overflow" minWidth={500} sx={{ 
    width: '50%', 
    marginRight: 0, 
    maxHeight: '100%', 
    overflow: 'auto',
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundImage: `url(${images})`, // Sets the background image of the ModalDialog
    backgroundSize: 'cover', // Makes the background image cover the entire ModalDialog
    backgroundPosition: 'center' // Centers the background image
        }} >
            <IconButton variant='soft' onClick={()=>setOpen(false)} sx={{ 
      position: 'absolute', // Add this
      top:5, // Add this
      right: 5, // Add this
    }}><CloseIcon/></IconButton>
            
            <Typography id="modal-dialog-overflow" level="h2">
              
            </Typography>
            <FormControl
                orientation="horizontal"
                sx={{ 
                  bgcolor: 'background.level2', 
                  p: 1, 
                  borderRadius: 'sm',
                  display: 'flex', // Makes the FormControl a flex container
                  flexDirection: 'column', // Stacks the children vertically
                  alignItems: 'stretch' // Stretches the children to fill the width of the FormControl
                }}
            >
                <FormLabel>Course Name</FormLabel>
                <Input value={inputValues.courseName} onChange={handleInputChange('courseName')}></Input>

            </FormControl>
            <FormControl
                orientation="horizontal"
                sx={{ 
                  bgcolor: 'background.level2', 
                  p: 1, 
                  borderRadius: 'sm',
                  display: 'flex', // Makes the FormControl a flex container
                  flexDirection: 'column', // Stacks the children vertically
                  alignItems: 'stretch' // Stretches the children to fill the width of the FormControl
                }}
            >
                <FormLabel>Course Code</FormLabel>
                <Input value={inputValues.courseCode} onChange={handleInputChange('courseCode')}></Input>

            </FormControl>
            <FormControl
                orientation="horizontal"
                sx={{ 
                  bgcolor: 'background.level2', 
                  p: 1, 
                  borderRadius: 'sm',
                  display: 'flex', // Makes the FormControl a flex container
                  flexDirection: 'column', // Stacks the children vertically
                  alignItems: 'stretch' // Stretches the children to fill the width of the FormControl
                }}
            >
                <FormLabel>Group</FormLabel>
                <Input value={inputValues.groupClass} onChange={handleInputChange('groupClass')}></Input>

            </FormControl>
            <FormControl
                orientation="horizontal"
                sx={{ 
                  bgcolor: 'background.level2', 
                  p: 1, 
                  borderRadius: 'sm',
                  display: 'flex', // Makes the FormControl a flex container
                  flexDirection: 'column', // Stacks the children vertically
                  alignItems: 'stretch' // Stretches the children to fill the width of the FormControl
                }}
            >
                <FormLabel>Part</FormLabel>
                <Input value={inputValues.part} onChange={handleInputChange('part')}></Input>

            </FormControl>
            <Button sx={{ 
                  borderRadius: 'sm',
                  display: 'flex', // Makes the FormControl a flex container
                  flexDirection: 'column', // Stacks the children vertically
                  alignItems: 'stretch' // Stretches the children to fill the width of the FormControl
                }}  color="primary" onClick={updateData}>
          Submit
        </Button>
          </ModalDialog>
        </ModalOverflow>
        </Box>
      </Modal>
    </React.Fragment>
  );
}