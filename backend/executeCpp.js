const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filePath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);  // Use .exe extension for Windows

    return new Promise((resolve, reject) => {
        // Adjust the command for Windows
        exec(`g++ ${filePath} -o ${outPath} && ${outPath}`, (error, stdout, stderr) => {
            
            error && reject({error,stderr});
            stderr && reject(stderr);

            resolve(stdout);
        
        });
    });
};

module.exports = { executeCpp };
