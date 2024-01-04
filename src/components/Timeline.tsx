import { Grid, Card, Typography, Table } from "@mui/joy";
import React, { useEffect } from "react";
import Stack from "@mui/joy/Stack";
import PartitionCM from "./PartitionCM";
import axios from "axios";
import { Box } from "@mui/joy";
import { IconButton } from "@mui/joy";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { Menu, MenuItem, MenuButton, Dropdown } from "@mui/joy";
import { CircularProgress, Divider } from "@mui/material";
import { Modal, ModalDialog } from "@mui/joy";
import { Button } from "@mui/joy";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

interface Item {
  id: string;
  coursework: [{ assessmentName: string; score: string; weighted: string }];
}

export default function OppositeContentTimeline({ selectedId, token }: any) {
  const [coursework, setCoursework] = React.useState<Item[]>([]);
  const [items, setItems] = React.useState<any[]>([]);
  const [reload, setReload] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [idToDelete, setIdToDelete] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${selectedId}/coursework`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;

        const updatedRows = data.map((item: any) => ({
          id: item.id,
          coursework: item.coursework,
          // Add other properties if needed
        }));
        setReload(false);
        setCoursework(updatedRows);
      } catch (error) {
        // Handle error
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedId, token, reload]);

  useEffect(() => {
    const generateItems = () => {
      const itemsArray: any[] = [];
      coursework.forEach((item: Item) => {
        if (item.coursework) {
          item.coursework.forEach((courseworkItem) => {
            itemsArray.push({
              id: item.id,
              assessmentName: courseworkItem.assessmentName,
              score: courseworkItem.score,
              weighted: courseworkItem.weighted,
            });
          });
        }
      });
      console.log(itemsArray);
      setItems(itemsArray);
    };

    generateItems();
  }, [coursework]);

  const handleDelete = (id: any) => {
    console.log(id);

    setLoading(true);
    const formAction = `https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${selectedId}/coursework/${id}`;
    const formMethod = "DELETE";

    fetch(formAction, {
      method: formMethod,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setReload(true);
        setLoading(false);
      });
  };

  return (
    <Grid sx={{ width: "100%", height: 450 }}>
      <div style={{ height: "400px" }}>
        <React.Fragment>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog variant="outlined" role="alertdialog">
              <DialogTitle>
                <WarningRoundedIcon />
                Confirmation
              </DialogTitle>
              <Divider />
              <DialogContent>
                <p>Are you sure you want to discard this assessment?</p>
                <p>This will also delete data on grading.</p>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="solid"
                  color="danger"
                  onClick={() => {
                    handleDelete(idToDelete);
                    setOpen(false);
                  }}
                >
                  Discard
                </Button>
                <Button
                  variant="plain"
                  color="neutral"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </DialogActions>
            </ModalDialog>
          </Modal>
        </React.Fragment>
        <Stack
          direction={{ xs: "column", md: "row", sm: "row", lg: "column" }}
          spacing={3}
        >
          <Box
            sx={{ width: { xs: "100%", sm: "auto", md: "auto", lg: "100%" } }}
          >
            <Card>
              <Box
                sx={{
                  width: { xs: "100%", sm: "auto", md: "auto", lg: "100%" },
                }}
              >
                <Table>
                  <thead>
                    <tr>
                      <th>Assessment Name</th>
                      <th>Score</th>
                      <th>Weighted (%)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.assessmentName}</td>
                        <td>{item.score}</td>
                        <td>{item.weighted}</td>
                        <td><IconButton>
                          <Button
                            variant="outlined"
                            color="danger"
                            endDecorator={loading ? <CircularProgress /> : <DeleteForever />}
                            onClick={() => {
                              setOpen(true);
                              setIdToDelete(item.id);
                            }}
                          />
                            
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Box>
            </Card>

            <Card>
              <PartitionCM
                selectedId={selectedId}
                token={token}
                setReload={setReload}
              />
            </Card>
          </Box>
        </Stack>
      </div>
    </Grid>
  );
}
