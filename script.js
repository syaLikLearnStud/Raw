const Discord = require('discord.js'),
    { Client } = require('discord.js'),
    { translate } = require("google-translate-api-browser"),
    config = require('./node.json'),
    token = config.token,
    prefix = config.prefix,
    client = new Client();

client.on('ready', () => {
    console.log('Running!');
    client.user.setActivity('all Prefix and Commands', { type: "ANY"}).catch(console.error) // LISTENING, WATCHING, STREAMING, PLAYING
});

client.on('message', message => {
    var args = message.content.slice(prefix.length).trim().split(' ');
    var cmd = args.shift().toLowerCase();
    switch (cmd) {
        case 'help':
            message.reply("[Help] Commands Avaiable: ``translate [help], langs [help], help, ping, about, ban, mute``");
            break;
        case 'translate':
            if (!args[0] || args[0] == 'help') return message.reply('[Help] Usage: **' + prefix + 'translate [LanguageToGo] [Sentence]**')
            let to = 'en';
            let toL = 'English';
            let sentence = message.content.split(" ").slice(prefix.length).join(" ");
            for (i = 0; i < Object.keys(langs).length; i++) {
                if (Object.keys(langs)[i] == args[0]) {
                    to = args[0];
                    toL = langs[Object.keys(langs)[i]];
                    sentence = message.content.split(" ").slice(prefix.length + 1).join(" ");
                }
            }
            translate(sentence, {
                to: to
            }).then(res => {
                //res.from.language.iso
                from = langs[res.from.language.iso];
                const embed = new Discord.RichEmbed()
                    .setColor('#0099ff')
                    .setAuthor('ForTuneInt Translator', 'https://cdn.discordapp.com/attachments/781180265129050132/820521954124627978/ba848da92768204f75906e49aa50bec0.png')
                    .setDescription('Here ya go lol')
                    .setThumbnail('https://cdn.discordapp.com/attachments/781180265129050132/820545292595494912/p7jnsOVy_400x400.png')
                    .addField('» Uhh only a plain translator bot lol', '» Original Text: **' + sentence + '**\n\n» From: **' + from + '**\n» To: **' + toL + '**\n» Result - **' + res.text + '**', false)
                    .setTimestamp()
                    .setFooter('Coded by EROR, Hosted in: Heroku', 'https://cdn.discordapp.com/avatars/391670479003451392/4f2f66ceaff4736662d3b94e6c70743a.jpg?size=2048');

                message.channel.send(embed);
            }).catch(err => {
                throw err;
            });
            break;
        case 'langs':
            if (args[0] == 'help') return message.reply('[Help] Usage: **' + prefix + 'langs [Page]**')
            let page = 1;
            if (!isNaN(args[0])) return message.reply('the page should be a number!');
            if (args[0]) page = args[0];
            let mathF = Math.floor(Object.keys(langs).length / 10)
            let mathC = Math.ceil(Object.keys(langs).length / 10);
            let total = Object.keys(langs).length;
            let list = [];
            if (args[0] >= mathC) args[0] = mathC;
            for (i = (mathF * page) - 10; i < (mathF * page); i++) {
                if (Object.keys(langs)[i]) list.push("\n[" + (i + 1) + "] » " + langs[Object.keys(langs)[i]] + ' - ' + Object.keys(langs)[i]);
            }
            var footer = ("Page: " + page + "/" + mathC + " > Languages: " + total)
            let msg = ("```js\n" + "Position | Name\n\n" + list + "\n\n" + footer + "```");
            message.channel.send(msg);
            break;
            case 'about':
                if(args[0] = 'about');
                const newEmbed = new Discord.RichEmbed()
                .setColor('#2b32e0')
                .setThumbnail('Input your png link here')
                .setDescription('Anything you want')
                .setTimestamp()
                .setFooter(`Requested By: ${message.author.username}`) // You can edit this
                message.channel.send(newEmbed)
                break;

            case 'ping':
                if(args[0] = 'ping');
            const secEmbed = new Discord.RichEmbed()
            .setColor('')
            .setAuthor(`🏓Your Ping Latency is ${Date.now() - message.createdTimestamp}ms. Your API Ping Latency is ${Math.round(client.ws.ping)}ms`)
            .setTimestamp()
            .setFooter(`Ping is Requested by: ${message.author.username}`)
            message.channel.send(secEmbed)
            break;

            case 'ban':
                if(args[0] = 'ban');
                const { member, mentions } = message
                
                const tag = `<@${member.id}>`
    
                if(
                member.hasPermission('ADMINISTRATOR') ||
                member.hasPermission('BAN_MEMBERS')
                ){
                    const target = mentions.users.first()
                    if(target){
                        const targetMember = message.guild.members.cache.get(target.id)
                        targetMember.ban()
                        message.channel.send(`Targetted user has been banned. or I cannot ban them because they're higher than me`)
                    } else{
                        message.channel.send(`${message.author.username} please specify someone to ban`)
                    }
                }else{
                    message.channel.send(`${message.author.username}, you do not have permission to use this command`)
                }
                break;

                case 'mute':
                    if(args[0] = 'mute');
                    const mutedRole = message.guild.roles.cache.find(
                        (role) => role.name === 'Muted'
                       );


                       if (!mutedRole)
 return message.channel.send('There is no Muted role on this server');
 const user = message.mentions.users.first();
 const memb = message.guild.member(user);

 const target = message.mentions.members.first();

 if(memb.hasPermission('ADMINISTRATOR') || memb.hasPermission('MUTE_MEMBERS')){
    targets.roles.add(mutedRole);
    message.channel.send('Successfully Muted target')
 }else{
     message.channel.send(`${message.author.username} You do not has permission to mute members`)
 }
        break;
                    
    }
})


client.login(token); // This Token is from node.json (or any json you has)
