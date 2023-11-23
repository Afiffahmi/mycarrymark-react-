import { Grid ,Card} from "@mui/joy";
import React, { useEffect } from "react";
import { Chrono } from "react-chrono";
import Stack from "@mui/joy/Stack";
import PartitionCM from "./PartitionCM";
import axios from "axios";

export default function OppositeContentTimeline({selectedId,token}:any) {
const [coursework, setCoursework] = React.useState<any[]>([]);
  React.useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:5555/class/${selectedId}/coursework`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(response => {
      console.log(response.data);
      const data = response.data;

      const updatedRows = data.map((item:any) => ({
        coursework : item.coursework,
        
      }))
      setCoursework(updatedRows);
    })})


  const moreItems = coursework.map((item:any) => ({
    
    title: item.coursework,
    cardTitle: item.coursework,
    cardSubtitle: item.coursework,
    cardDetailedText: item.coursework,
    media: {
      type: "IMAGE",
      source: {
        url: "https://picsum.photos/seed/picsum/200/300",
        alt: "random unsplash image",
      },
    },
  }));

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
      <Card><PartitionCM selectedId={selectedId} token={token}/></Card>
    </Stack>
    </Grid>
  );
}
