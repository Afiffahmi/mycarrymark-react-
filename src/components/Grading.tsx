import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';

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


const GradingView = () => {
    const [data, setData] = useState<Data>({ grading: [], coursework: [], student: [] });

  useEffect(() => {
    const classId = '1ggfJ0eRxkdu132uB8dj'; // replace with your class id

    fetch(`https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${classId}/grading`)
      .then(response => response.json())
      .then(data => {setData(data)
       })
      .catch(error => console.error(error));
  }, []);

  return (
    <Box sx={{ maxWidth: '100%', minWidth: 'auto' }}>
      <Stack direction="column" justifyContent="space-between" spacing={2} sx={{ mb: 0.25 }}>
        {data.coursework.map((item, index) => (
          <Typography key={index}>
            {item.coursework[index].assessmentName}
          </Typography>
        ))}
        {/* Render coursework and student data similarly */}
      </Stack>

      
    </Box>
  );
};

export default GradingView;

