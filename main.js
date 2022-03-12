const fs = require("fs");
let helpFun = require("./commands/help");
let inputArr = process.argv.slice(2);
let command = inputArr[0];
let path = inputArr[1];
switch(command){
    case "tree":
        // call tree function
        break;
    case "organize":
        // call organize function
        break;
    case "help":
        helpFun.help();
        break;
    default: console.log("command not recognized :/");
}