const express = require("express");
const router = express.Router();
const request = require("request");

router.post("/res", async (req, res) => {
  const { name, email } = req.body;
  try {
    console.log(res.json);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});
