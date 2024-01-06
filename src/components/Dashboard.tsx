import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { Sheet, CardCover, Stack, Chip, Grid, Alert, CircularProgress } from "@mui/joy";
import Box from "@mui/joy/Box";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepIndicator from "@mui/joy/StepIndicator";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionGroup from "@mui/joy/AccordionGroup";
import AccordionSummary from "@mui/joy/AccordionSummary";
import InfoIcon from '@mui/icons-material/Info';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import Link from "@mui/joy/Link";

interface Lecturer {
  email: string;
}
interface Item {
  id: string;
  courseCode: string;
  courseName: string;
  group: string;
  nStudent: number;
  lecturers: Lecturer[];
  predictive: boolean;
}

export default function Dashboard({ token }: any) {
  const [data, setData] = useState<Item[]>([]);
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const user = JSON.parse(token);
  useEffect(() => {
    axios({
      method: "get",
      url: "https://mycarrymark-node-afiffahmis-projects.vercel.app/class/list",
      headers: {},
    }).then((response) => {
      setData(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <Sheet>
      <Card sx={{ minHeight: "180px" }}>
        <CardCover>
          <img
            src="https://i.pinimg.com/originals/34/1e/80/341e800b1f29d3e34ea2eba5a6af205c.gif"
            loading="lazy"
            alt=""
          />
        </CardCover>
        <CardCover
          sx={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 20px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
          }}
        />
        <CardContent sx={{ justifyContent: "flex-end" }}>
          <Typography fontWeight={500} fontSize={50} textColor="#fff">
            Hey, Scholars!
          </Typography>
          <Typography textColor="neutral.300" fontWeight={300} fontSize={30}>
            Step into MyCarrymark for an academic journey like never before.
          </Typography>
        </CardContent>
      </Card>
      
      <Box
        sx={{
          width: "100%",
          position: "relative",
          overflow: { xs: "auto", sm: "initial" },
        }}
      >
        <Box
          sx={{
            top: "4px",
            content: '"horizontal"',
            display: "block",
            position: "absolute",
            left: "0.5rem",
            color: "text.tertiary",
            fontSize: "sm",
            fontWeight: "lg",
          }}
        />
        <Stack direction={{ xs: "column", md: "row", sm: "column", lg: "row" }}>
          <Card
            orientation="horizontal"
            sx={{
              width: {md:"60%", lg:"60%", sm:"100%", xs:"100%"},
              flexWrap: "wrap",
              [`& > *`]: {
                "--stack-point": "500px",
                minWidth:
                  "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
              },
              // make the card resizable for demo
              overflow: "auto",
              resize: "horizontal",
            }}
            variant="plain"
          >
            <CardContent>
              <Typography
                fontSize="xl"
                fontWeight="lg"
                startDecorator={<BookmarkBorderIcon />}
              >
                Guide to MyCarrymark
              </Typography>
              <Typography
                level="body-sm"
                fontWeight="lg"
                textColor="text.tertiary"
              >
                A quick guide to get you started with MyCarrymark.
              </Typography>
              <Sheet
                sx={{
                  bgcolor: "background.level1",
                  borderRadius: "sm",
                  p: 1.5,
                  my: 1.5,
                  display: "flex",
                  gap: 2,
                  "& > div": { flex: 1 },
                }}
              >
                <Stack direction="column" spacing={2}>
                  <AccordionGroup>
                  <Accordion>
                    <AccordionSummary>
                    <Typography level="body-md" fontWeight="lg" startDecorator={<InfoIcon />}>
                      Class
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Stepper sx={{ width: "100%" }}>
                      <Step
                        orientation="vertical"
                        indicator={
                          <StepIndicator variant="solid" color="primary">
                            1
                          </StepIndicator>
                        }
                      >
                        Create Class
                      </Step>
                      <Step
                        orientation="vertical"
                        indicator={
                          <StepIndicator variant="outlined">2</StepIndicator>
                        }
                      >
                        Add Student
                      </Step>
                      <Step
                        orientation="vertical"
                        indicator={<StepIndicator>3</StepIndicator>}
                      >
                        Create Assessment
                      </Step>
                      <Step
                        orientation="vertical"
                        indicator={<StepIndicator>4</StepIndicator>}
                      >
                        Grade
                      </Step>
                      <Step
                        orientation="vertical"
                        indicator={<StepIndicator>5</StepIndicator>}
                      >
                        Monitor Peformance
                      </Step>
                    </Stepper>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary>
                    <Typography level="body-md" fontWeight="lg" startDecorator={<InfoIcon />}>
                      Stash
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Stepper sx={{ width: "100%" }}>
                      <Step
                        orientation="vertical"
                        indicator={
                          <StepIndicator variant="solid" color="success">
                            1
                          </StepIndicator>
                        }
                      >
                        Add new file
                      </Step>
                      <Step
                        orientation="vertical"
                        indicator={
                          <StepIndicator variant="outlined">2</StepIndicator>
                        }
                      >
                        Upload
                      </Step>
                      <Step
                        orientation="vertical"
                        indicator={<StepIndicator>3</StepIndicator>}
                      >
                        Download
                      </Step>
                    </Stepper>
                    </AccordionDetails>
                  </Accordion>
                  
                  <Accordion>
                    <AccordionSummary>
                    <Typography level="body-md" fontWeight="lg" startDecorator={<InfoIcon />}>
                      Grade Prediction
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Alert color="danger">Grade prediction model may takes up to 3 minutes in order to run.</Alert>
                    <Stepper sx={{ width: "100%" }}>
                      <Step
                        orientation="vertical"
                        indicator={
                          <StepIndicator variant="solid" color="warning">
                            1
                          </StepIndicator>
                        }
                      >
                        Create predictive class
                      </Step>
                      <Step
                        orientation="vertical"
                        indicator={
                          <StepIndicator variant="outlined">2</StepIndicator>
                        }
                        
                      >
                        Add student
                      </Step>
                      <Step
                        orientation="vertical"
                        indicator={<StepIndicator>3</StepIndicator>}
                      >
                        Grade
                      </Step>
                      <Step
                        orientation="vertical"
                        indicator={<StepIndicator></StepIndicator>}
                        
                      >
                        Select class to Grade Prediction
                      </Step>
                    </Stepper>
                    </AccordionDetails>
                  </Accordion>
                  </AccordionGroup>
                </Stack>
              </Sheet>
            </CardContent>
          </Card>
          <Card
           orientation="horizontal"
           sx={{
             width: {md:"40%", lg:"40%", sm:"100%", xs:"100%"},
             flexWrap: "wrap",
             [`& > *`]: {
               "--stack-point": "500px",
               minWidth:
                 "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
             },
             // make the card resizable for demo
             overflow: "auto",
             resize: "horizontal",
           }}
           variant="plain">
            <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            >
            <Typography
                fontSize="xl"
                fontWeight="lg"
                startDecorator={<BlurOnIcon color="primary"/>}
              >
                Congratulations for selected to be a part of MyCarrymark
              </Typography>
              <Typography
                level="body-sm"
                fontWeight="lg"
                textColor="text.tertiary"
              >
               Your feedback is important to us
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
              <Link href={'https://okkcf4k4lpc.typeform.com/to/XAs46ABk'} target="_blank"><Button variant="solid" color="primary">
              Answer a survey
            </Button></Link>
          </Box>
            </CardContent>
          </Card>
        </Stack>
        <Stack direction='row' spacing={4}>
        <Typography
                fontSize="l"
                fontWeight="lg"
              >
                Assigned class :
              </Typography>
      <Grid sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {loading ? <CircularProgress size="sm" variant="plain"/> : <Chip color="primary" size="lg">{data.reduce(
              (count, item) =>
                item.lecturers[0].email === user.email ? count + 1 : count,
              0
            )}</Chip>}
      <Typography>Total class</Typography>
      </Grid>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {loading ? <CircularProgress size="sm" variant="plain"/> : <Chip color="primary" size="lg">{data.reduce(
              (count, item) =>
                (item.lecturers[0].email === user.email && item.predictive === true) ? count + 1 : count,
              0
            )}</Chip>}
      <Typography>Total predictive class</Typography>
      </Box>
      </Stack>
      </Box>
    </Sheet>
  );
}
