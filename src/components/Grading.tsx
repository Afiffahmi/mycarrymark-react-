import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import Table from '@mui/joy/Table';
import { Button, Chip } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Add from '@mui/icons-material/Add';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

type Assessment = {
    score: string;
    weighted: string;
    assessmentName: string;
  };
  
  type CourseworkItem = {
    id: string;
    coursework: Assessment[];
  };
  
  type StudentItem = {
    id: string;
    avatar: string;
    studentid: string;
    email: string;
    online: boolean;
    name: string;
  };
  
  type GradingItem = {
    id: string;
    assessmentName: string;
    score: number;
    weighted: number;
  };
  
  type Data = {
    grading: GradingItem[];
    coursework: CourseworkItem[];
    student: StudentItem[];
  };

const GradingView = ({selectedId}:any) => {
    const [data, setData] = useState<Data>({ grading: [], coursework: [], student: [] });
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState({ studentId: '',  grades: [] as { assessmentName: string, grade: string }[] ,assessmentName: ''});

useEffect(() => {
  fetch(`https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${selectedId}/grading`)
    .then(response => response.json())
    .then(data => {
      if (data && data.coursework) {
        setData(data);
        console.log(data.student);
      } else {
        console.error('Invalid data:', data);
      }
    })
    .catch(error => console.error(error));
}, [selectedId]);


const handleSelectChange = (event:any) => {
  setFormData({ ...formData, studentId: event.target.value });
};

const handleInputChange = (assessmentName: string, index: number, event: any) => {
  const grades = [...formData.grades];
  grades[index] = { assessmentName: assessmentName, grade: event.target.value };
  setFormData({ ...formData, grades });
};

const handleSubmit = (event:any) => {
  event.preventDefault();

  fetch(`https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${selectedId}/grading`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  setOpen(false);
};

  return (
    <Box sx={{ maxWidth: '100%', minWidth: 'auto' }}>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Start grade a student</DialogTitle>
          <DialogContent>select a student and grade based on assessment</DialogContent>
          <form
            onSubmit={handleSubmit}
          >
            <Stack spacing={2}>
            <FormControl>
              <select 
                value={formData.studentId} 
                onChange={handleSelectChange}
              >
                <option>Select student</option>
                {data.student.map((item, index) => (
                  <option key={index} value={item.studentid}>
                    {item.studentid} &nbsp; {item.name}
                  </option>
                  
                ))}
              </select>

           
            </FormControl>
              <Stack direction={'row'} spacing={2}>
              {data.coursework.map((item, index) => (
                <FormControl>
                <FormLabel>{item.coursework[0].assessmentName}<Chip>{item.coursework[0].weighted}%</Chip></FormLabel>
                <Input required  onChange={(event) => handleInputChange(item.coursework[0].assessmentName, index, event)}/>
              </FormControl>
              ))}
              </Stack>

              
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
      <Table
      stickyHeader
      sx={(theme) => ({
        '& tr > *:first-child': { bgcolor: 'success.softBg' },
        '& th[scope="col"]': theme.variants.solid.neutral,
        '& td': theme.variants.soft.neutral,
      })}
    >
      <caption>Class Grading</caption>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        Grade
      </Button>
      <tbody>
      <th scope="col">Student</th>
        {data.coursework.map((item, index) => (
          <th scope="col">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {item.coursework[0].assessmentName}
            <Chip style={{ marginLeft: '10px' }}>
              {item.coursework[0].score} ({item.coursework[0].weighted}%)
            </Chip>
          </div>
        </th>
        ))}
       {data.student.map((item, index) => (
       <tr>
          <th scope="row">{item.name}</th>
        </tr>
        ))}
        

      </tbody>
    </Table>

      
    </Box>
  );
};

export default GradingView;

