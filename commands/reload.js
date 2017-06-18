let pbot
exports.init = function(bot) { pbot = bot }
exports.run = function(msg) {
	msg.delete()
	pbot.loadCommands()
}
