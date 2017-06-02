exports.run = function(msg) {
	msg.delete()
	msg.channel.send('<:eyest:284133093487411212>').then(msg => {
		setTimeout(() => {
			msg.edit('<:eyesFlipped:285640247700750337>').then(msg => {
				setTimeout(() => {
					msg.edit('<:eyest:284133093487411212>').then(msg => {
						setTimeout(() => {
							msg.edit('<:eyesFlipped:285640247700750337>').then(msg => {
								setTimeout(() => {
									msg.edit('<:eyest:284133093487411212>').then(msg => {
										setTimeout(() => {
											msg.edit('<:eyesFlipped:285640247700750337>').then(msg => {
												setTimeout(() => {
													msg.edit('<:eyest:284133093487411212>').then(msg => {
														setTimeout(() => {
															msg.edit('<:eyesFlipped:285640247700750337>')
														}, 500)
													})
												}, 500)
											})
										}, 500)
									})
								}, 500)
							})
						}, 500)
					})
				}, 500)
			})
		}, 500)
	})
}