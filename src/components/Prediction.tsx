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
  coursename: HTMLInputElement;
  coursecode: HTMLInputElement;
  group: HTMLInputElement;
  part: HTMLInputElement;
}
interface AddClassFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const Prediction = () => {
  return (
    <form
      onSubmit={async (event: React.FormEvent<AddClassFormElement>) => {
        event.preventDefault();
        const formElements = event.currentTarget.elements;
        const data = {
          coursecode: formElements.coursecode.value,
          coursename: formElements.coursename.value,
          group: formElements.group.value,
          part: formElements.part.value,
        };

        const formAction = "http://localhost:5555/class/new";
        const formMethod = "POST";

        fetch(formAction, {
          method: formMethod,
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())

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
                <Input color="neutral" variant="soft" name="coursecode" autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel
                  sx={(theme) => ({
                    "--FormLabel-color": "white",
                  })}
                >
                  Test 1
                </FormLabel>
                <Input color="neutral" variant="soft" name="group" required />
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
                <Input color="neutral" variant="soft" name="coursename" required />
              </FormControl>
              <FormControl>
                <FormLabel
                  sx={(theme) => ({
                    "--FormLabel-color": "white",
                  })}
                >
                  Test 2
                </FormLabel>
                <Input color="neutral" variant="soft" name="part" required />
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
