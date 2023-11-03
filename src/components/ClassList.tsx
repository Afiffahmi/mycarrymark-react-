import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import CardContent from '@mui/joy/CardContent';
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import Slider from "@mui/joy/Slider";
import ListDivider from '@mui/joy/ListDivider';
import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import { Alert, CardOverflow, Chip, Grid, ListItem, ListItemDecorator, Tooltip } from "@mui/joy";
import ListItemContent from "@mui/joy/ListItemContent";
import AvatarGroup from '@mui/joy/AvatarGroup';
import Badge, { badgeClasses } from '@mui/joy/Badge';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Classes from "./Classes";
import OrderTable from "./OrderTable";
import { ClassMonitor } from "./ClassMonitor";
import GroupRounded from "@mui/icons-material/GroupRounded";
import AddClass from './AddClass'


export default function ClassList() {

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
      }}
    >
    <Stack direction='row' spacing={10}>
      <AddClass />
    </Stack>
    <Box height={10}/>
        
    
      <Grid container
  spacing={{ xs: 2, md: 3 }}
  columns={{ xs: 4, sm: 8, md: 14 }}
  sx={{ flexGrow: 1 }}>
      <Grid xs={2} sm={4} md={4} >
      <Card variant="outlined" sx={{ width: 320 }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">CSC662</Typography>
        <Typography level="body-sm">Computer Security</Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
            <GroupRounded />
          </Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
          33 Students
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
      
      </Grid>
      
      <Grid xs={2} sm={4} md={4} >
      <Card variant="outlined" sx={{ width: 320 }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">CSC662</Typography>
        <Typography level="body-sm">A4CS2306A</Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
            <GroupRounded />
          </Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
          33 Students
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
      
      </Grid>

      </Grid>
      
    </Box>
    
  );
}
