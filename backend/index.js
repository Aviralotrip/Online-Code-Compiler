const express = require("express");
const cors = require("cors");
const { executeCpp } = require('./executeCpp.js');
const { executePy } = require('./executePy.js');
const { generateFile } = require('./generateFile.js');
const mongoose = require("mongoose");
const Job = require("./models/JobModel.js");
const app = express();
mongoose.connect("mongodb://localhost:27017/online-code", {
   
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
})  
.catch((err) => {
    console.log(err);
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post('/run', async (req, res) => {
    const { language = "cpp", code } = req.body;

    if (!code) {
        return res.status(400).json({
            success: false,
            error: "Please provide valid code"
        });
    }
    let job;
    try {
        // console.log("Generating file...");
        const filePath = await generateFile(language, code);
        // console.log(`File generated at: ${filePath}`);

        let output;

        job = new Job({
            language,
            filePath
        });
        job["startedAt"] =  Date.now();
        console.log("Saving job to database...");
        
        if (language === "cpp") {
            // console.log("Executing C++ code...");
            output = await executeCpp(filePath);
        } else {
            console.log("Executing Python code...");
            output = await executePy(filePath);
        }

        job["completedAt"] =  Date.now();
        job["output"] =await output;
        console.log(job.output)
        console.log(job);
        await job.save();
        
        // console.log("Execution successful, sending response...");
        return res.json({
            success: true,
            filePath,
            output
        });
    } catch (err) {
        console.error("Error during execution:", err);
        return res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => {
    console.log("Listening on port 5000");
});
