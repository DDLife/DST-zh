const fs = require("fs");
const path = require("path");

const currentPath = path.join(__dirname, "../docs");

for (const file of findFiles(currentPath)) {
  if (!file.endsWith(".md")) continue;
  calcFileLines(file).then((lineCount) => {
    if (lineCount === 2) {
      fs.unlinkSync(file);
      console.log(`Deleted ${file}`);
    }
  });
}

function calcFileLines(filePath) {
  return new Promise((resolve, reject) => {
    let lineCount = 0;
    const stream = fs.createReadStream(filePath);
    stream.on("data", (buffer) => {
      let idx = -1;
      lineCount--; // Because the loop will run once for idx=-1
      do {
        idx = buffer.indexOf("\n", idx + 1);
        lineCount++;
      } while (idx !== -1);
    });
    stream.on("error", () => {
      reject();
    });
    stream.on("end", () => {
      resolve(lineCount);
    });
  });
}

// find all file in the directory recursively
function findFiles(dir, files = []) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = `${dir}/${file}`;
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findFiles(filePath, files);
    } else {
      files.push(filePath);
    }
  });
  return files;
}
