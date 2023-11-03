import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Box from '@mui/joy/Box';
import { Typography } from '@mui/joy';
import LinearProgress from '@mui/joy/LinearProgress';

export default function BasicModalDialog() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState(0);
  const [coursename, setCoursename] = React.useState(false);
  const [coursecode, setCoursecode] = React.useState(false);
  const [group, setGroup] = React.useState(false);
  const [part, setPart] = React.useState(false);


  function progressBar(event:any) {
    console.log(event.value && event.name === 'coursename')
    if(event.name === 'coursecode' && progress < 100 && event.value[0] && coursecode === false  ){
      setProgress(progress + 25);
      setCoursecode(true);
    }else if(event.name === 'coursecode' && progress >= 25 && !event.value[0]  ){
      setProgress(progress - 25);
      setCoursecode(false);
    }else if(event.name === 'coursename' && progress < 100 && event.value[0] && coursename === false  ){
      setProgress(progress + 25);
      setCoursename(true);
    }else if(event.name === 'coursename' && progress >= 25 && !event.value[0]  ){
      setProgress(progress - 25);
      setCoursename(false);
    }else if(event.name === 'group' && progress < 100 && event.value[0] && group === false  ){
      setProgress(progress + 25);
      setGroup(true);
    }else if(event.name === 'group' && progress >= 25 && !event.value[0]  ){
      setProgress(progress - 25);
      setGroup(false);
    }else if(event.name === 'part' && progress < 100 && event.value[0] && part === false  ){
      setProgress(progress + 25);
      setPart(true);
    }else if(event.name === 'part' && progress >= 25 && !event.value[0]  ){
      setProgress(progress - 25);
      setPart(false);
    }
      
    




  }
  return (
    <React.Fragment>
      <Stack>
      <Button
        variant="outlined"
        color="neutral"
        size='sm'
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        New Class
      </Button>
      </Stack>
      
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog size='lg' sx={{
          px: {
            xs: 10,
            md: 10,
          },
          py: {
            xs: 2,
            md: 4,
          },
        }}>
          <LinearProgress determinate value={progress}/>
          <DialogTitle>Create new class</DialogTitle>
          <DialogContent>Fill in the information of the class.</DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2} direction='row'>
              <Stack spacing={2}>
              
              <FormControl>
                <FormLabel>Course Code</FormLabel>
                <Input name="coursecode" onChange={(e) => {progressBar(e.currentTarget)}} autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Group</FormLabel>
                <Input name="group" onChange={(e) => {progressBar(e.currentTarget)}} required />
              </FormControl>
              <Button type="submit">Submit</Button>
              </Stack>
              <Stack spacing={2}>
              <FormControl>
                <FormLabel>Course Name</FormLabel>
                <Input name="coursename" onChange={(e) => {progressBar(e.currentTarget)}} required />
              </FormControl>
              <FormControl>
                <FormLabel>Part</FormLabel>
                <Input name="part" onChange={(e) => {progressBar(e.currentTarget)}} required />
              </FormControl>
              </Stack>
              
              
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
      
    </React.Fragment>
  );
}