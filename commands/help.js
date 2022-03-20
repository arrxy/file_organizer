function help(){
    console.log(`
    The CLI commands:
    1) node main.js help
    2) node main.js tree <path>
    3) node main.js organize <path>

    to get the path 
    -> use command "readlink -f <filename from prev directory>"
    `);
}

module.exports = {
    help: help,
}