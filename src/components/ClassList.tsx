import * as React from "react";
import { useState, useEffect } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import CardContent from "@mui/joy/CardContent";
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
import {
  Alert,
  CardOverflow,
  Chip,
  CircularProgress,
  Grid,
  ListItem,
  ListItemDecorator,
  Tooltip,
} from "@mui/joy";
import GroupRounded from "@mui/icons-material/GroupRounded";
import AddClass from "./AddClass";
import LinearProgress from "@mui/joy/LinearProgress";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import Info from "@mui/icons-material/Info";
import axios from "axios";
import Snackbar from "@mui/joy/Snackbar";
import { motion } from "framer-motion";
import FetchCM from "./FetchCM";
import Skeleton from "@mui/joy/Skeleton";

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
  selectedImage : string;
  predictive: boolean;
}

export default function ClassList({ token }: any) {
  const [successful, setSuccessful] = React.useState(false);
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedId, setSelectedId] = useState("");
  const [showFetchCM, setShowFetchCM] = useState(false);
  const [reload, setReload] = React.useState(false);
  const [student, setStudent] = React.useState(0);
  const user = JSON.parse(token);
  let indexleng: boolean = false;

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const items = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "https://mycarrymark-node-afiffahmis-projects.vercel.app/class/list",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setData(response.data);
      setLoading(false);
      setReload(false);
    });

    
  }, [token, reload]);

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
      }}
    >
      <Stack direction="row" spacing={10}>
        {showFetchCM ? null : (
          <AddClass
            token={token}
            setSuccessful={setSuccessful}
            setReload={setReload}
          />
        )}
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
                Class successfully created.
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
      </Stack>

      <Box height={10} />

      {showFetchCM ? (
        <FetchCM selectedId={selectedId} />
      ) : loading ? (
        <Stack direction='row' spacing={6}>
        <Card variant="outlined" sx={{ width: 343, display: "flex", gap: 2 }}>
          <AspectRatio ratio="21/9">
            <Skeleton variant="overlay">
              <img
                alt=""
                src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
              />
            </Skeleton>
          </AspectRatio>
          <Typography>
            <Skeleton>
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries.
            </Skeleton>
          </Typography>
        </Card>
        <Card variant="outlined" sx={{ width: 343, display: "flex", gap: 2 }}>
          <AspectRatio ratio="21/9">
            <Skeleton variant="overlay">
              <img
                alt=""
                src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
              />
            </Skeleton>
          </AspectRatio>
          <Typography>
            <Skeleton>
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries.
            </Skeleton>
          </Typography>
        </Card>
        <Card variant="outlined" sx={{ width: 343, display: "flex", gap: 2 }}>
          <AspectRatio ratio="21/9">
            <Skeleton variant="overlay">
              <img
                alt=""
                src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
              />
            </Skeleton>
          </AspectRatio>
          <Typography>
            <Skeleton>
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries.
            </Skeleton>
          </Typography>
        </Card>
        <Card variant="outlined" sx={{ width: 343, display: "flex", gap: 2 }}>
          <AspectRatio ratio="21/9">
            <Skeleton variant="overlay">
              <img
                alt=""
                src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
              />
            </Skeleton>
          </AspectRatio>
          <Typography>
            <Skeleton>
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries.
            </Skeleton>
          </Typography>
        </Card>
        </Stack>
        
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 4, md: 16 }}
          sx={{ flexGrow: 1 }}
        >
          {data.map((item, index) =>
            item.lecturers[0].email === user.email ? (
              <React.Fragment key={item.id}>
                <Grid xs={4} sm={6} md={4} key={index}>
                  <motion.ul
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    variants={container}
                    initial="hidden"
                    animate="visible"
                  >
                    <Card
                      onClick={() => {
                        setShowFetchCM(true);
                        setSelectedId(item.id);
                      }}
                      variant="outlined"
                      sx={{ width: 320 }}
                    >
                      <CardOverflow>
                        
                        <AspectRatio ratio="2">
                        <Box position="relative" display="flex" width="100%" height="100%">
    <img
      src={item.selectedImage || "https://wallpaperset.com/w/full/3/5/9/542838.jpg"}
      loading="lazy"
      alt=""
    />
    <Box position="absolute" top={2} right={5}>
      {item.predictive ? <Chip color="success" size="sm">Predictive Class</Chip> : <Chip size="sm">Non-Predictive Class</Chip>}
    </Box>
  </Box>
                        </AspectRatio>
                        
                      </CardOverflow>
                      <CardContent>
                        <motion.div
                          key={index}
                          className="item"
                          variants={items}
                        >
                          <Typography level="title-md">
                            {item.courseCode}
                          </Typography>
                        </motion.div>
                        <motion.div
                          key={index}
                          className="item"
                          variants={items}
                        >
                          <Typography level="body-sm">
                            {item.courseName} 
                          </Typography>
                        </motion.div>
                      </CardContent>
                      <CardOverflow
                        variant="soft"
                        sx={{ bgcolor: "background.level1" }}
                      >
                        <Divider inset="context" />
                        <CardContent orientation="horizontal">
                          <Typography
                            level="body-xs"
                            fontWeight="md"
                            textColor="text.secondary"
                          >
                            <GroupRounded />
                          </Typography>
                          <Divider orientation="vertical" />
                          <motion.div
                            key={index}
                            className="item"
                            variants={items}
                          >
                            <Typography
                              level="body-xs"
                              fontWeight="md"
                              textColor="text.secondary"
                            >
                              {item.nStudent} Students
                            </Typography>
                          </motion.div>
                        </CardContent>
                      </CardOverflow>
                    </Card>
                  </motion.ul>
                </Grid>
              </React.Fragment>
            ) : null
          )}

          {data.find((item) => item.lecturers[0].email === user.email)
            ? null
            : (indexleng = true)}
        </Grid>
      )}

      <Box />
      <Box height={50}></Box>

      {!loading && indexleng ? (
        <Alert
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
                <Info />
              </div>
            </AspectRatio>
          }
          endDecorator={
            <IconButton
              onClick={() => {}}
              variant="plain"
              sx={{
                "--IconButton-size": "32px",
                transform: "translate(0.5rem, -0.5rem)",
              }}
            ></IconButton>
          }
          sx={{ alignItems: "flex-start", overflow: "hidden" }}
        >
          <div>
            <Typography level="title-lg">No classes found</Typography>
            <Typography level="body-sm">
              You are not assigned to any classes.
            </Typography>
          </div>
        </Alert>
      ) : null}
    </Box>
  );
}
