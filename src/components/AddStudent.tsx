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



interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  studentid: HTMLInputElement;
  name : HTMLInputElement;
  avatar : HTMLInputElement;
  online : HTMLInputElement;
}
interface AddClassFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function AddStudent({token,selectedId,setReload}:any) {
  const [open, setOpen] = React.useState<boolean>(false);
    
  
  return (
    <React.Fragment>

      <Button
        variant="solid"
        color="primary"
        size='sm'
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        Add Student
      </Button>
    
      
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog size='lg' sx={{
          px: {
            xs: 10,
            md: 10,
          },
          py: {
            xs: 3,
            md: 4,
          },
          mx: {
            xs: 2,
            md: 10,
          },

        }}>
          <DialogTitle>Add Student</DialogTitle>
          <DialogContent>Fill in the information of the student.</DialogContent>
          <form
            onSubmit={async(event: React.FormEvent<AddClassFormElement>) => {
              event.preventDefault();
              const formElements = event.currentTarget.elements;
              const data = {
                name : formElements.name.value,
                email : formElements.email.value,
                studentid : formElements.studentid.value,
                avatar : 'https://i.pinimg.com/236x/9c/36/b1/9c36b1fd301f7d8b5c810e6bfaa2bf1a.jpg',
                online : false
              };

              const formAction = `https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${selectedId}/student`
              const formMethod = "POST"

              fetch(formAction,{
                method: formMethod,
                body: JSON.stringify(data),
                headers: {
                  "Content-Type" : "application/json"
                },
              }).then((response)=>response.json())
              .then((responseData)=>{
                
              })
              .catch((error)=>{
                console.log(error);
              })
              setReload(true);
              setOpen(false);
            }}
          >
            <Stack spacing={2} direction='row'>
              <Stack spacing={2}>
              <FormControl>
                <FormLabel>Student Name</FormLabel>
                <Input name="name"  autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Student ID</FormLabel>
                <Input name="studentid"  required />
              </FormControl>
              <Button type="submit">Submit</Button>
              </Stack>
              <Stack spacing={2}>
              <FormControl>
                <FormLabel>Student email</FormLabel>
                <Input name="email"  required />
              </FormControl>              
              </Stack>
              
              
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
      
    </React.Fragment>
  );
        }