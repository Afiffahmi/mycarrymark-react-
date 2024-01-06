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
import SettingsRounded from "@mui/icons-material/SettingsRounded";
import ClassSetting from "./ClassSetting";
import { Snackbar } from "@mui/joy";
import LinearProgress from "@mui/joy/LinearProgress";
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import Skeleton from "@mui/joy/Skeleton";


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
const [reload, setReload] = React.useState(false);
const [successful,setSuccessful] = useState(false);
const [loading, setLoading] = React.useState(true);


  React.useEffect(() => {
    axios({
      method: 'get',
      url: `https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${selectedId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(response => {
      setData(response.data);
      setLoading(false);
      console.log(response.data);
      setReload(false);
    })
    

    
  
  },[token,selectedId,reload])

  return (
    
    <Box
      sx={{
        flex: 1,
        width: "90%",
        
        
      }}
    >
      {successful ? (
          <Snackbar
            open={reload}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            autoHideDuration={3000}
            size="lg"
            color="success"
            variant="solid"
            invertedColors
            onClose={(event, reason) => {
              if (reason === 'clickaway') {
                return;
              }
            }}
            startDecorator={
              <AspectRatio
                variant="solid"
                ratio="1"
                sx={{
                  minWidth: 40,
                  borderRadius: "50%",
                  boxShadow: "0 2px 12px 0 rgb(0 0 0/0.2)",
                }}
              >
                <div>
                  <Check />
                </div>
              </AspectRatio>
            }
            endDecorator={
              <IconButton
                onClick={() => {
                  setSuccessful(false);
                }}
                variant="plain"
                sx={{
                  "--IconButton-size": "32px",
                  transform: "translate(0.5rem, -0.5rem)",
                }}
              >
                <Close />
              </IconButton>
            }
            sx={{ alignItems: "flex-start", overflow: "hidden" }}
          >
            <div>
              <Typography level="title-lg">Success</Typography>
              <Typography level="body-sm">
                Successful updated class detail
              </Typography>
            </div>
            <LinearProgress
              variant="solid"
              color="success"
              value={40}
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                borderRadius: 0,
              }}
            />
          </Snackbar>
        ) : null} 
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
        <Skeleton variant="text" loading={loading} width={100}/>
        <Typography level="title-lg">{data.courseCode} |</Typography>
        <Skeleton variant="text" loading={loading} width={150}/>
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
          {loading ? <Skeleton>
          <img
            src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
            srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </Skeleton>
        :
          <img
            src={data.selectedImage || 'https://windowscustomization.com/wp-content/uploads/2018/12/Ninja-Landscape.gif'}
            srcSet={data.selectedImage + ' 2x' || 'https://windowscustomization.com/wp-content/uploads/2018/12/Ninja-Landscape.gif 2x'}
            loading="lazy"
            alt=""
          />}
        </CardCover>
      <CardContent>
        <Skeleton loading={loading} variant="text" />
        <Typography fontWeight="md" textColor="white" >
          {data.shortId}
        </Typography>
        <Skeleton loading={loading} variant="text" />
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

    <Box display="flex" justifyContent="flex-end">
      <IconButton variant="soft"><ClassSetting images= {data.selectedImage} data={data} selectedId = {selectedId} setReload = {setReload} setSuccessful ={setSuccessful}/></IconButton>
  
</Box>
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
          <Alert color="danger" variant="soft">It is not advised that you add or remove the any assessment on this partition if it is predictive class.</Alert>
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
