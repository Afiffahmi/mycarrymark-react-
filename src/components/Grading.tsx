import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import Table from '@mui/joy/Table';
import { Alert, Button, Chip, IconButton } from '@mui/joy';
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
import EditRounded from '@mui/icons-material/EditRounded';

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
    const [reload, setReload] = useState(false);
    const [inputValues, setInputValues] = useState<string[]>([]);





useEffect(() => {
  fetch(`https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${selectedId}/grading`)
    .then(response => response.json())
    .then(data => {
      if (data && data.coursework) {
        setData(data);
        
      } else {
        console.error('Invalid data:', data);
      }
    })
    .catch(error => console.error(error));

    setReload(false);
}, [selectedId,reload]);

useEffect(() => {
  if (openE) {
    fetchGradingData(selectedStudentId)
      .then(data => {
        setFormData(data);
        // Set inputValues to the previous grades
        setInputValues(data.grades.map((grade: any) => grade.grade));
      });
  }
}, [openE, selectedStudentId]);

const fetchGradingData = async (studentId: string) => {
  const response = await fetch(`https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${selectedId}/grading/${studentId}`);
  const data = await response.json();
  return data;
};

const handleSelectChange = (event:any) => {
  setFormData({ ...formData, studentId: event.target.value });
};

const handleInputChange = (assessmentName: string, index: number, event: any,weightedScore :any) => {
  const grades = [...formData.grades];
  grades[index] = { assessmentName: assessmentName, grade: weightedScore };
  setFormData({ ...formData, grades });
  setGrades(prevGrades => ({
    ...prevGrades,
    [assessmentName]: weightedScore,
  }));
};

const handleEditClick = async (studentId:any) => {
  setSelectedStudentId(studentId);
  setOpenE(true);
try{
  
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
  setReload(true);
  
} catch (error) {
  if (error) {
    alert('Please grade first before editing.');
    setOpenE(false);
    return;
  }
}
  
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
    setReload(true);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  setOpen(false);
};

const handleEdit = async (event:any) => {
  event.preventDefault();
  console.log("handleEdit called");
  

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
    console.log('Success:', data);
    setReload(true);
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
                <FormLabel>{item.coursework[0].assessmentName}<Chip>{item.coursework[0].score}</Chip></FormLabel>
                <Input required 
                 onChange={(event) => {
                  const score = Number(event.target.value);
                  const weight = Number(item.coursework[0].weighted);
                  const totalscore = Number(item.coursework[0].score);
                  const weightedScore = (score/totalscore * weight).toString();
                  handleInputChange(item.coursework[0].assessmentName, index,event ,weightedScore)}}/>
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
    <DialogContent>
    <Alert color='danger'>You may see the % marks, but edit and enter the one you selected, using a score instead of a percentage like the others.</Alert>
      edit grading score

      
    </DialogContent>
    <form onSubmit={handleEdit}>
      <Stack spacing={2}>
        <FormControl>
          <Input value={selectedStudentId} disabled/>
        </FormControl>
        <Stack direction={'row'} spacing={2}>
          {data.coursework.map((item, index) => (
            <FormControl key={index}>
              <FormLabel>{item.coursework[0].assessmentName}<Chip>{item.coursework[0].score}</Chip></FormLabel>
              <Input
  required
  placeholder={((Number(inputValues[index])/Number(item.coursework[0].weighted)) * Number(item.coursework[0].score)).toString() || ''}
  value={(inputValues[index])}
  onChange={(event) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
    const score =  Number(event.target.value); // Use the new input value
    const weight = Number(item.coursework[0].weighted);
    const totalscore = Number(item.coursework[0].score);
    const weightedScore = (score/totalscore * weight).toString();
    handleInputChange(item.coursework[0].assessmentName, index, event,weightedScore);
  }}
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
  <tr>
    <th scope="col">Student</th>
    {data.coursework.map((item, index) => (

      <th key={index} scope="col">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {item.coursework[0].assessmentName}
          <Chip style={{ marginLeft: '10px' }}>
            {item.coursework[0].score} ({item.coursework[0].weighted}%)
          </Chip>
        </div>
      </th>
    
    ))}
    <th scope="col">Total Carrymark 
    <Chip style={{ marginLeft: '10px' }}>
    {data.coursework.reduce((carrymarkTotal, item) => carrymarkTotal + Number(item.coursework[0].weighted), 0)}%
  </Chip></th>
    
  </tr>
  
  
  {data.student.map((student, index) => {
    // Find the grading object for this student
    const grading = data.grading.find(g => g.studentId === student.studentid);
    let total = 0;
    if (grading) {
      total = grading.grades.reduce((sum, grade) => sum + Number(grade.grade), 0);
    }
    return (<>
      <tr key={index}>
        <th scope="row">
          <IconButton onClick={() => {setOpenE(true);setSelectedStudentId(student.studentid);handleEditClick(student.studentid)}} ><EditRounded/></IconButton>
          {student.name}
        </th>
        
        {data.coursework.map((item, courseworkIndex) => {
          // Find the grade for this coursework
          
          const grade = grading ? grading.grades.find(g => g.assessmentName === item.coursework[0].assessmentName) : null;
          return (
            <td key={courseworkIndex}>
              {grade ? Number(grade.grade).toFixed(2) : ''}
            </td>
          );
        })}
       <td>
          {Number(total).toFixed(2)}
        </td>
      </tr>
      </>
      
    );
  })}
</tbody>
    </Table>

      
    </Box>
  );
};

export default GradingView;

