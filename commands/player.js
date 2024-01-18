module.exports = {
    name: 'player',
    description: 'Get information about a player',
    usage: '<player tag>',
    run: async (sock, messageInfoUpsert, args, author, cocClient, sendError) => {
        var send = await sock.sendMessage(messageInfoUpsert.messages[0].key.remoteJid, {text: "Fetching player info..."});
        try{
            if (!args[0]) return await sock.sendMessage(messageInfoUpsert.messages[0].key.remoteJid, {text: "Please provide a player tag!", edit: send.key});
            var playerTag = args[0].toUpperCase();
            var player = await cocClient.getPlayer(playerTag);
            var clan = await cocClient.getClan(player.clan.tag);
            var troops = player.troops;
            var troopList = "";
            for (var i = 0; i < troops.length; i++) {
                troopList += troops[i].name + " (" + troops[i].level + ") ";
            }
            var heroes = player.heroes;
            var heroList = "";
            for (var i = 0; i < heroes.length; i++) {
                heroList += heroes[i].name + " (" + heroes[i].level + ") ";
            }
            var spells = player.spells;
            var spellList = "";
            for (var i = 0; i < spells.length; i++) {
                spellList += spells[i].name + " (" + spells[i].level + ") ";
            }
            var achievements = player.achievements;
            var achievementList = "";
            for (var i = 0; i < achievements.length; i++) {
                achievementList += achievements[i].name + " (" + achievements[i].stars + "/" + achievements[i].value + ") ";
            }
            return await sock.sendMessage(messageInfoUpsert.messages[0].key.remoteJid, {text: `Player info for ${player.name}:\n\nTag: ${player.tag}\nTown Hall Level: ${player.townHallLevel}\nExperience Level: ${player.expLevel}\nTrophies: ${player.trophies}\nBest Trophies: ${player.bestTrophies}\nWar Stars: ${player.warStars}\nAttack Wins: ${player.attackWins}\nDefense Wins: ${player.defenseWins}\nBuilder
Hall Level: ${player.builderHallLevel}\nVersus Trophies: ${player.versusTrophies}\nBest Versus Trophies: ${player.bestVersusTrophies}\nVersus Battle Wins: ${player.versusBattleWins}\nRole: ${player.role}\nDonations: ${player.donations}\nDonations Received: ${player.donationsReceived}\nClan: ${clan.name}\nClan Tag: ${clan.tag}\nClan Level: ${clan.level}\nClan Badge: ${clan.badge.url}\nTroops: ${troopList}\nHeroes: ${heroList}\nSpells: ${spellList}\nAchievements: ${achievementList}\n`, edit: send.key});
        }catch(err){
            console.log(err);
            await sock.sendMessage(messageInfoUpsert.messages[0].key.remoteJid, {text: "An error occurred! here is the error object:\n\n" + err + "\n\n", edit: send.key});
            return await sendsError(err, messageInfoUpsert);
        }
    }
}