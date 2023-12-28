import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import Table from '@mui/joy/Table';
import { Chip } from '@mui/joy';

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

  return (
    <Box sx={{ maxWidth: '100%', minWidth: 'auto' }}>

      <Table
      stickyHeader
      sx={(theme) => ({
        '& tr > *:first-child': { bgcolor: 'success.softBg' },
        '& th[scope="col"]': theme.variants.solid.neutral,
        '& td': theme.variants.soft.neutral,
      })}
    >
      <caption>Class Grading</caption>
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
          <td>7</td>
          <td>4,569</td>
        </tr>
        ))}
        

      </tbody>
    </Table>

      
    </Box>
  );
};

export default GradingView;

