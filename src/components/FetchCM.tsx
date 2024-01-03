import React, { useState, useEffect } from "react";
import { AspectRatio, Box, Button, Divider, FormControl, FormLabel, FormHelperText, Input, IconButton, Textarea, Stack, Typography, Card, Slider, ListDivider, Avatar, List, Alert, CardOverflow, Chip, Grid, ListItem, ListItemDecorator, Tooltip, ListItemContent, AvatarGroup, Badge, badgeClasses, Tabs, TabList, Tab, tabClasses, TabPanel, CardCover } from "@mui/joy";
import Classes from "./Classes";
import OrderTable from "./OrderTable";
import { ClassMonitor } from "./ClassMonitor";
import PartitionCM from "./PartitionCM";
import OppositeContentTimeline from "./Timeline";
import axios from 'axios';
import CardContent from "@mui/joy/CardContent";
import {motion} from 'framer-motion';
import Forum from './Forum'
import GradingView from "./Grading";

interface Item { 
  id: string;
  courseCode: string;
  courseName: string;
  groupClass: string;
  nStudent: number;
  lecturers: Lecturer[];
  shortId: string;
  predictive: boolean;
  selectedImage: string;

}
interface Lecturer {
  email: string;

}


export default function FetchCM({token,selectedId}:any) {
  const [index, setIndex] = React.useState(0);
  const [data, setData] = useState<Item>({ id: '',
  courseCode: '',
  courseName: '',
  groupClass: '',
  nStudent: 0,
  lecturers: [],
  shortId: '',
  predictive: false,
  selectedImage: ''
});


  React.useEffect(() => {
    axios({
      method: 'get',
      url: `https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${selectedId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(response => {
      setData(response.data);
      console.log(response.data);
    })
    

    
  
  },[token,selectedId])

  return (
    
    <Box
      sx={{
        flex: 1,
        width: "90%",
        
        
      }}
    >
      
      <Grid>
     
      <Grid>
      
      <Box
      sx={{
        flexGrow: 1,
        m: -2,
        overflowX: 'hidden',
      }}
    >
      

      <Box sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
      >
        <Stack direction='row' alignItems='center' spacing={1}>
        <Typography level="title-lg">{data.courseCode} |</Typography>
        <Typography level="title-md" color="neutral">{data.courseName}</Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
          <motion.div  whileTap={{ scale: 0.97 }} >
          <Card orientation="horizontal" variant="outlined" sx={{ width: 340 }}>
          <CardCover>
          <img
            src={data.selectedImage || 'https://windowscustomization.com/wp-content/uploads/2018/12/Ninja-Landscape.gif'}
            srcSet={data.selectedImage + ' 2x' || 'https://windowscustomization.com/wp-content/uploads/2018/12/Ninja-Landscape.gif 2x'}
            loading="lazy"
            alt=""
          />
        </CardCover>
      <CardContent>
        <Typography fontWeight="md" textColor="white" >
          {data.shortId}
        </Typography>
        <Typography level="body-sm" textColor="white">{data.groupClass}</Typography>
        {data.predictive ? <Chip color="danger">Predictive Class</Chip> : <Chip>Non-Predictive Class</Chip>}
      </CardContent>
      <CardOverflow
        variant="soft"
        color="primary"
        sx={{
          px: 0.2,
          writingMode: 'vertical-rl',
          textAlign: 'center',
          fontSize: 'xs',
          fontWeight: 'xl',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          borderLeft: '1px solid',
          borderColor: 'divider',
        }}
      >
        CLASS ID
      </CardOverflow>
    </Card></motion.div>

        </Box>
        <Tabs
      variant="outlined"
      aria-label="Pricing plan"
      defaultValue={0}
      sx={{
        borderRadius: 'lg',
        boxShadow: 'sm',
        overflow: 'auto',
      }}
    >
      <TabList
        disableUnderline
        tabFlex={5}
        sx={{
          [`& .${tabClasses.root}`]: {
            fontSize: 'sm',
            fontWeight: 'lg',
            [`&[aria-selected="true"]`]: {
              color: 'primary.500',
              bgcolor: 'background.surface',
            },
            [`&.${tabClasses.focusVisible}`]: {
              outlineOffset: '-4px',
            },
          },
        }}
      >
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          Performance
        </Tab>
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          People
        </Tab>
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          Forum
        </Tab>
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          Partition
        </Tab>
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          Grading
        </Tab>
      </TabList>
      <TabPanel value={0}>
      <Typography level="inherit">
          Shown performance of the class
        </Typography>
        <ClassMonitor selectedId={selectedId} token={token}/>
      </TabPanel>
      <TabPanel value={1}>
      <Typography level="inherit">
          List of students in the class
        </Typography>
        <Classes selectedId={selectedId} token={token}/>
      </TabPanel>
      <TabPanel value={2}>
        <Forum selectedId={selectedId} token={token} />
      </TabPanel>
      <TabPanel value={3}>
        <Typography level="inherit">
          <Alert color="danger" variant="soft">It is not advised that you alter or remove the any assessment on this partition if it is predictive class.</Alert>
        </Typography>
        <OppositeContentTimeline selectedId={selectedId} token={token}/>
      </TabPanel>
      <TabPanel value={4}>

        <GradingView selectedId={selectedId} token={token}/>
      </TabPanel>
    </Tabs>
    </Box>
      
      </Grid>
  
      </Grid>
    </Box>
  );
}
