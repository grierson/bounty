// https://evdokimovm.github.io/javascript/nodejs/2016/06/13/NodeJS-How-to-Use-Functions-from-Another-File-using-module-exports.html

function runALLGame() {

    console.log("\n\njust run it <===\n")
    require('./myJS/cardA-impertive.js')

    console.log("\n\nstore it as variables then run it <---\n")
    var oneGame = require('./myJS/cardA-impertive.js');
    oneGame();

    console.log("\n\njust run it but now it is a Class<===\n")
    require('./myJS/cardB-OO.js')

    console.log("\n\nstore it as variables then run it <---\n")
    oneGame = require('./myJS/cardB-OO.js');
    new oneGame();

    console.log("\n\njust run it but now it is a FP<===\n")
    require('./myJS/cardC-FP-0.js')

    console.log("\n\nstore it as variables then run it <---\n")
    oneGame = require('./myJS/cardC-FP-0.js');
    oneGame();
};

module.exports = runALLGame;