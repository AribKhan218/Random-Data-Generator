import express from "express";
const app = express();
import mongoose from "mongoose";
import { Employee } from "./models/Employee.js";

mongoose.connect("mongodb://127.0.0.1:27017/company");
const port = 3000;
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { foo: "foo" });
});

const getRandom = (arr) => {
  let rno = Math.floor(Math.random() * arr.length);
  return arr[rno];
};

let randomName = ["Harry", "Ali", "Kaif", "Rohan", "Mosh", "Tim"];
let randomLanguage = ["Python", "JavaScript", "Java", "C", "C++", "Rust"];
let randomCity = [
  "New York",
  "Delhi",
  "Islamabad",
  "Karachi",
  "Bangalore",
  "London",
];

app.get("/generate", async (req, res) => {
  await Employee.deleteMany({});
  for (let i = 0; i < 10; i++) {
    let e = await Employee.create({
      name: getRandom(randomName),
      salary: Math.floor((Math.random() + 1) * 200000),
      language: getRandom(randomLanguage),
      city: getRandom(randomCity),
      isManager: Math.random() > 0.5,
    });

    console.log(e);
  }

  res.render("index", { foo: "foo" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
