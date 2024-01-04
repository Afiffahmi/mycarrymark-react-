import { useState } from "react";
import Box  from "@mui/joy/Box";
import { Button, FormControl, FormLabel, Input, Stack ,AspectRatio, Grid} from "@mui/joy";
import { Snackbar, Typography } from "@mui/joy";
import LinearProgress from "@mui/joy/LinearProgress";
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import Info from '@mui/icons-material/Info';
import { IconButton } from "@mui/joy";

 
export default function PartitionCM({selectedId,token,setReload}:any) {
    const [ inputFields, setInputFields] = useState([
        {assessmentName: '',score:'',weighted:''}
    ])
    const [successful,setSuccessful] = useState(false);

    const handleFormChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    
        let data = [...inputFields];
        if(event.target.name === 'assessmentname'){
        data[index].assessmentName = event.target.value;
        setInputFields(data)
        }else if(event.target.name === 'score'){
        data[index].score = event.target.value;
        setInputFields(data)
        }else if(event.target.name === 'weighted'){
          data[index].weighted = event.target.value;
          setInputFields(data)
          }
    }
    
    const addFields = () => {
        let newfield = {assessmentName: '',score:'',weighted:''};
        setInputFields([...inputFields, newfield])
    }

    const submit = (e:any) => {
        e.preventDefault();
        console.log(inputFields);

    }

    return (
    <Box sx={{
        flex: 'auto',
        width: "100%",
        display: 'flex',
        overflow: 'auto',
      }}>

      

    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
             console.log(inputFields);
              const data ={coursework : inputFields};
              const formAction = `https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${selectedId}/setup`;
              const formMethod = "POST";

                fetch(formAction,{
                    method: formMethod,
                    body: JSON.stringify(data),
                    headers: {
                    "Content-Type" : "application/json"
                    },
                }).then((response)=>response.json()).then((responseData)=>{
                    if(responseData.code === 200){
                        setSuccessful(true);
                        setReload(true);
                    }

                 })
                
                .catch((error)=>{
                    console.log(error);
                })
            }}>
    {inputFields.map((input,index)=> {
    
    return (
        
    <Grid >
        {(successful ? (<Snackbar open={true}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        size="lg"
        color="success"
        variant="solid"
        invertedColors
        startDecorator={
          <AspectRatio
            variant="solid"
            ratio="1"
            sx={{
              minWidth: 40,
              borderRadius: '50%',
              boxShadow: '0 2px 12px 0 rgb(0 0 0/0.2)',
            }}
          >
            <div>
              <Check />
            </div>
          </AspectRatio>
        }
        endDecorator={
          <IconButton
          onClick={() => {setSuccessful(false)}}
            variant="plain"
            sx={{
              '--IconButton-size': '32px',
              transform: 'translate(0.5rem, -0.5rem)',
            }}
            
          >
            <Close />
          </IconButton>
        }
        sx={{ alignItems: 'flex-start', overflow: 'hidden' }}
      >
        <div>
          <Typography level="title-lg">Success</Typography>
          <Typography level="body-sm">
            Coursework setup finished.
          </Typography>
        </div>
        <LinearProgress
          variant="solid"
          color="success"
          value={40}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
          }}
        />
      </Snackbar>) : null)}
      <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} key={index} spacing={2}>
        <FormControl>
        <FormLabel>Assessment Name</FormLabel>
        <Input name="assessmentname" value={input.assessmentName} onChange={event => handleFormChange(index,event)} required/></FormControl>
        <FormControl>
        <FormLabel>Score</FormLabel>
        <Input name="score" value={input.score}  onChange={event => handleFormChange(index,event)} required/>
        </FormControl>
        <FormControl>
        <FormLabel>Weighted(%)</FormLabel>
        <Input name="weighted" value={input.weighted}  onChange={event => handleFormChange(index,event)} required/>
        </FormControl></Stack>
        </Grid>
        )})}
        <Box height={10}></Box>
        <Stack direction='row' spacing={2}>
        <Button type="submit" onSubmit={submit}>Submit</Button></Stack>
    </form>
    </Box>)
}