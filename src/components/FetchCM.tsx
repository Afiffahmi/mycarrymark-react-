import React, { useState, useEffect } from "react";
import { AspectRatio, Box, Button, Divider, FormControl, FormLabel, FormHelperText, Input, IconButton, Textarea, Stack, Typography, Card, Slider, ListDivider, Avatar, List, Alert, CardOverflow, Chip, Grid, ListItem, ListItemDecorator, Tooltip, ListItemContent, AvatarGroup, Badge, badgeClasses, Tabs, TabList, Tab, tabClasses, TabPanel } from "@mui/joy";
import Classes from "./Classes";
import OrderTable from "./OrderTable";
import { ClassMonitor } from "./ClassMonitor";
import PartitionCM from "./PartitionCM";
import OppositeContentTimeline from "./Timeline";
import axios from 'axios';
import CardContent from "@mui/joy/CardContent";
import {motion} from 'framer-motion';

interface Item { 
  id: string;
  courseCode: string;
  courseName: string;
  groupClass: string;
  nStudent: number;
  lecturers: Lecturer[];
  shortId: string;

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
});
  React.useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:5555/class/${selectedId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(response => {
      setData(response.data);
      console.log(response.data);
    })
  
  },[token])


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
      <CardContent>
        <Typography fontWeight="md" textColor="success.plainColor">
          {data.shortId}
        </Typography>
        <Typography level="body-sm">{data.groupClass}</Typography>
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
    <Tabs
          defaultValue={0}
          sx={{
            bgcolor: 'transparent',
          }}
        >
          <TabList
            tabFlex={1}
            size="sm"
            sx={{
              pl: {
                xs: 0,
                md: 4,
              },
              justifyContent: 'left',
              [`&& .${tabClasses.root}`]: {
                flex: 'initial',
                bgcolor: 'transparent',
                [`&.${tabClasses.selected}`]: {
                  fontWeight: '600',
                  '&::after': {
                    height: '2px',
                    bgcolor: 'primary.500',
                  },
                },
              },
            }}
          >
            <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={0}>
              Settings
            </Tab>
            <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={1}>
              Team
            </Tab>
            <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={2}>
              Plan
            </Tab>
            <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={3}>
              Billing
            </Tab>
          </TabList>
        </Tabs>
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
        <Classes selectedId={selectedId} token={token}/>
      </TabPanel>
      <TabPanel value={2}>
        <Typography level="inherit">
          The most advanced features for data-rich applications, as well as the
          highest priority for support.
        </Typography>
        <PartitionCM selectedId={selectedId} token={token}/>
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
