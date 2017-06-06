exports.run = function(msg) {
	msg.delete()
	msg.channel.send('<:blobsleepless:300750368688832513>').then(msg => {
		setTimeout(() => {
			msg.edit('<:blobthinkingeyes:318150868237287424>').then(msg => {
				setTimeout(() => {
					msg.edit('<:blobidea:306819676367880192>').then(msg => {
						setTimeout(() => {
							msg.edit('<:noose:316556849904353280>').then(msg => {
								setTimeout(() => {
									msg.edit('<:blobnogood:286053872512794626>').then(msg => {
										setTimeout(() => {
											msg.edit('<:blobthinkingeyes:318150868237287424>').then(msg => {
												setTimeout(() => {
													msg.edit('<:blobidea:306819676367880192>').then(msg => {
														setTimeout(() => {
															msg.edit('<:googlegun:288820003157966868>').then(msg => {
																setTimeout(() => {
																	msg.edit(':ok_hand:').then(msg => {
																		setTimeout(() => {
																			msg.edit('<:helpers:309529398938435586>').then(msg => {
																				setTimeout(() => {
																					msg.edit('<:blobdead:305014615698571265>')
																				}, 900)
																			})			
																		}, 900)
																	})	
																}, 900)
															})	
														}, 900)
													})
												}, 900)
											})
										}, 900)
									})
								}, 900)
							})
						}, 900)
					})
				}, 900)
			})
		}, 900)
	})
}