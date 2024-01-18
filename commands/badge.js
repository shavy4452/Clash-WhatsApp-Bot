module.exports = {
    name: 'badge',
    description: 'Get the badge for a clan',
    usage: '<clan tag>',
    run: async (sock, messageInfoUpsert, args, author, cocClient, sendError) => {
        try{
            if (!args[0]) return await sock.sendMessage(messageInfoUpsert.messages[0].key.remoteJid, {text: "Please provide a clan tag!"}, {
                quoted: messageInfoUpsert.messages[0]
            });

            var clanTag = args[0].toUpperCase();
            var clan = await cocClient.getClan(clanTag);
            return await sock.sendMessage(messageInfoUpsert.messages[0].key.remoteJid, {
                "image": {
                    "url": clan.badge.url
                },
                "caption": `Clan badge for ${clan.name}`
            }
            , {
                quoted: messageInfoUpsert.messages[0]
            });
        }catch(err){
            console.log(err);
            await sock.sendMessage(messageInfoUpsert.messages[0].key.remoteJid, {text: "An error occurred! here is the error object:\n\n" + err + "\n\n"}, {
                quoted: messageInfoUpsert.messages[0]
            });
            return await sendsError(err, messageInfoUpsert);
        }
        
    }
}