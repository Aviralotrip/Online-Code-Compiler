const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const generateFile = async (language, code) => {
    try {
        const dirPath = path.join(__dirname, 'temp');
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        const extension = language === 'cpp' ? 'cpp' : 'py';
        const fileName = `${uuidv4()}.${extension}`;
        const filePath = path.join(dirPath, fileName);

        await fs.promises.writeFile(filePath, code);
        console.log(`File created at: ${filePath}`);
        return filePath;
    } catch (error) {
        console.error("Error generating file:", error);
        throw error;
    }
};

module.exports = { generateFile };
