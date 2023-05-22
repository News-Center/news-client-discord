import { FastifyInstance } from "fastify";

import { PublishSchema, PublishType } from "../../schema/publish";

export default async function (fastify: FastifyInstance) {
    fastify.post<{ Body: PublishType }>(
        "/",
        {
            schema: {
                description: "This is an endpoint for application health check",
                tags: ["health"],
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
            const sendPromises = handle.map(userId =>
                fastify.discord.users.send(userId, "Subject: " + title + "\n\n" + content),
            );

            Promise.all(sendPromises)
                .then(() => {
                    reply.code(200).send();
                })
                .catch(error => {
                    fastify.log.error("Message was not sent - error:\n" + JSON.stringify(error));
                    reply.code(400).send();
                });
        },
    );
}
