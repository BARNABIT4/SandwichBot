let pbot
exports.init = function(bot) { pbot = bot }

exports.run = function(msg) {
	let pjson = require('../package.json')

	let version = `Wouldnt you like to know`
	let uptime = secondsToString(process.uptime()).toString()
	let modules = Object.keys(pbot.modules).length.toString()
	let memory = `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`

	// Showing the amount of stickers to demonstrate accessing other module's information
	let stickers = pbot.modules.s.stickerCount().toString()
	let tags = pbot.modules.tag.tagsCount().toString()

	msg.edit('', {
		embed: {
			type: 'rich',
			description: '[SandwichBot Stats](https://github.com/pbanj/SandwichBot)',
			color: pbot.config.embedColor,
			fields: [
				{ name: '❯ Version', value: version, inline: true },
				{ name: '❯ Ram usage', value: memory, inline: true },
				{ name: '❯ Modules', value: modules, inline: true },
				{ name: '❯ Stickers', value: stickers, inline: true },
				{ name: '❯ Tags', value: tags, inline: true }
			],
			thumbnail: { url: 'http://i.imgur.com/0tPwgV7.gif' },
			footer: { text: `Uptime: ${uptime}` }
		}
	})
}

function secondsToString(seconds) {
	seconds = Math.trunc(seconds)
	let numdays = Math.floor((seconds % 31536000) / 86400)
	let numhours = Math.floor(((seconds % 31536000) % 86400) / 3600)
	let numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60)
	let numseconds = (((seconds % 31536000) % 86400) % 3600) % 60
	return `${numdays} days ${numhours} hours ${numminutes} minutes ${numseconds} seconds`
}
