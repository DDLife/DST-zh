import path from "path";
import fs from "fs/promises";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const rootPath = path.join(__dirname, "..");
const treePath = path.join(rootPath, "temp/scripts-DST");
const htmlPath = path.join(rootPath, "progress/collapse-list.html");

async function main() {
  const html = await generateDOMElements(treePath, [".git", "README.md"]);

  try {
    const data = await fs.readFile(htmlPath, "utf8");
    const result = data.replace(
      /<ul class="collapse">([\s\S]*)<\/ul>/,
      `<ul class="collapse">DST${html}</ul>`
    );
    await fs.writeFile(htmlPath, result, "utf8");
    console.log("File updated successfully");
  } catch (err) {
    console.error(err);
  }
}

async function generateDOMElements(dirPath, exclude = []) {
  const stats = await fs.stat(dirPath);
  if (!stats.isDirectory()) {
    return "";
  }
  const dirName = path.basename(dirPath);
  const children = await fs.readdir(dirPath, { withFileTypes: true });
  const [childDirs, childFiles] = children.reduce(
    ([dirs, files], child) => {
      if (child.isDirectory()) {
        dirs.push(child);
      } else {
        files.push(child);
      }
      return [dirs, files];
    },
    [[], []]
  );

  const childDirElements = await Promise.all(
    childDirs
      .filter(
        (childDir) =>
          !exclude.some((excluded) => childDir.name.includes(excluded))
      )
      .map(async (childDir) => {
        const childDirPath = path.join(dirPath, childDir.name);
        const childDirName = childDir.name;
        const childDirHtml = await generateDOMElements(childDirPath, exclude);
        return `<li>${childDirName}${childDirHtml}</li>`;
      })
  );

  const childFileElements = childFiles
    .filter(
      (childFile) =>
        !exclude.some((excluded) => childFile.name.includes(excluded))
    )
    .map((childFile) => {
      const childFileName = childFile.name;
      return `<li>${childFileName}</li>`;
    });

  const childElements = [...childDirElements, ...childFileElements];
  const childHtml =
    childElements.length > 0 ? `<ul>${childElements.join("")}</ul>` : "";

  return `${childHtml}`;
}

main();
