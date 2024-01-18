const { Client } = require('clashofclans.js');
const config = require("../config.json");
const ClashClient = new Client();

async function loginToCOC() {
    try {
        await ClashClient.login({
            email: config.coc_dev.email,
            password: config.coc_dev.password,
            keyName: "Clash of Clans API"
        });
        console.log("Logged in to Clash of Clans");
    } catch (err) {
        console.error(err);
    }
}

module.exports = { ClashClient, loginToCOC };
