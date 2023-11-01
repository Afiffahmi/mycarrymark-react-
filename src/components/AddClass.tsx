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

export default function BasicModalDialog() {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <Stack>
      <FormLabel>Create</FormLabel>
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
        <ModalDialog size='lg' >
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
                <Input autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Group</FormLabel>
                <Input required />
              </FormControl>
              <Button type="submit">Submit</Button>
              </Stack>
              <Stack spacing={2}>
              <FormControl>
                <FormLabel>Course Name</FormLabel>
                <Input required />
              </FormControl>
              <FormControl>
                <FormLabel>Part</FormLabel>
                <Input required />
              </FormControl>
              </Stack>
              
              
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
      
    </React.Fragment>
  );
}