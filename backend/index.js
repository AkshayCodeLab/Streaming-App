import express from "express";
import cors from "cors";

let validUser = "Akshay";
let validPass = "1234";
const app = express();
app.use(cors());
app.use(express.json());
const port = 4000;

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});

app.get("/info", (req, res) => {
  res.status(200).send({
    body: "Hello World",
  });
  console.log("Response sent successfully!");
});

app.post("/login", (req, res) => {
  console.log(
    "This is the user received : " +
      req.body.username +
      " and this is the password : " +
      req.body.password
  );
  const req_username = req.body.username;
  const req_userpass = req.body.password;

  if (validUser == req_username && validPass == req_userpass) {
    res.status(200).json({
      token: "valid",
    });
  } else {
    res.status(400).json("Invalid Credentials!");
  }
});

app.get("/home", (req, res) => {
  const token = req.headers["authorization"];

  console.log("Token recieved : " + token);
  if (token == "valid") {
    res.status(200).json({
      data: "List of items",
    });
  } else {
    res.status(403).json({
      data: "Token Expired Login Again!",
    });
  }
});
