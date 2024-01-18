module.exports = {
    name: 'clan',
    description: 'Get information about a clan',
    usage: '<clan tag>',
    run: async (sock, messageInfoUpsert, args, author, cocClient, sendError) => {
        var send = await sock.sendMessage(messageInfoUpsert.messages[0].key.remoteJid, {text: "Fetching clan info..."});
        try{
            if (!args[0]) return await sock.sendMessage(messageInfoUpsert.messages[0].key.remoteJid, {text: "Please provide a clan tag!", edit: send.key});
            var clanTag = args[0].toUpperCase();
            var clan = await cocClient.getClan(clanTag);
            members = await cocClient.getClanMembers(clanTag);
            var memberList = "";
            for (var i = 0; i < members.length; i++) {
                memberList += members[i].name + " (" + members[i].tag + ") 🏠" + members[i].townHallLevel + "\n";
            }
            return await sock.sendMessage(messageInfoUpsert.messages[0].key.remoteJid, {text: `Clan info for ${clan.name}:\n\nTag: ${clan.tag}\nLevel: ${clan.level}\nWar Wins: ${clan.warWins}\nWar Win Streak: ${clan.warWinStreak}\nRequired Trophies: ${clan.requiredTrophies}\nDescription: ${clan.description}\nLocation: ${clan.location.name}\nMembers:\n ${memberList}\n`, edit: send.key});
        }catch(err){
            console.log(err);
            await sock.sendMessage(messageInfoUpsert.messages[0].key.remoteJid, {text: "An error occurred! here is the error object:\n\n" + err + "\n\n", edit: send.key});
            return await sendsError(err, messageInfoUpsert);
        }
        
    }
}