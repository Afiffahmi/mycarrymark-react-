import Stack from "@mui/joy/Stack";
import { Card, Box,List,ListItem,ListItemContent,Button,Chip,Avatar,Divider } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import React from "react";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Tooltip from "@mui/joy/Tooltip";
import Badge, { badgeClasses } from "@mui/joy/Badge";
import AvatarGroup from "@mui/joy/AvatarGroup";
import Slider from "@mui/joy/Slider";
import { useState,useEffect } from "react";

interface Student {
  studentName: string;
  studentId: string;
  studentEmail: string;
  avatar: string;
  totalGrade: string;
  worstGrade: string;
  totalWeighted: number;
}
export const ClassMonitor = ({selectedId,token}:any) => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch( `https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${selectedId}/bad-performance`);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchStudents();
  }, [selectedId]);
    return (
        <Stack
        spacing={1}
        direction="row"
        sx={{

          px: {
            xs: 2,
            md: 2,
          },
          py: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <Card variant="outlined" color="neutral">
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Assignment Submmission</Typography>
            <Typography level="body-sm">
              Students <Typography variant="solid" color="success" noWrap>
    turned in
  </Typography> the assignment
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
          <Box sx={{ width: 240 , height: 100 }}>
      <Typography
        id="ellipsis-list-demo"
        level="body-xs"
        textTransform="uppercase"
        sx={{ letterSpacing: '0.15rem' }}
      >
        Students
      </Typography>
      <List
        aria-labelledby="ellipsis-list-demo"
        sx={{ '--ListItemDecorator-size': '56px' }}
        
      >
        <ListItem>
          <ListItemDecorator>
            <Avatar src="https://cdn.uitm.edu.my/gambar_warga/3fcc9a6758c8adca9d980bb1a012d075.png" />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">Muhammad Syafiq Kheruddin</Typography>
            <Stack direction='row'>
            <Chip color="primary" size="sm">CSC662</Chip>
            <Typography level="body-sm" noWrap>
              Submited assignment 1
            </Typography>
            </Stack>
          </ListItemContent>
        </ListItem>
        <ListItem>
          <ListItemDecorator>
            <Avatar src="https://cdn.uitm.edu.my/gambar_warga/c4bf2caecaed27a931c1f3968ad74cc9.png" />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">Nur Anis Khairina</Typography>
            <Stack direction='row'>
            <Chip color="primary" size="sm">CSC662</Chip>
            <Typography level="body-sm" noWrap>
              Submited assignment 1
            </Typography>
            </Stack>
            
          </ListItemContent>
          
         
        </ListItem>
        <Box height={10}></Box>
         <ListItem>
          <ListItemContent>
          <AvatarGroup size="sm" sx={{ flexDirection: 'row-reverse' }}>
      <Avatar>+3</Avatar>
      <Avatar alt="Cindy Baker" src="https://cdn.uitm.edu.my/gambar_warga/92f42034219a8d85cac7c21169e8b1c4.png" />
      <Avatar alt="Travis Howard" src="https://cdn.uitm.edu.my/gambar_warga/f4251db8ceea3f3f2eb6a79bfc4d8282.png" />
      <Avatar alt="Remy Sharp" src="https://cdn.uitm.edu.my/gambar_warga/c4db5493fa57464b8c9e020aec691ab0.png" />
    </AvatarGroup>
          </ListItemContent>
         </ListItem>
      </List>
    </Box>
          </Stack>
        </Card>
        

        <Card variant="outlined" color="danger">
           
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Bad Performance Students</Typography>
            <Typography level="body-sm">
              Shown students currently in <Typography variant="solid" color="danger" noWrap>
    Poor performance
  </Typography>
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}direction='row'>
          <Box sx={{ width: 400 }}>
      <Typography
        id="ellipsis-list-demo"
        level="body-xs"
        textTransform="uppercase"
        sx={{ letterSpacing: '0.15rem' }}
      >
        Students
      </Typography>
      {students && students.map((student:any) => (
      <List 
      aria-labelledby="ellipsis-list-demo"
        sx={{ '--ListItemDecorator-size': '56px' }}>
        <ListItem>
          <ListItemDecorator>
          <Badge
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeInset="14%"
        color="danger"
        sx={{
          [`& .${badgeClasses.badge}`]: {
            '&::after': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              animation: 'ripple 1.2s infinite ease-in-out',
              border: '2px solid',
              borderColor: 'danger.500',
              content: '""',
            },
          },
          '@keyframes ripple': {
            '0%': {
              transform: 'scale(1)',
              opacity: 1,
            },
            '100%': {
              transform: 'scale(2)',
              opacity: 0,
            },
          },
        }}
      >
        <Avatar alt="Remy Sharp" src={student.avatar} />
      </Badge>
          </ListItemDecorator>
          
          <ListItemContent>
          <Typography level="title-sm">{student.studentName}</Typography>
            <Stack direction='row'>
            <Typography level="body-sm" noWrap>
            {student.studentId}
            </Typography>
            </Stack>
          </ListItemContent>
        </ListItem>
        <ListItem>

          <Box height={40}></Box>
          <ListItemContent>
        
          <Typography>Current Carrymark</Typography>
        
          </ListItemContent>
          <ListItemDecorator>
          <Tooltip title="Quiz 1" variant="soft">
            <Button variant="soft" color="danger">{student.totalGrade}/{student.totalWeighted}</Button>
          </Tooltip>
          </ListItemDecorator>
        </ListItem>
        <ListItem>

          <Box height={40}></Box>
          <ListItemContent>
        
          <Typography>Worst Carrymark</Typography>
          <Chip>{student.worstAssessmentName}</Chip>
          </ListItemContent>
          <ListItemDecorator>
          <Tooltip title="Quiz 1" variant="soft">
            
            <Button variant="soft" color="danger"> {student.worstGrade}</Button>
          </Tooltip>
          </ListItemDecorator>
        </ListItem>
      </List>))}
    </Box>

          </Stack>
        </Card>
      </Stack>
    )
}