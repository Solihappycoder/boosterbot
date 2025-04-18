import express from 'express';

const app = express();

import { configDotenv } from 'dotenv';
configDotenv();

import router from './routes';
import { LogLevel, SapphireClient, container } from '@sapphire/framework';
import { GatewayIntentBits, Partials } from 'discord.js'

container.client = new SapphireClient({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers ],
    loadMessageCommandListeners: true,
    partials: [ Partials.GuildMember ],
    logger: {
        level: LogLevel.Debug
    }
});

app
    .use(router)
    .listen(process.env.API_PORT, () => {
        container.client.login(process.env.DISCORD_BOT_TOKEN)
        .then(() => {
            container.logger.info('Gateway: Login Connected, beginning bot startup process.');
            console.log(container.client.listeners('guildMemberUpdate'));

        })
        .catch((e) => {
            container.logger.fatal(e);
            process.exit();
        });
    })

