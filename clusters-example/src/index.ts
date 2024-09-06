import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Healthy server 2"
    })
})

app.listen(3000);