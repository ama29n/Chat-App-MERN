const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const server = http.createServer(app);
const userRouter = require("./Routes/userRoutes");
const messageRouter = require("./Routes/messageRoutes");
const chatRouter = require("./Routes/chatRoutes");
const connect = require("./Database/connect");

app.use(express.json());

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.append("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.append("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/user/", userRouter);
app.use("/message/", messageRouter);
app.use("/chat/", chatRouter);

app.use("*", (req, res) => {
  res.status(404).send({ message: "No such URL exists" });
});

const PORT = process.env.PORT || 3010;

const connectToDbAndStartServer = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("Connected to database");
    server.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (err) {
    console.log(err);
    process.exit();
  }
};
connectToDbAndStartServer();

// IO

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://chat-app-ama29n.onrender.com",
    // origin: "http://localhost:3000"
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData.id);
    console.log("A user connected with id: " + userData.id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined the room: " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    // if (!chat.users) return console.log("Chat.user not defined");

    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) {
        return;
      }
      socket.to(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("User Disconnected");
    // Leave the room we created for that particular user 
    socket.leave(userData.id);
  });
});
