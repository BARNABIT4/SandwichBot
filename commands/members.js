let pbot
exports.init = function(bot) { pbot = bot }

exports.run = function(msg) {
	msg.delete()
	msg.channel.send('', {
		embed: {
			title: msg.guild.name,
			description: `Member Count: ${msg.guild.memberCount}`,
			color: pbot.config.embedColor
		}
	})
}
