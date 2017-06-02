exports.run = function(msg) {
	msg.delete()
	msg.channel.send('<:kappa:230225501145268224>').then(msg => {
		setTimeout(() => {
			msg.edit('<:gkappa:266557522251481089>').then(msg => {
				setTimeout(() => {
					msg.edit('<:thonkappa:311896969666887683>').then(msg => {
						setTimeout(() => {
							msg.edit('<:kappa:230225501145268224>').then(msg => {
								setTimeout(() => {
									msg.edit('<:gkappa:266557522251481089>').then(msg => {
										setTimeout(() => {
											msg.edit('<:thonkappa:311896969666887683>').then(msg => {
												setTimeout(() => {
													msg.edit('<:kappa:230225501145268224>').then(msg => {
													})
												}, 400)
											})
										}, 400)
									})
								}, 400)
							})
						}, 400)
					})
				}, 400)
			})
		}, 400)
	})
}