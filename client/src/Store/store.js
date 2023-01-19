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
  chatMessages: [],
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
    setChatMessages(state, action) {
      state.chatMessages = action.payload;
    },
    updateLatestMessage(state, action) {
      const { chatId, message } = action.payload;
      let updated = false;
      let newChatList = state.chatList.map((chat) => {
        if(JSON.stringify(chat._id) === JSON.stringify(chatId)) {
          updated = true;
          chat.latestMessage = message;
        }
        return chat;
      });
      if(updated === false) {
        let newChat = Object.assign({}, message.chat);
        newChat.users = message.chat.users.map(user => {
          let obj = Object.assign({}, user);
          return obj;
        });
        newChat.latestMessage = Object.assign({}, message);
        newChatList = [newChat, ...newChatList];
      }
      state.chatList = newChatList;
    },
    clear(state) {
      state.chatList = [];
      state.selectedChat = {};
      state.chatMessages = [];
    }
  },
});

const notificationInitialState = {
  notifications: [],
}

const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
  },
})

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    auth: authSlice.reducer,
    chat: chatSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

export const userActions = userSlice.actions;
export const authActions = authSlice.actions;
export const chatActions = chatSlice.actions;
export const notificationActions = notificationSlice.actions;

export default store;
