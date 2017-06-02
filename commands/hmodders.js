exports.run = function(msg) {
	msg.delete()
	msg.channel.send('http://pastebin.com/wNr42PtH').then(msg => {
	})
}