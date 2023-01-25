const { Client } = require('whatsapp-web.js');
const { Client: cocClient } = require('clashofclans.js');
const coc = new cocClient();
const config = require('./config.json');

const client = new Client({
    authStrategy: new LocalAuth(),
});


client.initialize();

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    //client.sendMessage('91xxxxxxxxx@c.us','Whatshapp Bot has been connected!')
    console.log('Socket Connected!');
});

// clash functions 
async function clanInfo(tag){
    try{
        let clan = await coc.getClan(tag);
        return `Requested Tag: ${clan.tag}\nClan Name: ${clan.name}\n Description: ${clan.description}\nMember Count: ${clan.memberCount}\nCups Required: ${clan.requiredTrophies}\nClan History: https://chocolateclash.com/cc_n/clan.php?tag=${clan.tag.replace("#","")}&rlim=10000&slim=10000`;
    }catch(err){
        console.log(err);
        if(err.status == 404){
            return `Not Found!`;
        }else if(err.status == 503){
            return `Service is temporarily unavailable because of maintenance.`;
        }else{
            return `Error!`;
        }
    }
}

async function playerInfo(tag){
    try{
        let player = await coc.getPlayer(tag);
        return player.name;
    }catch(err){
        console.log(err);
        if(err.status == 404){
            return `Not Found!`;
        }else if(err.status == 503){
            return `Service is temporarily unavailable because of maintenance.`;
        }else{
            return `Error!`;
        }
    }
}

client.on('message', async msg => {
    var prefix = config.command_prefix;
    var args = msg.body.slice(prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase();
    if (msg.body.startsWith(prefix)) {
        if(command == 'clan'){
            clanInfo(args[0]).then((res) => {
                return msg.reply(res);
            });
        }else if(command == 'player'){
            playerInfo(args[0]).then((res) => {
                return msg.reply(res);
            });
        }
    }
});

client.on('message_revoke_everyone', async (after, before) => {
    // Fired whenever a message is deleted by anyone (including you)
    console.log(after); // message after it was deleted.
    if (before) {
        console.log(before); // message before it was deleted.
    }
});

client.on('message_revoke_me', async (msg) => {
    // Fired whenever a message is only deleted in your own view.
    console.log(msg.body); // message before it was deleted.
});

client.on('message_ack', (msg, ack) => {
    /*
        == ACK VALUES ==
        ACK_ERROR: -1
        ACK_PENDING: 0
        ACK_SERVER: 1
        ACK_DEVICE: 2
        ACK_READ: 3
        ACK_PLAYED: 4
    */

    if(ack == 3) {
        // The message was read
    }
});

client.on('group_join', (notification) => {
    // User has joined or been added to the group.
    console.log('join', notification);
    notification.reply('User joined.');
});

client.on('group_leave', (notification) => {
    // User has left or been kicked from the group.
    console.log('leave', notification);
    notification.reply('User left.');
});

client.on('group_update', (notification) => {
    // Group picture, subject or description has been updated.
    console.log('update', notification);
});

client.on('change_state', state => {
    console.log('CHANGE STATE', state );
});

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});

(async function () {
    await coc.login({ email: config.coc_dev_data.email, password: config.coc_dev_data.password });
    console.log('Clash of Clans API Connected!');
})();
