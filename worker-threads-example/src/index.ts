import express from "express";
import { Worker } from "worker_threads";
import { fibonacci } from "./utils";

const app = express();
app.use(express.json());

app.get("/worker-fib/:num", (req, res) => {
  const { num } = req.params;
  const number = parseInt(num);

  if (isNaN(number) || number < 0) {
    res.status(400).json({
      message: "Invalid number",
    });
    return;
  }

  const worker = new Worker("./dist/worker.js", { workerData: number });
  worker.on("message", (result) => {
    res.json({
      message: `This is a worker fib task result: ${result}`,
    });
  });
  worker.on("error", (err) => {
    console.error(err);
    res.status(500).json({
      message: "Error in worker",
    });
  });
});

app.get("/blocking-fib/:num", (req, res) => {
  const { num } = req.params;
  const number = parseInt(num);

  if (isNaN(number) || number < 0) {
    res.status(400).json({
      message: "Invalid number",
    });
    return;
  }

  const result = fibonacci(number);
  res.json({
    message: `This is a blocking fib task result: ${result}`,
  });
});

app.get("/non-blocking-task", (req, res) => {
  res.json({
    message: "This is a non-blocking task",
  });
});

app.listen(3000);
