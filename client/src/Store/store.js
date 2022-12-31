import { createSlice, configureStore } from "@reduxjs/toolkit";

const userInitialState = {
  name: "",
  email: "",
  profilePhoto: "",
  id: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.profilePhoto = action.payload.profilePhoto;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.email = action.payload.email;
    },
    deleteUser(state) {
      state.name = state.profilePhoto = state.token = state.id = state.email = "";
    },
  },
});

const authInitialState = {
  token: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    logout(state, action) {
      state.token = "";
      state.isLoggedIn = false;
    },
  },
});

const chatInitialState = {
  chatList: [],
  selectedChat: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState: chatInitialState,
  reducers: {
    setChatList(state, action) {
      state.chatList = action.payload;
    },
    setSelectedChat(state, action) {
      state.selectedChat = action.payload;
    },
    clear(state) {
      state.chatList = [];
      state.selectedChat = {};
    }
  },
});

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    auth: authSlice.reducer,
    chat: chatSlice.reducer,
  },
});

export const userActions = userSlice.actions;
export const authActions = authSlice.actions;
export const chatActions = chatSlice.actions;

export default store;
