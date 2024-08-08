import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "./db.js";
import User from "./models/User.js";
dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});

app.get("/info", (req, res) => {
  res.status(200).send({
    body: "Hello World",
  });
  console.log("Response sent successfully!");
});

app.post("/register", async (req, res) => {
  console.log(
    "This is the user received : " +
      req.body.username +
      " and this is the password : " +
      req.body.password +
      " and this is the mail :" +
      req.body.email
  );

  const req_username = req.body.username;
  const req_userpass = req.body.password;
  const req_email = req.body.email;
  const hashedPassword = await bcrypt.hash(req_userpass, 10);

  // Return error if the username or email already exists.
  // To be implemented
  const newUser = new User({
    username: req_username,
    email: req_email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    const user = await User.findOne({ username: req_username });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log("This is the registration error : ", error);
    res.status(400).json("Invalid Credentials!");
  }
});

app.post("/login", async (req, res) => {
  console.log(
    "This is the user received : " +
      req.body?.username +
      " and this is the password : " +
      req.body?.password
  );
  const req_username = req.body?.username;
  const req_userpass = req.body?.password;

  if (!req_username || !req_userpass) {
    res.status(400).json("Username or Password not present.");
  }
  const user = await User.findOne({ username: req_username });
  console.log("this is the user: " + user);
  if (user && (await bcrypt.compare(req_userpass, user?.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } else {
    res.status(400).send("Invalid credentials");
  }
});

app.get("/home", (req, res) => {
  const token = req.headers["authorization"];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      data: data,
    });
  } catch (e) {
    res.status(403).json({
      data: "Token Expired Login Again!",
    });
  }
});

const data = [
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723020508/john_wick_e3oht3.jpg",
    name: "John Wick",
    type: "Action",
    videoUrl:
      "https://res.cloudinary.com/dor9r1mfu/video/upload/v1723021037/Y2meta.app-John_Wick__Chapter_4_2023_Movie_Official_Trailer_Keanu_Reeves_Donnie_Yen_Bill_Skarsg%C3%A5rd_spzhh4.mp4",
  },
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723024450/A_quiet_place_m3psva.jpg",
    name: "A Quiet Place",
    type: "Horror",
    videoUrl:
      "https://res.cloudinary.com/dor9r1mfu/video/upload/v1723099859/Y2meta.app-A_Quiet_Place__Day_One___Final_Trailer_2024_Movie_-_Lupita_Nyong_o_Joseph_Quinn_euhrdm.mp4",
  },
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723024599/dp3_ibu4qs.jpg",
    name: "Deadpool 3",
    type: "Comedy",
    videoUrl:
      "https://res.cloudinary.com/dor9r1mfu/video/upload/v1723099937/Y2meta.app-Deadpool_Wolverine___Nice___In_Theaters_July_26_chjv5l.mp4",
  },
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723024790/kalki_doweun.avif",
    name: "Kalki",
    type: "Hindi",
    videoUrl:
      "https://res.cloudinary.com/dor9r1mfu/video/upload/v1723099976/Y2meta.app-Kalki_2898_AD_-_Blockbuster_Promo___Telugu___Prabhas_Amitabh_Kamal_Haasan_Deepika_Nag_Ashwin_ubyydh.mp4",
  },
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723025142/dg1rywn-55b55e96-d9f6-4d8f-8b05-a9bb6df05f7b.jpg_lpih0y.jpg",
    name: "Spider Man",
    type: "Animated",
    videoUrl:
      "https://res.cloudinary.com/dor9r1mfu/video/upload/v1723100011/Y2meta.app-SPIDER-MAN__ACROSS_THE_SPIDER-VERSE_-_Official_Trailer_HD_j6pmen.mp4",
  },
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723025220/the-peaky-blinders-shelby-family-yzbar888h96t7ekn_aomrs9.jpg",
    name: "Peaky Blinders",
    type: "Web Series",
    videoUrl:
      "https://res.cloudinary.com/dor9r1mfu/video/upload/v1723100207/Peaky_Blinders_Season_6_Official_Trailer___Netflix_India_vhhkxb.mp4",
  },
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723025356/professor-money-heist-1yegj3ptnd8g5noc_fkfu23.jpg",
    name: "Money Heist",
    type: "Crime",
    videoUrl:
      "https://res.cloudinary.com/dor9r1mfu/video/upload/v1723100244/Money_Heist___Series_Trailer___Netflix_j4mekj.mp4",
  },
];
