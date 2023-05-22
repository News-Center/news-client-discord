import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { Client, Events, GatewayIntentBits, IntentsBitField } from "discord.js";
import "dotenv/config";
import { Config } from "../config";

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module "fastify" {
    interface FastifyInstance {
        discord: Client;
    }
}

const discordPlugin: FastifyPluginAsync = fp(async server => {
    const disocrd = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.DirectMessages,
            IntentsBitField.Flags.DirectMessages,
        ],
    });

    disocrd.once(Events.ClientReady, c => {
        server.log.info(`Ready! Logged in as ${c.user.tag}`);
    });

    disocrd.on(Events.GuildMemberAdd, async member => {
        await member.send("Welcome to the server! Enjoy your stay.");
        await member.send("Please Enter the following Id in the Website Description Field: " + member.id);
    });
    disocrd.login(Config.token);

    // Make Discord Client available through the fastify server instance: server.discord
    server.decorate("discord", disocrd);
});
export default discordPlugin;
