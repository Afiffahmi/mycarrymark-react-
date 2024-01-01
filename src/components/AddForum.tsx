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
  sender: HTMLInputElement;
  title: HTMLInputElement;
  content : HTMLInputElement;
  avatar : HTMLInputElement;
  online : HTMLInputElement;
}
interface AddClassFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function AddForum({token,selectedId,setReload}:any) {
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
        Add Forum
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
          <DialogTitle>Add Forum</DialogTitle>
          <DialogContent>Fill in the information of the forum.</DialogContent>
          <form
            onSubmit={async(event: React.FormEvent<AddClassFormElement>) => {
              event.preventDefault();
              const formElements = event.currentTarget.elements;
              const data = {
                title : formElements.title.value,
                content : formElements.content.value,
                timestamp : Date.now(),
                email : false
              };

              const formAction = `https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${selectedId}/forum`
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
                <FormLabel>Title</FormLabel>
                <Input name="title"  autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Content</FormLabel>
                <Input name="content" type="textarea"  required />
              </FormControl>
              <Button type="submit">Submit</Button>
              </Stack>
              <Stack spacing={2}>             
              </Stack>
              
              
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
      
    </React.Fragment>
  );
        }