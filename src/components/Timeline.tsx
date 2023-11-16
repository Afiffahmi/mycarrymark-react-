import { Grid ,Card} from "@mui/joy";
import React from "react";
import { Chrono } from "react-chrono";
import Stack from "@mui/joy/Stack";
import PartitionCM from "./PartitionCM";

export default function OppositeContentTimeline() {
  const moreItems = [
    {
      title: "13/5/2023     ",
      cardTitle: "Test 1",
      url: "http://www.history.com",
      cardDetailedText:
        "Chapter 1 - 3.",
    },
    {
      title: "12/11/2023",
      cardTitle: "Test 2",
      url: "http://www.history.com",
      cardDetailedText:
        "All chapter.",
    },
    {
      title: "12/12/2023",
      cardTitle: "Assignment 1",
      url: "http://www.history.com",
      cardDetailedText:
        "Individual assignment.",
    },
    {
      title: "21/12/2023        ",
      cardTitle: "Group Project       ",
      url: "http://www.history.com",
      cardDetailedText:
        "Group project.                ",
    },

  ];

  const items = [...moreItems];

  return (
    <Grid sx={{ width: "100%", height: 450 }}>
     <Stack direction='row' spacing={3}>
    <Card color="neutral" variant="plain">
      <div style={{ height: "400px", overflow: "auto" }}>
        <Chrono
          items={items}
          theme={{
            primary: "grey",
            secondary: "#0B6BCB",
            cardBgColor: "dde7ee",
            titleColor: "black",
            titleColorActive: "white",
          }}
          mode="VERTICAL"
        />
      </div>
    </Card>
      <Card><PartitionCM /></Card>
    </Stack>
    </Grid>
  );
}
