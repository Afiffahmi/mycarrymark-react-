import React, { useState, useEffect } from "react";
import { AspectRatio, Box, Button, Divider, FormControl, FormLabel, FormHelperText, Input, IconButton, Textarea, Stack, Typography, Card, Slider, ListDivider, Avatar, List, Alert, CardOverflow, Chip, Grid, ListItem, ListItemDecorator, Tooltip, ListItemContent, AvatarGroup, Badge, badgeClasses, Tabs, TabList, Tab, tabClasses, TabPanel } from "@mui/joy";
import Classes from "./Classes";
import OrderTable from "./OrderTable";
import { ClassMonitor } from "./ClassMonitor";
import PartitionCM from "./PartitionCM";
import OppositeContentTimeline from "./Timeline";
import axios from 'axios';

interface Item { 
  id: string;
  courseCode: string;
  courseName: string;
  group: string;
  nStudent: number;
  lecturers: Lecturer[];

}
interface Lecturer {
  email: string;

}

export default function FetchCM(token:any) {
  const [index, setIndex] = React.useState(0);
  const [data, setData] = useState<Item>({ id: '',
  courseCode: '',
  courseName: '',
  group: '',
  nStudent: 0,
  lecturers: []
});
  React.useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:5555/class/1ggfJ0eRxkdu132uB8dj',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(response => {
      setData(response.data);
    })
  
  })


  return (
    
    <Box
      sx={{
        flex: 1,
        width: "90%",
      }}
    >
      
      <Grid>
     
      <Grid>
      <Typography>{data.courseCode}</Typography>
      <Typography>{data.courseName}</Typography>
      
      <Box
      sx={{
        flexGrow: 1,
        m: -2,
        overflowX: 'hidden',
      }}
    >
      
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
          Class
        </Tab>
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          Assesment
        </Tab>
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          Grade
        </Tab>
      </TabList>
      <TabPanel value={0}>
        <Typography level="inherit">
          Get started with the industry-standard React UI library, MIT-licensed.
        </Typography>
        <ClassMonitor />
      </TabPanel>
      <TabPanel value={1}>
        <Typography level="inherit">
          Best for professional developers building enterprise or data-rich
          applications.
        </Typography>
        <Classes />
      </TabPanel>
      <TabPanel value={2}>
        <Typography level="inherit">
          The most advanced features for data-rich applications, as well as the
          highest priority for support.
        </Typography>
        <PartitionCM />
      </TabPanel>
      <TabPanel value={3}>
        <Typography level="inherit">
          The most advanced features for data-rich applications, as well as the
          highest priority for support.
        </Typography>
        <OppositeContentTimeline />
      </TabPanel>
    </Tabs>
    </Box>
      
      </Grid>
  
      </Grid>
    </Box>
  );
}
