exports.run = function(msg) {
	msg.delete()
	msg.channel.sendMessage('https://mkey.salthax.org/')
}