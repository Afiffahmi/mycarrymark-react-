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
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Create new project</DialogTitle>
          <DialogContent>Fill in the information of the project.</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
              <Select placeholder="Choose one…">
              {data.student.map((item, index) => (
                <Option value={item.studentid}>{item.studentid}</Option>
              ))}
              
              </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input required />
              </FormControl>
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

