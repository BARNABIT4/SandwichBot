let pbot
let _table = 'playing'

exports.init = function(bot) {
	pbot = bot

	// Create the table where we will be storing this module's data
	pbot.db.schema.createTableIfNotExists(_table, (table) => {
		table.increments()
		table.string('game')
	}).then(() => {
		pbot.db.table(_table).then((row) => {
			if (row.length > 0) {
				// Seems like data is stored. We should apply the status now
				pbot.log(`Setting game status to: ${row[0].game}`)
				if (row[0].game === '') return pbot.user.setGame(null)
				return pbot.user.setGame(row[0].game)
			}

			// Populate it
			pbot.db.table(_table)
				.insert({ game: '' })
				.then(function() {}) // eslint-disable-line
		})
	}).catch((error) => { pbot.error(error) })
}

exports.run = function(msg, args) {
	if (args.length === 0) {
		pbot.user.setGame(null)
		this.save('', msg)
		return
	}

	let text = args.join(' ')
	pbot.user.setGame(text)
	this.save(text, msg)
}

exports.save = function(value, msg) {
	pbot.db.table(_table).where('id', 1)
		.update({ game: value })
		.then(() => {
			if (value === '') return pbot.edit(msg, 'You succesfully removed your playing status.')
			return pbot.edit(msg, 'Succesfully changed your playing status.')
		})
		.catch((error) => { pbot.error(error) })
}
