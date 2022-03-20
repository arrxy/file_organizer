const path = require("path");
const fs = require("fs");
function treeFn(dirPath) {
  if (dirPath == undefined) {
    console.log("Path invalid");
    return;
  }
  let doesExist = fs.existsSync(dirPath);
  if (doesExist) {
    treeHelper(dirPath, " ");
  }
}

function treeHelper(targetPath, indent) {
  let isFile = fs.lstatSync(targetPath).isFile();
  if (isFile) {
    let fileName = path.basename(targetPath);
    console.log(indent + "├── " + fileName);
    return;
  }
  let dirName = path.basename(targetPath);
  console.log(indent + "└──" + dirName);

  let children = fs.readdirSync(targetPath);
  for (let i = 0; i < children.length; i++) {
    let childpath = path.join(targetPath, children[i]);
    treeHelper(childpath, indent + "\t");
  }
}

module.exports = {
    tree: treeFn,
};
