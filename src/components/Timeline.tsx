import { Grid, Card } from "@mui/joy";
import React, { useEffect } from "react";
import { Chrono } from "react-chrono";
import Stack from "@mui/joy/Stack";
import PartitionCM from "./PartitionCM";
import axios from "axios";

interface Item {
  coursework: [{ assessmentname: string; score: number }];
}

export default function OppositeContentTimeline({ selectedId, token }: any) {
  const [coursework, setCoursework] = React.useState<Item[]>([]);
  const [items, setItems] = React.useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `http://localhost:5555/class/${selectedId}/coursework`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;

        const updatedRows = data.map((item: any) => ({
          coursework: item.coursework,
          // Add other properties if needed
        }));

        setCoursework(updatedRows);
      } catch (error) {
        // Handle error
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedId, token]);

  useEffect(() => {
    const generateItems = () => {
      const itemsArray: any[] = [];
      coursework.forEach((item: Item) => {
        console.log(item.coursework);
        if (item.coursework) {
          item.coursework.forEach((courseworkItem) => {
            console.log(courseworkItem.assessmentname);
            itemsArray.push({
              title: courseworkItem.assessmentname,
              cardTitle: courseworkItem.assessmentname,
              cardSubtitle: courseworkItem.score,
              cardDetailedText: courseworkItem.score,
            });
          });
        }
      });
      console.log(itemsArray);
      setItems(itemsArray);
    };

    generateItems();
  }, [coursework]);


  return (
    <Grid sx={{ width: "100%", height: 450 }}>
      <Stack direction="row" spacing={3}>
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
        <Card>
          <PartitionCM selectedId={selectedId} token={token} />
        </Card>
      </Stack>
    </Grid>
  );
}
