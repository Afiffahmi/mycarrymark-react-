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
import { Alert, Select, Typography,Option, Checkbox, IconButton, Tooltip } from '@mui/joy';
import LinearProgress from '@mui/joy/LinearProgress';
import Info from '@mui/icons-material/Info';


interface FormElements extends HTMLFormControlsCollection {
  coursename: HTMLInputElement;
  coursecode: HTMLInputElement;
  group : HTMLInputElement;
  part : HTMLInputElement;
}
interface AddClassFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function BasicModalDialog({setSuccessful,token,setReload}:any) {
  const user = JSON.parse(token);

  const [open, setOpen] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState(0);
  const [coursename, setCoursename] = React.useState(false);
  const [coursecode, setCoursecode] = React.useState(false);
  const [group, setGroup] = React.useState(false);
  const [part, setPart] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);

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
        variant="solid"
        color="primary"
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
            xs: 3,
            md: 4,
          },
          mx: {
            xs: 2,
            md: 10,
          },

        }}>
          <LinearProgress determinate value={progress}/>
          <DialogTitle>Create new class</DialogTitle>
          <DialogContent>Fill in the information of the class.</DialogContent>
          <form
            onSubmit={async(event: React.FormEvent<AddClassFormElement>) => {
              event.preventDefault();
              const formElements = event.currentTarget.elements;
              const data = {
                email : user.email,
                coursecode : formElements.coursecode.value,
                coursename : formElements.coursename.value,
                group : formElements.group.value,
                part : formElements.part.value,
                selectedImage : selectedValue,
                predictive : isChecked

              };

              const formAction = "https://mycarrymark-node-afiffahmis-projects.vercel.app/class/new"
              const formMethod = "POST"

              fetch(formAction,{
                method: formMethod,
                body: JSON.stringify(data),
                headers: {
                  "Content-Type" : "application/json"
                },
              }).then((response)=>response.json())
              .then((responseData)=>{
                setCoursecode(false);
                setCoursename(false);
                setGroup(false);
                setPart(false);
                setSuccessful(true);
                setReload(true);
                   
              })
              .catch((error)=>{
                console.log(error);
              })

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
              <FormControl>
               
                <Checkbox label={"Predictive"} checked={isChecked}  onChange={(e) => setIsChecked(e.target.checked)}/>
                <Tooltip title="Predictive grading will be enabled for this class. The courseworks will be auto-generated">
                <IconButton>
                  
                <Info />
              </IconButton>
              </Tooltip>
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
                <Input name="part" type="number" onChange={(e) => {progressBar(e.currentTarget)}} required />
              </FormControl>
              
              <FormControl>
              
              <FormLabel>Theme</FormLabel>
              <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
              <option value={'https://e1.pxfuel.com/desktop-wallpaper/789/226/desktop-wallpaper-1920x1080-space-dark-red-space.jpg'}>Dark Red Space</option>
              <option value={'https://steamuserimages-a.akamaihd.net/ugc/791991374973253058/E3360BCEB1F1EC15FAC2B598B0E3169CF0AB0674/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'}>Night City</option>
              <option value={'https://i.gifer.com/embedded/download/T2v6.gif'}>Foggy Mountain</option>
              <option value={'https://windowscustomization.com/wp-content/uploads/2018/12/Ninja-Landscape.gif'}>Lost in Japan</option>
              <option value={'https://miro.medium.com/v2/resize:fit:1280/1*B4NL8NsOivEV0UUx8CdYZg.gif'}>Artificial Intelligence</option>
              <option value={'https://img.freepik.com/free-photo/snowy-mountain-peak-starry-galaxy-majesty-generative-ai_188544-9650.jpg'}>The Cave</option>
              <option value={'https://4kwallpapers.com/images/wallpapers/landscape-rocks-5120x2880-11016.jpg'}>Desert</option>
              </select>
              </FormControl>
              
                
              </Stack>
              
              
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
      
    </React.Fragment>
  );
}