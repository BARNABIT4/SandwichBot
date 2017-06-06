exports.run = function(msg) {
	msg.delete()
	msg.channel.send('Need to download luma again? https://github.com/AuroraWright/Luma3DS/releases')
}