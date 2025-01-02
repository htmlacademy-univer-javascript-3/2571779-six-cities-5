import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthorizationStatus, NameSpace} from "../../shared/const";
import {User} from "../../models/user";
import {checkAuthAction, loginAction, logoutAction} from "../api-actions";
import {dropToken, saveToken} from "../../services/token";

export interface IUserDataInitialState {
  authStatus: AuthorizationStatus;
  localUser: User | null;
}


const initialState: IUserDataInitialState = {
  authStatus: AuthorizationStatus.Unknown,
  localUser: null,
};

const userDataSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setLocalUser: (state, action: PayloadAction<{ user: User | null }>) => {
      const {user} = action.payload;
      state.localUser = user;
    },
    setAuthorization: (state, action: PayloadAction<{ status: AuthorizationStatus }>) => {
      const {status} = action.payload;
      state.authStatus = status;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.localUser = null;
        state.authStatus = AuthorizationStatus.Unknown;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        userDataSlice.caseReducers.setLocalUser(state, action);
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        state.localUser = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        const {user} = action.payload;
        saveToken(user.token);
        userDataSlice.caseReducers.setLocalUser(state, action);
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        state.localUser = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        dropToken();
        state.authStatus = AuthorizationStatus.NoAuth;
        state.localUser = null;
      })
  }
});

export const {setLocalUser, setAuthorization} = userDataSlice.actions;
export const userReducer = userDataSlice.reducer;
