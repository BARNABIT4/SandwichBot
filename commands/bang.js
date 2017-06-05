exports.run = function(msg) {
	msg.delete()
	msg.channel.send(':point_right:').then(msg => {
		setTimeout(() => {
			msg.edit(':ok_hand:').then(msg => {
				setTimeout(() => {
					msg.edit(':point_right:        :ok_hand:').then(msg => {
						setTimeout(() => {
							msg.edit(':point_right:      :ok_hand:').then(msg => {
								setTimeout(() => {
									msg.edit(':point_right:    :ok_hand:').then(msg => {
										setTimeout(() => {
											msg.edit(':point_right:  :ok_hand:').then(msg => {
												setTimeout(() => {
													msg.edit(':point_right::ok_hand:').then(msg => {
														setTimeout(() => {
															msg.edit('<:bang:319482085670912001>')
														}, 350)
													})
												}, 350)
											})
										}, 350)
									})
								}, 350)
							})
						}, 350)
					})
				}, 350)
			})
		}, 500)
	})
}