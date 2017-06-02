exports.run = function(msg, args) {
	msg.delete()
	msg.channel.sendMessage('', {
		'embed': {
			"type": "rich",
			'title':'Let me google that for you.',
			'description': "http://lmgtfy.com/?iie=1&q=" + args.toString().replace(/,/g, '+'),
			'color': 3710463
		}
	})
}