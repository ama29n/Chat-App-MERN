const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
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
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (err) {
    console.log(err);
    process.exit();
  }
};
connectToDbAndStartServer();
