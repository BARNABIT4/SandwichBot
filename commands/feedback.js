exports.run = function(msg) {
	msg.delete()
	msg.channel.send('http://ninhax.us/pbanj').then(msg => {
	})
}