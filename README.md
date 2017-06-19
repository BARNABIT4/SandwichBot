[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/pbanj/SandwichBot/master/LICENSE)

![heeeey](http://i.imgur.com/0tPwgV7.gif)



### My own custom fork of [Kuro bot](https://github.com/Pitu/Kuro). It has custom commands, and the old way of doing stickers as I'm not a fan of the new way. this is more for my own personal use but feel free to use it if you want. 

an easy to use self bot that is shifting more and more into a framework while preserving its ease of use. It sits on top of [discord.js](https://github.com/hydrabolt/discord.js/).
NodeJS version 6+ is ***REQUIRED***. [Installing Node.js](https://nodejs.org/en/download/package-manager/)

[> Check this video to see how it works!](https://my.mixtape.moe/pwcrem.webm)


## Installing:
clone the repo, `npm install` inside your `SandwichBot` folder, rename the `config.sample.json` to `config.json` and modify it's values with your data.


## Running:
type in `node pbot.js`


## Modules:
This new update brings every command in the form of separate modules. Inside each module you can make up the stuff you want, and you can execute it by calling the module name without the extension. There's a sample module ready for you to duplicate called `base.js`.

Example of a simple module with no dependencies that returns the server's member count on which you send the command:
```javascript
exports.run = function(msg, args) {
  msg.delete()
  msg.channel.send('', {
    'embed': {
      'title': msg.guild.name,
      'description': `Member Count: ${msg.guild.memberCount}`,
      'color': 15473237
    }
  })
}
```

Pretty easy stuff.
If you want me to include a module you've made, send a PR with your stuff and I'll look at it.

## Bundled modules

Each module has detailed instructions inside their own files. Take a look at them for further details on how to use. there is also some i have added that are 3DS specific, they just output text. all of the emote"gif" commands require nitro and/or being in my servers. the kappa command also requires you to be in [Thonk-Collection](https://discord.gg/DBK2sAK)

- `emote [emote]`
  Shows information about a custom emote.

- `flip <this is amazing>`
  sllɐqǝzɐɯɐ sı sıɥʇ

- `lmgt <some stupid question>`
  Creates a link to let me Google with your query when someone asks stupid questions, includes the internet explainer.

- `members`
  Shows the server's member count.

- `ping`
  Simple tool to check delay between your bot and Discord.

- `playing [message]`
  Change your `playing` status on Discord to the specified string. (Note you wont be able to see it due to a Discord limitation).

- `purge [number of messages]`
  Grabs the supplied amount of messages from chat and deletes those that are yours.

- `reboot`
  Reboots SandwichBot. (Only works if using [pm2](http://pm2.keymetrics.io/docs/usage/quick-start/#installation)).

- `reload`
  Reloads all the modules (Useful when developing).

- `react [message]`
  React to the last message with regional characters. a-z 0-9, no spaces.

- `regional [message]`
  Sends a message using regional character emojis.

- `s [name] | [add|del|ren]`
  A module to manage stickers like Telegram does. Upload a sticker with a given name, and then make SandwichBot paste it when you trigger the command.

- `stats`
  Displays an embed with statistics.

- `status [online|idle|dnd|offline]`
  The status you want to appear as whenever you're offline, since using SandwichBot will make discord think you're always online.

- `tag [name] | [add|del|ren]`
  Saves the given text into a tag for later usage. For example `tag add SandwichBot https://github.com/pbanj/SandwichBot` would print `https://github.com/pbanj/SandwichBot` every time You do `tag SandwichBot`

- `uptime`
  Displays how long the bot has been running.

- `user <@user>`
  Displays information about the tagged user
  
  
These are modules that edit a message to add the effect of animated emotes. You probably should update the emoji's name/id if you're not in my servers or the other needed servers.  
  
- `bang`


![bang](http://i.imgur.com/OAv0c7R.gif)


- `kappa`


![kappa](http://i.imgur.com/pZc4GXm.gif) 


- `eyes`


![eyes](http://i.imgur.com/UdzsAp6.gif)


- `kms`

![kms](http://i.imgur.com/wDsecRj.gif)