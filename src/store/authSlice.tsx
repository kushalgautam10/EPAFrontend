import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

type User = {
  id: string;
  userName: string;
  email: string;
  roles: string[];
};

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user")
    }
  }
});
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
  
};

export const loadUserFromStorage = () => (dispatch: AppDispatch) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) return;

  if (isTokenExpired(token)) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(clearUser());
    return;
  }

  dispatch(setUser({ user: JSON.parse(user), token }));

};


export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;