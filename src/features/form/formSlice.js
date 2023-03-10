import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("form/fetchUser", (indx) => {
  return axios
    .get("http://localhost:9000/users")
    .then(({ data }) => data[indx]);
  // .catch((error) => console.log(`error while fetching user! ${error}`));
});

export const postUser = createAsyncThunk("form/postUser", (user) => {
  return axios.post("http://localhost:9000/user", user);
});

const formSlice = createSlice({
  name: "form",
  initialState: {
    loading: false,
    user: {},
    error: "",
    isValidUser: false,
    isSubmitted: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.loading = true;
      state.user = {};
      state.error = "";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.error.message;
    });

    //postUser reducer
    builder.addCase(postUser.pending, (state, action) => {
      state.loading = true;
      state.isSubmitted = false;
      state.isValidUser = false;
    });
    builder.addCase(postUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isSubmitted = true;
      state.isValidUser = true;
    });
    builder.addCase(postUser.rejected, (state, action) => {
      state.loading = false;
      state.isSubmitted = true;
      state.isValidUser = false;
      state.error = "";
    });
  },

  // reducers: {
  //   setUser: (state, action) => {
  //     state.user = action.payload;
  //   },
  // },
});

// export const asyncFetchData = (id) => {
//   return (dispatch) => {
//     axios
//       .get("http://localhost:9000/users")
//       .then(({ data }) => dispatch(setUser(data[id])))
//       .catch((error) => console.log(`error while fetching user! ${error}`));
//   };
// };

// export const { setUser } = formSlice.actions;

export default formSlice.reducer;
