const fs = require('fs');
module.exports = {
    name: 'help',
    description: 'Get a list of commands',
    usage: '',
    run: async (sock, messageInfoUpsert, args, author, cocClient, sendError) => {
        var commands = "";
        var commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        for (var i = 0; i < commandFiles.length; i++) {
            var command = require(`./${commandFiles[i]}`);
            commands += `${command.name} - ${command.description}\n`;
        }
        return await sock.sendMessage(messageInfoUpsert.messages[0].key.remoteJid, {text: `Commands:\n\n${commands}`});
    }
}