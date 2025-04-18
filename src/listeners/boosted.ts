import { Listener } from '@sapphire/framework';
import type { GuildMember } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import { container } from '@sapphire/framework';

export class BoostedListener extends Listener {
    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
        ...options,
        once: false,
        event: 'guildMemberUpdate'
        });

        console.log('BoostedListener loaded!');
    }

    public async run(oldMember: GuildMember, newMember: GuildMember) {
        const guild = newMember.guild;

        if (!oldMember.premiumSince) {
            oldMember = await guild.members.fetch(oldMember.id);
        }

        console.log(oldMember.premiumSince, newMember.premiumSince);

        if ((oldMember.premiumSince == null) && (newMember.premiumSince != null)) {
            console.log('User has boosted the server!');

            const boostEmbed = new EmbedBuilder()
                .setColor(0xf47fff)
                .setTitle(`${newMember.displayName} has boosted the server!`)
                .setDescription('Thank you for boosting the server!')
                .setImage('https://soli.zakottewell.co.uk/assets/img/boost.png')

            const guild = await container.client.guilds.fetch('1318773616187412521');
            const channel = await guild?.channels.fetch('1319183125086998558');

            channel?.isSendable() && channel.send({ embeds: [boostEmbed] });
        }
    }  
}
