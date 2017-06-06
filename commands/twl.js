exports.run = function(msg) {
	msg.delete()
	msg.channel.send('DS games broken? Follow this https://3ds.guide/troubleshooting#twl_broken')
}