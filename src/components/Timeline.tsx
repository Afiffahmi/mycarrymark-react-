import { Grid ,Card} from "@mui/joy";
import React from "react";
import { Chrono } from "react-chrono";
import Stack from "@mui/joy/Stack";
import PartitionCM from "./PartitionCM";

export default function OppositeContentTimeline() {
  const moreItems = [
    {
      title: "May 1940",
      cardTitle: "Dunkirk",
      url: "http://www.history.com",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
    },
    {
      title: "May 1940",
      cardTitle: "Dunkirk",
      url: "http://www.history.com",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
    },
    {
      title: "May 1940",
      cardTitle: "Dunkirk",
      url: "http://www.history.com",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
    },
    {
      title: "May 1940",
      cardTitle: "Dunkirk",
      url: "http://www.history.com",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
    },
    {
        title: "May 1940",
        cardTitle: "Dunkirk",
        url: "http://www.history.com",
        cardDetailedText:
          "Men of the British Expeditionary Force (BEF) wade out to..",
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
