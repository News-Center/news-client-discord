import { FastifyInstance } from "fastify";

import { PublishSchema, PublishType } from "../../schema/publish";

export default async function (fastify: FastifyInstance) {
    fastify.post<{ Body: PublishType }>(
        "/",
        {
            schema: {
                description: "This is an endpoint for receiving publish news",
                tags: ["publish"],
                response: {
                    200: {
                        description: "Success Response",
                        ...PublishSchema,
                    },
                },
            },
        },
        (request, reply) => {
            const { handle, content, title } = request.body;

            const sendPromises = [handle].map(
                userId =>
                    fastify.discord.users
                        .send(userId, "Subject: " + title + "\n\n" + content)
                        .then(() => userId) // Resolve with the user ID if sending is successful
                        .catch(() => undefined), // Resolve with undefined if there's an error
            );

            Promise.all(sendPromises)
                .then(results => {
                    const successfulUserIds = results.filter(userId => userId !== undefined);
                    reply.code(200).send(JSON.stringify(successfulUserIds));
                })
                .catch(error => {
                    fastify.log.error("Message sending failed - error:\n" + JSON.stringify(error));
                    reply.code(400).send();
                    throw error;
                });
        },
    );
}
