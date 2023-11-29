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
} from "@mui/joy";
import { Divider } from "@mui/material";

interface FormElements extends HTMLFormControlsCollection {
  quiz1: HTMLInputElement;
  test1: HTMLInputElement;
  test2: HTMLInputElement;
  assignment1: HTMLInputElement;
  assignment2: HTMLInputElement;
  taking_notes : HTMLInputElement;
  attendance : HTMLInputElement;
  listening : HTMLInputElement;

}
interface AddClassFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const Prediction = ({setGrade}:any) => {
  return (
    <form
      onSubmit={async (event: React.FormEvent<AddClassFormElement>) => {
        event.preventDefault();
        const formElements = event.currentTarget.elements;
        const data = {
          quiz1: formElements.quiz1.value,
          test1: formElements.test1.value,
          test2: formElements.test2.value,
          assignment1: formElements.assignment1.value,
          assignment2: formElements.assignment2.value,
          listening: 2,
          taking_notes: 2,
          attendance: 2,
          carrymark: formElements.quiz1.value + formElements.test1.value + formElements.test2.value + formElements.assignment1.value + formElements.assignment2.value
        };

        const formAction = "http://localhost:1080/predict";
        const formMethod = "POST";

        fetch(formAction, {
          method: formMethod,
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json()).then((data) => {
            console.log(data)
            setGrade(data.Prediction);
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
            <Stack spacing={2}>
              <FormControl>
                <FormLabel
                  sx={(theme) => ({
                    "--FormLabel-color": "white",
                  })}
                >
                  Quiz 1
                </FormLabel>
                <Input color="neutral" variant="soft" name="quiz1" autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel
                  sx={(theme) => ({
                    "--FormLabel-color": "white",
                  })}
                >
                  Test 1
                </FormLabel>
                <Input color="neutral" variant="soft" name="test1" required />
              </FormControl>
              <FormControl>
                <FormLabel
                  sx={(theme) => ({
                    "--FormLabel-color": "white",
                  })}
                >
                  Test 2
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
                  Assignment 1
                </FormLabel>
                <Input color="neutral" variant="soft" name="assignment1" required />
              </FormControl>
            <FormControl>
                <FormLabel
                  sx={(theme) => ({
                    "--FormLabel-color": "white",
                  })}
                >
                  Assignment 2
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
