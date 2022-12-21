const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const router = require("./Routes/routes");

// JSON body parser middleware
app.use(express.json());

app.use("/", router);

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    console.log(`Server is listening to the port: ${PORT}`);
});