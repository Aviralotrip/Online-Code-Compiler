const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const executePy = async (filePath) => {
    return new Promise((resolve, reject) => {
        // Adjust the command for Windows
        exec(`python ${filePath}`, (error, stdout, stderr) => {
            
            error && reject({error,stderr});
            stderr && reject(stderr);

            resolve(stdout);
            
        });
    });
};

module.exports = { executePy };
