# General Purpose

The purpose of various news clients is to provide users with news updates from other sources than our website. Users have the flexibility to register for multiple services, one of which is the `news-client-discod`. This allows users to receive news updates directly within the Discord platform, enhancing their ability to stay informed through diverse channels beyond conventional web interfaces.

# How it works

The news clients receive the relevant news updates from the `news manager`. Specifically, the news client for Discord utilizes the Discord API to deliver these updates to the users. This process involves the following steps:

### News-Manager Interaction
News clients, such as `news-client-discord`, communicate with the News Manager to retrieve the latest news updates. The clients initiate this interaction by making RESTful API calls to specific routes provided by the News Manager. These REST routes serve as endpoints through which the clients request and receive the desired news content.

### [Discord API Integration](https://discord.com/developers/docs/getting-started)
In the case of `news-client-discord`, the Discord API is leveraged to seamlessly deliver the fetched news messages directly to users on the Discord platform. To facilitate this integration, the news-client-discord employs [discord.js](https://discord.js.org/docs/packages/discord.js/14.14.1), a powerful JavaScript library, to interact with the Discord API. This ensures smooth communication between the news delivery system and Discord, allowing for the timely and efficient dissemination of news updates to the targeted audience within Discord channels or direct messages.

# Setup

## Prerequisite

- Node.js Version 16
- npm Version 8

### Creating a API-Token
Before deploying the client, you need to generate an API token, which you can do here: https://discord.com/developers/applications. The instructions on what steps to take can be found here: https://discord.com/developers/docs/getting-started.
Subsequently, you must add the token to the .env file, and you can easily refer to .example.env for guidance.

## Dev-Setup

1. Clone the repo

```bash
  git@github.com:News-Center/news-client-discord.git
```

2. Install dependencies

```bash
  npm install
```

3. Setup the .env file (For a Quickstart copy the example from the `.env.example` file)
4. Start the application

```bash
  ubuntu run
  make up
```

## Production-Setup

Use `news-kraken` to deploy the entire application to a server. For more information see refer to the news-kraken
repository.

