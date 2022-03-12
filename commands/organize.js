const fs = require("fs");
const path = require("path");
// to read filepath -> use command readlink -f <filename from prev directory>
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    images: ['png','jpg','jpeg']
}
function organize(srcPath){
    // check if source present 
    if(srcPath == undefined){
        // process.cwd returns the current working directory
        srcPath = process.cwd();
        console.log(srcPath);
    }
    let organizedFiles = path.join(srcPath, "organized_files");
    console.log(organizedFiles);
    if(!fs.existsSync(organizedFiles))
        fs.mkdirSync(organizedFiles);
    else{
        console.log('folder already exists');
    }
    // Reads the contents of the directory -> reads file name
    let allfiles = fs.readdirSync(srcPath);
    console.log(allfiles);

    //traverse over all files and classify them on basis of their extension
    
    for(let i = 0; i < allfiles.length; i++){
        // let ext = allfiles[i].split(".")[1];
        let ext = path.extname(allfiles[i]);
        if(ext != '')
        console.log(ext);
    }
}

// scan the file


let srcPath = "/home/aritro/FJP/DEV/NODE/file explorer/downloads";
organize(srcPath);