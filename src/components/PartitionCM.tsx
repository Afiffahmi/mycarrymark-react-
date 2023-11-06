import { useState } from "react";
import Box  from "@mui/joy/Box";
import { Button, FormControl, FormLabel, Input, Stack } from "@mui/joy";

 
export default function PartitionCM() {
    const [ inputFields, setInputFields] = useState([
        {assessmentname: '',score:''}
    ])

    const handleFormChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    

        let data = [...inputFields];
        if(event.target.name === 'assessmentname'){
        data[index].assessmentname = event.target.value;
        setInputFields(data)
        }else if(event.target.name === 'score'){
        data[index].score = event.target.value;
        setInputFields(data)
        }
    }

    const addFields = () => {
        let newfield = {assessmentname: '',score:''};
        setInputFields([...inputFields, newfield])
    }

    const submit = (e:any) => {
        e.preventDefault();
        console.log(inputFields);

    }

    return (
    <Box sx={{
        flex: 1,
        width: "100%",
      }}>

      

    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              console.log(inputFields)}}>
    {inputFields.map((input,index)=> {
    
   

    return (
        
    <Stack direction='row' key={index} spacing={2}>
        
        <FormControl>
        <FormLabel>Assessment Name</FormLabel>
        <Input name="assessmentname" value={input.assessmentname} onChange={event => handleFormChange(index,event)} required/></FormControl>
        <FormControl>
        <FormLabel>Score</FormLabel>
        <Input name="score" value={input.score}  onChange={event => handleFormChange(index,event)} required/>
        </FormControl>
        </Stack>
        )})}
        <Box height={10}></Box>
        <Stack direction='row' spacing={2}>
        <Button onClick={addFields} >Add</Button>
        <Button type="submit" onSubmit={submit}>Submit</Button></Stack>
    </form>
    </Box>)
}