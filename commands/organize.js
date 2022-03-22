const fs = require("fs");
const path = require("path");
// to read filepath -> use command readlink -f <filename from prev directory>
let types = {
  media: ["mp4", "mkv", "mp3"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
  codes:[".py", ".cpp",".java", ".js"],
  images: ["png", "jpg", "jpeg"],
};
function organize(srcPath) {
  // check if source present
  if (srcPath == undefined) {
    // process.cwd returns the current working directory
    srcPath = process.cwd();
  }
  let organizedFiles = path.join(srcPath, "organized_files");
  //   console.log(organizedFiles);
  if (!fs.existsSync(organizedFiles)) {
    //mkdirSync -> makes directory with last path name
    fs.mkdirSync(organizedFiles);
  } else {
    console.log("folder already exists");
  }
  // Reads the contents of the directory -> reads file name
  let allFiles = fs.readdirSync(srcPath);
  //   console.log(allFiles);

  //traverse over all files and classify them on basis of their extension

  for (let i = 0; i < allFiles.length; i++) {
    // let ext = allfiles[i].split(".")[1];
    // to get the extension name
    // let ext = path.extname(allfiles[i]);
    // if(ext != '')
    // console.log(ext);

    //check if it is a file or a folder
    let fullPathOfFile = path.join(srcPath, allFiles[i]);
    // console.log(fullPathOfFile);
    //lstatsync gives information regarding the link provided
    let isFile = fs.lstatSync(fullPathOfFile).isFile();
    if (isFile) {
      //1.1 get ext name
      let ext = path.extname(allFiles[i]).split(".")[1];
      // console.log(ext);
      //1.2 get folder name from extension
      let folderName = getFolderName(ext);
      //1.3 copy from src folder and paste in dest folder (folder_name eg. document, media, etc)
      copyFileToDest(srcPath, fullPathOfFile, folderName);
      //   console.log(folderName);
    }
  }
}

function getFolderName(ext) {
  for (let key in types) {
    // console.log(key);
    for (let i = 0; i < types[key].length; i++) {
      if (types[key][i] == ext) {
        return key;
      }
    }
  }
  return "miscellaneous";
}

function copyFileToDest(srcPath, fullPathOfFile, folderName) {
  //1. make folderName path
  let destFolderPath = path.join(srcPath, "organized_files", folderName);
  //2. check if folder exists, if not then make
  if (!fs.existsSync(destFolderPath)) {
    fs.mkdirSync(destFolderPath);
  }
  //3. copy file from src -> dest
  // returns the last portion of the path
  let fileName = path.basename(fullPathOfFile);
  let destFileName = path.join(destFolderPath, fileName);
  //copies the contents of the file and not the file name
  fs.copyFileSync(fullPathOfFile, destFileName);
}

// let srcPath = "/home/aritro/FJP/DEV/NODE/file_explorer/downloads";
// organize(srcPath);

module.exports = {
    organize: organize,
}