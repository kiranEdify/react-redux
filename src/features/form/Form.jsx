import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import {
  Stack,
  Paper,
  TextField,
  Button,
  Checkbox,
  Alert,
  FormControlLabel,
  CircularProgress,
  LinearProgress,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userDataSchema, userDataSchema_setValue } from "./userDataSchema";
import { useState } from "react";

// import { asyncFetchData } from "./formSlice";
import { fetchUser, postUser } from "./formSlice";

const Form = () => {
  // const [isValidUser, setIsValidUser] = useState(false);
  // const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  // const [inProgress, setInProgress] = useState(false);

  const form = useSelector((state) => state.form);
  // const isValidUser = useSelector(state=>state.data.isValidUser)

  const dispatch = useDispatch();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: {
        name: "",
        age: "",
        worked: true,
        companyName: "",
        yearsOfExp: "",
      },
    },
    resolver: yupResolver(userDataSchema_setValue),
  });

  // console.log(watch("yearsOfExp"));

  useEffect(() => {
    dispatch(fetchUser(0));
  }, []);

  useEffect(() => {
    setValue("user", form.user);
    console.log(form.user);
  }, [form.user]);

  const submitHandler = (user) => {
    dispatch(postUser(user));
  };

  // console.log(watch("user"));s
  const props = {
    className: "dummy--",
  };
  const element = <h1 {...props} onClick={()=>console.log('clicked')}>{2 + 1}</h1>;
  return (
    <>
      {/* {console.log({ errors })} */}

      {console.log(element)}
      <Paper
        sx={{ width: "500px", margin: "10px auto", padding: "10px" }}
        elevation={3}
      >
        <form onSubmit={handleSubmit(submitHandler)}>
          <Stack spacing={2} sx={{ padding: "10px" }}>
            {form.loading && <LinearProgress />}

            {form.error && <Alert severity="error">{form.error}</Alert>}

            {form.isSubmitted ? (
              form.isValidUser ? (
                <Alert severity="success">
                  User data submited successfully
                </Alert>
              ) : (
                <Alert severity="error">Enter valid data!</Alert>
              )
            ) : (
              ""
            )}

            <Controller
              control={control}
              name="user.name"
              // defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="filled"
                  type="text"
                  label="Name"
                  error={errors.user?.name ? true : false}
                  helperText={
                    errors.user?.name ? errors.user?.name.message : ""
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="user.age"
              // defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="filled"
                  type="number"
                  label="Age"
                  error={errors.user?.age ? true : false}
                  helperText={errors.user?.age ? errors.user?.age.message : ""}
                />
              )}
            />
          </Stack>

          <Stack
            spacing={2}
            sx={{
              backgroundColor: "#AEE2FF",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <Controller
              name="user.worked"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  label="Work details"
                  control={<Checkbox {...field} checked={field.value} />}
                />
              )}
            />
            <Controller
              control={control}
              name="user.companyName"
              // defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="filled"
                  type="text"
                  label="Comapny Name"
                  error={errors.user?.companyName ? true : false}
                  helperText={
                    errors.user?.companyName
                      ? errors.user?.companyName.message
                      : ""
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="user.yearsOfExp"
              // defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="filled"
                  type="number"
                  label="Years of Experience"
                  error={errors.user?.yearsOfExp ? true : false}
                  helperText={
                    errors.user?.yearsOfExp
                      ? errors.user?.yearsOfExp.message
                      : ""
                  }
                />
              )}
            />
          </Stack>
          <Stack mt={2}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </>
  );
};

export default Form;
