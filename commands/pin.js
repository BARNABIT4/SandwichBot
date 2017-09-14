exports.run = function(msg) {
	msg.delete()
	msg.channel.send('https://mkey.salthax.org/')
}