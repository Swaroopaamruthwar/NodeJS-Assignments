function getNameFromCommandLine() {
    // Write you code here, name should be taken as args in process.argv
    var Name=process.argv[process.argv.length-1];
    return Name;
}

function getNameFromEnv() {
    // Write your code here
    var Name = process.env.name
    return Name
}

function getNameFromReadLine() {
    // Write your code here
    const readline=require('readline')
    const rl=readline.createInterface({
        input:process.stdin,
        output:process.stdout
    })
    rl.question("please enter your name",(name)=>{
        console.log(name);
        rl.close();
    });
}

module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}