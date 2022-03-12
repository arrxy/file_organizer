function help(){
    console.log(`
    The CLI commands:
    1) node main.js help
    2) node main.js tree <path>
    3) node main.js organize <path>
    `);
}

module.exports = {
    help: help,
}