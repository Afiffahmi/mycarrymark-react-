import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
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
import { Alert, Chip, ListItem, ListItemDecorator } from "@mui/joy";
import ListItemContent from "@mui/joy/ListItemContent";
import AvatarGroup from '@mui/joy/AvatarGroup';

const marks = [
  {
    value: 0,
    label: "Quiz 1",
  },
  {
    value: 30,
    label: "Test 1",
  },
  {
    value: 60,
    label: "Test 2",
  },
  {
    value: 90,
    label: "Project",
  },
];

function valueText(value: number) {
  return `${value}°C`;
}

export default function MyProfile() {
  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
      }}
    >
      <Stack
        spacing={4}
        direction="row"
        sx={{
          maxWidth: "500px",
          px: {
            xs: 2,
            md: 6,
          },
          py: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <Card size="lg">
          
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Track your progress</Typography>
            <Typography level="body-sm">
              Display currently upcoming assessment
            </Typography>
            <Stack direction='row'>
            <Alert variant="outlined" color="danger" size="sm">CSC662</Alert>
            <Alert color="danger" size="sm">Test 1 due 12 November 2023</Alert>
            </Stack>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
          >
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}></Stack>
              <Typography>Progression</Typography>
              <div>
                <Box sx={{ width: 400 }}>
                  <Slider
                    aria-label="Always visible"
                    defaultValue={30}
                    getAriaValueText={valueText}
                    step={30}
                    marks={marks}
                    disabled
                  />
                </Box>
              </div>
            </Stack>
          </Stack>
        </Card>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Assignment Submmission</Typography>
            <Typography level="body-sm">
              Students turned in the assignment
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
          <Box sx={{ width: 320 }}>
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
         <AvatarGroup size="sm" sx={{ flexDirection: 'row-reverse' }}>
      <Avatar>+3</Avatar>
      <Avatar alt="Cindy Baker" src="https://cdn.uitm.edu.my/gambar_warga/92f42034219a8d85cac7c21169e8b1c4.png" />
      <Avatar alt="Travis Howard" src="https://cdn.uitm.edu.my/gambar_warga/f4251db8ceea3f3f2eb6a79bfc4d8282.png" />
      <Avatar alt="Remy Sharp" src="https://cdn.uitm.edu.my/gambar_warga/c4db5493fa57464b8c9e020aec691ab0.png" />
    </AvatarGroup>
      </List>
    </Box>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
