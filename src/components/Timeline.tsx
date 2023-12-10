import { Grid, Card, Typography, Table } from "@mui/joy";
import React, { useEffect } from "react";
import { Chrono } from "react-chrono";
import Stack from "@mui/joy/Stack";
import PartitionCM from "./PartitionCM";
import axios from "axios";

interface Item {
  coursework: [{ assessmentName: string; score: string; weighted: string }];
}

export default function OppositeContentTimeline({ selectedId, token }: any) {
  const [coursework, setCoursework] = React.useState<Item[]>([]);
  const [items, setItems] = React.useState<any[]>([]);
  const [reload, setReload] = React.useState(false);

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
  }, [selectedId, token,reload]);

  useEffect(() => {
    const generateItems = () => {
      const itemsArray: any[] = [];
      coursework.forEach((item: Item) => {
        
        if (item.coursework) {
          item.coursework.forEach((courseworkItem) => {

            itemsArray.push({
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

  return (
    <Grid sx={{ width: "100%", height: 450 }}>
      <Stack direction="row" spacing={3}>
        <Card color="neutral" variant="plain">
          <div style={{ height: "400px", overflow: "auto" }}>
           
              <Table>
                <thead>
                  <tr>
                    <th>Assessment Name</th>
                    <th>Score</th>
                    <th>Weighted (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.assessmentName}</td>
                      <td>{item.score}</td>
                      <td>{item.weighted}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
         
          </div>
        </Card>
        <Card>
          <PartitionCM selectedId={selectedId} token={token} setReload={setReload}/>
        </Card>
      </Stack>
    </Grid>
  );
}
