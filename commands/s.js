let pbot
let _msg
let _stickers = {}
let _table = 'stickers'
let assets = './files/stickers'
const fs = require('fs')

exports.init = function(bot){
	pbot = bot

	// Create sticker folder if it doesn't exist
	fs.existsSync(assets) || fs.mkdirSync(assets)

	// Create the table where we will be storing this module's data
	bot.db.schema.createTableIfNotExists(_table, (table) => {
		table.increments()
		table.string('name')
		table.string('file')
	}).then(() => {
		// Lets load up the existing stickers
		bot.db.table(_table).then((rows) => {
			for (let row of rows){
				_stickers[row.name] = row.file
			}
		})
	})
	.catch((error) => { pbot.error(error) })
}

exports.run = function(msg, args) {

	_msg = msg

	if (!(args instanceof Array)) {
		if (_stickers.hasOwnProperty(args)) return this.sendSticker(args)
		return _msg.delete()
	}

	let newargs = []
	for (let i = 1; i < args.length; i++) {
		newargs.push(args[i])
	}

	// Subcommand?
	if (args[0] === 'add') return this.add(newargs)
	if (args[0] === 'del') return this.del(newargs)
	if (args[0] === 'ren') return this.ren(newargs)
	if (args[0] === 'list') return this.list()
	if (args[0] === 'migrate') return this.migrate()

	// Not a subcommand, let's see if it's a sticker
	if (_stickers.hasOwnProperty(args[0])) return this.sendSticker(args[0])

	// Ded
	_msg.delete()
}

exports.sendSticker = function(name) {

	let file = `${assets}/${_stickers[name]}`
	fs.access(file, fs.constants.R_OK, (err) => {
		if (err) return _msg.edit(`**Error:**\n${err}`)

		_msg.delete()
		let img = fs.readFileSync(file)
		return _msg.channel.send("", {files: [{attachment: img, name: _stickers[name]}]})
	})
}

exports.add = function(args) {
	if (args[0] === undefined) {
		pbot.edit(_msg, 'No name provided.')
		return
	}

	let name = args[0]

	// Is the name of the sticker already used?
	if (_stickers.hasOwnProperty(name)) {
		pbot.edit(_msg, 'Name already in use.')
		return
	}

	// Prepare the destination container
	let dest = `${assets}/${name}`
	let url = ''

	// Stupid discord renaming stuff, breaks everything
	let discordFilename = ''
	if (args[1] !== undefined) {
		url = args[1]
	} else {
		if (typeof _msg.attachments.first() !== 'undefined') {
			if ('proxyURL' in _msg.attachments.first()) {
				url = _msg.attachments.first().proxyURL
				discordFilename = _msg.attachments.first().filename
			}
		}
	}

	if (url === '') {
		// Welp, couldn't figure out a url
		pbot.edit(_msg, 'You didnt supply either a url nor attachment, or there was an error with the attachment.')
		return
	}

	// Try and gather the extension of the file
	let re = /(?:\.([^.]+))?$/
	let ext = re.exec(url)[1]

	if (discordFilename !== '') {
		ext = re.exec(discordFilename)[1]
	}

	if (ext === undefined) {
		pbot.edit(_msg, 'The file you are linking or trying to attach doesn\'t have an extension. pbot needs that thingy. pls fam')
		return
	}

	dest = `${dest}.${ext}`
	this.downloadImage(name, url, dest, ext)
}

exports.del = function(args) {
	if (args[0] === undefined) return pbot.edit(_msg, 'No name provided.')

	if (args[0] in _stickers) {
		pbot.db.table(_table)
			.where('name', args[0])
			.del()
			.then(() => {
				delete (_stickers[args[0]])
				return pbot.edit(_msg, 'The sticker was removed.', 1000)
			})
			.catch((e) => { pbot.edit(_msg, `Error: \n${e}`, 0) })
	} else {
		return pbot.edit(_msg, 'There is no sticker by that name.')
	}
}

exports.ren = function(args) {
	if (args[0] === undefined) return pbot.edit(_msg, 'No source sticker supplied.')
	if (args[1] === undefined) return pbot.edit(_msg, 'No destination sticker supplied.')

	if (args[0] in _stickers) {
		pbot.db.table(_table)
			.where('name', args[0])
			.update({ name: args[1] })
			.then(() => {
				_stickers[args[1]] = _stickers[args[0]]
				delete (_stickers[args[0]])
				return pbot.edit(_msg, 'Sticker renamed.', 1000)
			})
			.catch((e) => { pbot.edit(_msg, `Error: \n${e}`, 0) })
	} else {
		return pbot.edit(_msg, 'There is no sticker by that name.')
	}
}

exports.list = function() {
	let list = ''
	for (let sticker in _stickers) {
		if ({}.hasOwnProperty.call(_stickers, sticker)) {
			list = `${list}${sticker}, `
		}
	}

	list = list.substr(0, list.length - 2)
	return pbot.edit(_msg, `**__Stickers list__**\n\`\`\`\n${list}\n\`\`\``, 0)
}

exports.downloadImage = function(name, url, dest, ext) {
	let saveFile = require('request')
		.get(url)
		.on('error', (err) => {
			pbot.log(err)
			_msg.edit(`***Error:*** ${err}`)
		})
		.pipe(fs.createWriteStream(dest))

	saveFile.on('finish', () => {
		pbot.db.table(_table).insert({
			name: name,
			file: `${name}.${ext}`
		})
		.then(() => {
			_stickers[name] = `${name}.${ext}`
			pbot.edit(_msg, 'Sticker added', 1000)
		})
		.catch((e) => { pbot.edit(_msg, `Error: \n${e}`, 0) })
	})
}

exports.migrate = function() {
	try {
		let oldfolder = './stickers'
		let newfolder = assets

		if (!fs.existsSync(oldfolder)) return pbot.edit(_msg, 'There doesn\'t seem to be an old sticker folder')

		fs.readdir(oldfolder, (err, files) => { // eslint-disable-line
			files.forEach(file => {
				// Seems we found some files. Let's asume they are stickers :araragi:
				let name = file.slice(0, -4)

				// Is the name of the sticker already used?
				if (!_stickers.hasOwnProperty(name)) {
					copyFile(`${oldfolder}/${file}`, `${newfolder}/${file}`)

					pbot.db.table(_table).insert({
						name: name,
						file: file
					})
					.then(() => {
						_stickers[name] = file
						pbot.log(`Migrated ${file}`)
					})
					.catch((e) => pbot.error(e))
				}
			})
		})
		_msg.edit('Migration finished. Check console for logs.')
	} catch (e) {
		pbot.error(e)
	}
}

exports.stickerCount = function() {
	return Object.keys(_stickers).length
}

function copyFile(source, target) {
	var cbCalled = false

	var rd = fs.createReadStream(source)
	rd.on('error', (err) => {
		done(err)
	})
	var wr = fs.createWriteStream(target)
	wr.on('error', (err) => {
		done(err)
	})
	wr.on('close', () => {
		done()
	})
	rd.pipe(wr)

	function done(err) {
		if (!cbCalled) {
			if (err) pbot.error(err)
			cbCalled = true
		}
	}
}

