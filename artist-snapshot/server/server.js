import express from "express";
import fetch from "node-fetch";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());

let values = [{}];

async function getData() {
  const response = await fetch(
    "https://api.spotify.com/v1/albums?ids=4j7Y3vNhgBBRAujJl85UDk&market=US",
    {
      headers: {
        Authorization:
          "Bearer " +
          "BQBN8Io0plsX34AkDDy3Ih07MuayY64wS4rBzoQTAPuSfxiYvfVN47cZvnIW0pT9Ers6hUao5JKSp7Y145uGJjBWLiI0XJQctS69OCOv9DQr7cDPWjc",
      },
    }
  );
  const data = await response.json();
  values = data;
}

getData();

const items = [{ sample: "jjjj" }];

app.use((req, res) => {
  // const test = await getData();
  // // const item = getData();
  res.send(values);
});

app.listen(8080);
