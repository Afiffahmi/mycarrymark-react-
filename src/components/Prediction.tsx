import {
  Button,
  Input,
  FormLabel,
  Stack,
  FormControl,
  Box,
  Card,
  CardCover,
  CardOverflow,
  AspectRatio,
  CardContent,
  Typography,
  Chip,
} from "@mui/joy";
import { Divider } from "@mui/material";

interface FormElements extends HTMLFormControlsCollection {
  quiz1: HTMLInputElement;
  test1: HTMLInputElement;
  test2: HTMLInputElement;
  assignment1: HTMLInputElement;
  assignment2: HTMLInputElement;
}
interface AddClassFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const Prediction = ({setGrade,setPrediction}:any) => {
  return (
    <form
      onSubmit={async (event: React.FormEvent<AddClassFormElement>) => {
        event.preventDefault();
        const formElements = event.currentTarget.elements;
        const data = [{
          quiz1: Number(formElements.quiz1.value),
          test1: Number(formElements.test1.value),
          test2: Number(formElements.test2.value),
          assignment1: Number(formElements.assignment1.value),
          assignment2: Number(formElements.assignment2.value),
          total: Number(formElements.quiz1.value) + Number(formElements.test1.value) + Number(formElements.test2.value) + Number(formElements.assignment1.value) + Number(formElements.assignment2.value)
      }];

        setPrediction(true)

        const formAction = "https://grade-prediction-api.onrender.com/predict";
        const formMethod = "POST";

        fetch(formAction, {
          method: formMethod,
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json()).then((data) => {
            setGrade(data.Predictions[0].Prediction);
            setPrediction(false)
          })

          .catch((error) => {
            console.log(error);
          });
      }}
    >
      <Card sx={{ width: 420, height: 650 }}>
        
        <CardCover>
          <img
            src="https://cdn.dribbble.com/users/1770290/screenshots/6164788/bg_76.gif"
            alt="unsplash"
            loading="lazy"
          />
        </CardCover>
        <CardCover
          sx={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 500px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
          }}
        />
        <CardContent sx={{ display: "flex", px: { xs: 2, md: 2 } }}>
          <Stack spacing={2} direction="column">
            <Typography level="h1" textColor='white'>Grade Prediction <Typography level='h2' variant="soft">Playground</Typography></Typography>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel
                  sx={(theme) => ({
                    "--FormLabel-color": "white",
                  })}
                >
                  <Box component="span" mr={34}>Quiz 1</Box> <Chip>5%</Chip>
                </FormLabel>
                <Input color="neutral" variant="soft" name="quiz1" autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel
                  sx={(theme) => ({
                    "--FormLabel-color": "white",
                  })}
                >
                  <Box component="span" mr={33}>Test 1</Box> <Chip>10%</Chip>
                </FormLabel>
                <Input color="neutral" variant="soft" name="test1" required />
              </FormControl>
              <FormControl>
                <FormLabel
                  sx={(theme) => ({
                    "--FormLabel-color": "white",
                  })}
                >
                  <Box component="span" mr={33}>Test 2</Box> <Chip>10%</Chip>
                </FormLabel>
                <Input color="neutral" variant="soft" name="test2" required />
              </FormControl>
            </Stack>
            <Stack spacing={2}>
            <FormControl>
                <FormLabel
                  sx={(theme) => ({
                    "--FormLabel-color": "white",
                  })}
                >
                  <Box component="span" mr={27}>Assignment 1</Box> <Chip>10%</Chip>
                </FormLabel>
                <Input color="neutral" variant="soft" name="assignment1" required />
              </FormControl>
            <FormControl>
                <FormLabel
                  sx={(theme) => ({
                    "--FormLabel-color": "white",
                  })}
                >
                 <Box component="span" mr={27}>Assignment 2</Box> <Chip>15%</Chip>
                </FormLabel>
                <Input color="neutral" variant="soft" name="assignment2" required />
              </FormControl>
              

       
              <Divider sx={{height: 20}} />
              <Button
                type="submit"
                color="danger"
                onClick={function () {}}
                variant="soft"
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
};

export default Prediction;
