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

interface Performance {
  averageGrade: number;
  totalWeighted: number;
  totalWeightedAll: number;
  performanceRating : number;
}
export const ClassMonitor = ({selectedId,token}:any) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [performance, setPerformance] = useState<Performance>({averageGrade:0.0,totalWeighted:0,totalWeightedAll:0,performanceRating:0.0});

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

    const fetchPerformance = async () => {
      try{
        const response = await fetch( `https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${selectedId}/average-grade`);
        const data = await response.json();
        setPerformance(data);
      }catch(e){
        console.error('Error:', e);
      }
    }
    fetchPerformance();
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
            <Typography level="title-md">Class Monitor Performance</Typography>
            <Typography level="body-sm">
              Students <Typography variant="solid" color="success" noWrap>
    turned in
  </Typography> the assignment
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
          <Box sx={{ width: 240 , height: 150 }}>
      <Typography
        id="ellipsis-list-demo"
        level="body-xs"
        textTransform="uppercase"
        sx={{ letterSpacing: '0.15rem' }}
      >
        Score
      </Typography>
      
      <List
        aria-labelledby="ellipsis-list-demo"
        sx={{ '--ListItemDecorator-size': '56px' }}
        
      >
        <ListItem>
          <ListItemDecorator>
            <Chip>{performance.performanceRating ? performance.performanceRating.toFixed(1) : 0}</Chip>
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">Rating</Typography>
            <Stack direction='row'>
            <Typography level="body-sm" noWrap>
              
            </Typography>
            </Stack>
          </ListItemContent>
        </ListItem>
        <ListItem>
          <ListItemDecorator>
            <Chip>{performance.averageGrade ? performance.averageGrade.toFixed(1) : 0}</Chip>
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">Average Grade</Typography>
            <Stack direction='row'>
            <Typography level="body-sm" noWrap>
            
            </Typography>
            </Stack>
          </ListItemContent>
        </ListItem>
        <ListItem>
          <ListItemDecorator>
            <Chip>{performance.totalWeighted}</Chip>
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">Total Carrymark</Typography>
            <Stack direction='row'>
            <Typography level="body-sm" noWrap>
            sum of all assessment
            </Typography>
            </Stack>
          </ListItemContent>
        </ListItem>
        <Box height={10}></Box>
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