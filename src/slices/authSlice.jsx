import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import httpService from "@/services/httpService"
import { toast } from "sonner";
import { AUTH_TOKEN, ACTIVE_USER } from "@/constants/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { extractErrorMessage } from "@/helpers/shared";
import { redirect } from "next/navigation";
import {API_BASE_URL} from "@/configs/AppConfig"

//Requests Handeling

export const loginRequest = createAsyncThunk(
  "/login",
  async (data, { rejectWithValue }) => {
    try {
      // const response = await httpService.postData(data, API_BASE_URL + "/login");
      // return response;
      return { "data" : {
          "user": {
              "id": 1,
              "role": "admin",
              "name": "admin",
              "email": "admin@demo.com",
          },
          "token": "16|lE1uho9DVJKmoMgdMhq7i1ifDATlGAsEtkSi2i1Pafa87770"
        }}
    } catch (error) {
      return rejectWithValue({message: extractErrorMessage(error) || "Login failed" }  );
    }
  }
);

//End of Requests Handeling


const initialState  = {
  loginForm: {
    email: "admin@demo.com",
    password: "admin",
  },
  requesting: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetLoginForm: (state) => {
      state.loginForm.email = "";
      state.loginForm.password = "";
    },
    setLoginForm: (state, action) => {
      state.loginForm[action.payload.field] = action.payload.value;
    },
    getAuthToken: (state) => {
      const token = localStorage.getItem(AUTH_TOKEN);
      if (token) {
        return token;
      } else {
        return null;
      }
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.pending, (state) => {
        state.requesting = true;
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        let data = action.payload.data;
        toast.success( "Login Success");
        state.loginForm = {
          email: "",
          password: "",
        };
        localStorage.setItem(AUTH_TOKEN, data.token);

        // Set the active user
        const user = data.user ?? undefined;
        if (user) {
          state.active = user;
          localStorage.setItem(ACTIVE_USER, JSON.stringify(user));
        } else {
          state.active = null;
          localStorage.removeItem(ACTIVE_USER);
        }

        state.requesting = false;
        // Redirect to the dashboard or home page
        redirect("/dashboard");
      })
      .addCase(loginRequest.rejected, (state, action) => {
        toast.error( action.payload.message);
        state.requesting = false;
      });
  },
})

export const { resetLoginForm, setLoginForm  } = authSlice.actions
export default authSlice.reducer
