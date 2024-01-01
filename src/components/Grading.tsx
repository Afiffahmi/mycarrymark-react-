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
import axios from 'axios';

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
    studentId: string;
    grades: { assessmentName: string, grade: string }[];
  };
  
  type Data = {
    grading: GradingItem[];
    coursework: CourseworkItem[];
    student: StudentItem[];
  };

const GradingView = ({selectedId}:any) => {
    const [data, setData] = useState<Data>({ grading: [], coursework: [], student: [] });
    const [open, setOpen] = React.useState(false);
    const [openE, setOpenE] = React.useState(false);
    const [formData, setFormData] = useState({ studentId: '',  grades: [] as { assessmentName: string, grade: string }[] ,assessmentName: ''});
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [grades, setGrades] = useState<{ [key: string]: string }>({});




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
  setGrades(prevGrades => ({
    ...prevGrades,
    [assessmentName]: event.target.value,
  }));
};

const handleEditClick = async (studentId:any) => {
  setSelectedStudentId(studentId);
  setOpenE(true);

  // Fetch the grades
  const response = await fetch(`https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${selectedId}/grading/${studentId}`);
  const data = await response.json();

  console.log(data); // Log the data to the console

  // Transform the grades into the format that your state expects
  const grades = data.grades.reduce((acc:any, grade:any) => {
    acc[grade.assessmentName] = grade.grade;
    return acc;
  }, {});

  setGrades(grades);
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
    console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  setOpen(false);
};

const handleEdit = async (event:any) => {
  event.preventDefault();

  const gradesArray = Object.entries(grades).map(([assessmentName, grade]) => ({
    assessmentName,
    grade,
  }));

  const dataToSend = {
    studentId: selectedStudentId,
    grades: gradesArray,
  };

  fetch(`https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${selectedId}/grading`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  setOpenE(false);
};

  return (
    <Box sx={{ maxWidth: '100%', minWidth: 'auto' }}>
      {/* grade modal */}
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
      
      {/* edit modal */}
      <Modal open={openE} onClose={() => setOpenE(false)}>
  <ModalDialog>
    <DialogTitle>Edit Grade</DialogTitle>
    <DialogContent>add new grading score</DialogContent>
    <form onSubmit={handleEdit}>
      <Stack spacing={2}>
        <FormControl>
          <Input value={selectedStudentId} disabled/>
        </FormControl>
        <Stack direction={'row'} spacing={2}>
          {data.coursework.map((item, index) => (
            <FormControl key={index}>
              <FormLabel>{item.coursework[0].assessmentName}<Chip>{item.coursework[0].weighted}%</Chip></FormLabel>
              <Input 
                value={grades[item.coursework[0].assessmentName]} 
                onChange={(event) => handleInputChange(item.coursework[0].assessmentName,index,event)}
              />
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
       {data.student.map((student, index) => {
  // Find the grading object for this student
  const grading = data.grading.find(g => g.studentId === student.studentid);

  return (
    <tr key={index}>
      
      <th scope="row">
      <Button style={{ marginLeft: '10px' }} onClick={() => {setOpenE(true);setSelectedStudentId(student.studentid);handleEditClick(student.studentid)}}>Edit</Button>
        {student.name}
      </th>
      
      {grading && grading.grades.map((grade, gradeIndex) => (
        <td key={gradeIndex}>
          {grade.grade}
        </td>
      ))}
    </tr>
  );
})}
        

      </tbody>
    </Table>

      
    </Box>
  );
};

export default GradingView;

