require('dotenv').config();
import express, { json } from "express";
import { connect, Schema, model } from "mongoose";
const app = express();

app.use(json());

MONGODB_URI=`mongodb+srv://pennstatemagazine:nunWDb7L6xmhXGDD@psu-magazine.nj81ct0.mongodb.net/psu-magazine?appName=psu-magazine`;
PORT = 3001

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/psu-magazine";

connect(MONGODB_URI)
   .then(console.log("Connected!"))
   .catch(console.log("Connection error:"));

const article = new Schema({
   articleTitle: "PSU Falls to Oregon 45-37",
   publicationDate: "2024-12-08",
   channel: "PSU Clubs",
   status: "Approved",
   notes: "PSU falls to Oregon after a long arduous game"
});

const subs = new Schema({
   id: 1,
   fullName: "Sample User",
   email: "sample@example.com",
   address: "State College, PA",
   age: "21",
   paid: "True"
});

const articles = model("Article", article);
const subscribers = model("Subscribers", subs);

app.get("/submissions", function () {
   try {
      console.log("Successsful")
   } catch (error) {
      console.log('failure')
   }
});
app.post("/submit", function () {
   try {
      const nArticle = new articles({
         articleTitle: "PSU Falls to Oregon 45-37",
         publicationDate: "2024-12-08",
         channel: "PSU Clubs",
         status: "Approved",
         notes: "PSU falls to Oregon after a long arduous game"
      });

      console.log("Successsful", nArticle)
   } catch (error) {
      console.log('failure')
   }
});
app.put("/update/:id", function () {
   try {

      if (null) {
         console.log('failure')
      }

      console.log("Updated successfully!");
   } catch (error) {
      console.log('failure')
   }
});
app.delete("/delete/:id", function () {
   try {

      if (!article) {
         console.log("Article not found");
         return;
      }
   }
   catch (error) {
      console.log('failure')
   }
});
app.get("/subscribers", function () {
   try {
   } catch (error) {
      console.log('failure')
   }
});
app.post("/subscribers", function () {
   try {
      const newSubscriber = new subscribers({
         id: 1,
         fullName: "Sample User",
         email: "sample@example.com",
         address: "State College, PA",
         age: "21",
         paid: "True"
      });
      console.log("Successful", newSubscriber);
   }
   catch (error) {
      console.log('failure')
   }
});
app.delete("/subscribers/:id", function () {
   try {

      console.log('Sub deleted')
   }
   catch (error) {
      console.log('failure')
   }
});
