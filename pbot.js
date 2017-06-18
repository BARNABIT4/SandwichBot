const fs = require('fs')
const path = require('path')

if (!fs.existsSync(path.join(__dirname, 'config.json'))) {
	console.log('config.json file not found, please run pbot-cli or create it on your own')
	process.exit()
}

const config = require('./config.json')
const Discord = require('discord.js')
const chalk = require('chalk')
const knex = require('knex')({
	client: 'sqlite3',
	connection: { filename: path.join(__dirname, 'db') },
	useNullAsDefault: true
})

let filesDirectory = path.join(__dirname, 'files')
fs.existsSync(filesDirectory) || fs.mkdirSync(filesDirectory)

// Initializing the ultimate tan
const pbot = new Discord.Client()

// When ready
pbot.on('ready', () => {
	// Create database if it doesn't exist
	fs.exists('db', (exists) => exists || fs.writeFile('db', ''))

	// Getting the database ready
	pbot.db = knex

	// Making config available on every module
	pbot.config = config
	pbot.loadCommands()
	pbot.user.setAFK(true)
	pbot.log('pbot is ready!', 'green')
})

pbot.on('message', (msg) => {
	// Ignore if the message is not ours
	if (msg.author.id !== pbot.user.id) return

	// Ignore if the message doesn't start with our prefix
	if (!msg.content.startsWith(config.prefix)) return

	// Ignore if empty command
	if (msg.content.length === config.prefix.length) return

	// Get all the arguments
	let tmp = msg.content.substring(config.prefix.length, msg.length).split(' ')
	let args = []

	for (let i = 1; i < tmp.length; i++) {
		args.push(tmp[i])
	}

	// Store the command separately
	let cmd = tmp[0]

	if (pbot.modules.hasOwnProperty(cmd)) return pbot.modules[cmd].run(msg, args)
	if (config.commandError.sendToModule === true) {
		return pbot.modules[config.commandError.module][config.commandError.function](msg, cmd)
	}

	return msg.delete()
})

pbot.on('disconnect', () => {
	pbot.error('CLIENT: Disconnected!')
	process.exit()
})

pbot.on('reconnecting', () => { pbot.log('CLIENT: Reconnecting...', 'green') })

pbot.loadCommands = function() {
	pbot.modules = {}

	// Load up all the modules
	fs.readdirSync('./commands/').forEach((file) => {
		let name = file.slice(0, -3)

		delete require.cache[require.resolve(`./commands/${file}`)]

		try {
			pbot.modules[name] = require(`./commands/${file}`)
			if (pbot.modules[name].hasOwnProperty('init')) {
				pbot.modules[name].init(pbot)
			}

			pbot.log(`Module ${name} is ready`)
		} catch (e) {
			pbot.error(`Error in module ${name}:\n${e.stack}`)
		}
	})
}

pbot.edit = function(msg, content, timeout = 3000) {
	if (timeout === 0) return msg.edit(content).catch(console.error)

	return msg.edit(content).then(() => {
		setTimeout(() => msg.delete().catch(console.error), timeout)
	})
}

pbot.log = function(msg, color) {
	if (color === undefined) console.log(`[pbot]: ${msg}`)
	else console.log(chalk[color](`[pbot]: ${msg}`))
}

pbot.error = function(msg) {
	console.log(chalk.red(`[pbot]: ${msg}`))
}

pbot.log('Starting...', 'green')
pbot.login(config.token)

process.on('unhandledRejection', err => {
	pbot.error(`Uncaught Promise Error:\n${err.stack}`)
})
