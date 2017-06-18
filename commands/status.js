let pbot
let _table = 'status'

exports.init = function(bot) {
	pbot = bot

	// Create the table where we will be storing this module's data
	pbot.db.schema.createTableIfNotExists(_table, (table) => {
		table.increments()
		table.string('status')
	}).then(() => {
		pbot.db.table(_table).then((row) => {
			if (row.length > 0) {
				// Seems like data is stored. We should apply the status now
				pbot.log(`Setting offline status to: ${row[0].status}`)
				pbot.user.setStatus(row[0].status)
				return
			}

			// Populate it
			pbot.db.table(_table).insert({ status: 'online' }).then(function() {}) // eslint-disable-line
		})
	}).catch((error) => { pbot.error(error) })
}

exports.run = function(msg, args) {
	if (args.length === 0) return pbot.edit(msg, `Your offline status is: ${msg.client.status}`)

	if (args[0] !== 'idle' && args[0] !== 'online' && args[0] !== 'dnd' && args[0] !== 'invisible') {
		return pbot.edit(msg, 'Wrong option. You need to specify idle|online|dnd|invisible')
	}

	pbot.db.table(_table).where('id', 1)
		.update({ status: args[0] })
		.then(() => {
			pbot.user.setStatus(args[0])
			return pbot.edit(msg, `Next time you are offline your status will be set to: ${args[0]}`)
		})
		.catch((error) => { pbot.error(error) })
}
