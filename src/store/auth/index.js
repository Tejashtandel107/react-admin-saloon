import { createSlice, createAsyncThunk, isAllOf } from "@reduxjs/toolkit";

// ** Axios Imports
import { toast } from "react-toastify";
import httpService from "../../common/http.service";
// import { act } from "react";

export const appLoginUser = createAsyncThunk(
  "appUser/appLoginUser",
  async (params) => {
    try {
      const { email, password, navigate } = params;

      const response = await httpService.post(
        "/signin",
        {}, // query params
        { email, password }, // body
      );

      if (response.data) {
        response.data.navigate = navigate;
      }
      return response.data;
    } catch (error) {
      toast.error(error?.message);
      throw error;
    }
  },
);

export const appUserSlice = createSlice({
  name: "User",
  initialState: {
    user: "",
    userType: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(appLoginUser.fulfilled, (state, action) => {
      state.user = action.payload?.data;

      if (action?.payload?.data?.token) {
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("user", JSON.stringify(action.payload.data));

        // ✅ Only admin check
        if (action.payload.data.user?.admin === true) {
          action.payload.navigate("/dashboard");
        } else {
          toast.error("Access denied: Admin only");
          localStorage.clear();
          action.payload.navigate("/");
        }
      }
    });
  },
});

export default appUserSlice.reducer;
