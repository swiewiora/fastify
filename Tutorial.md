---
title: "Deploy a Node.js Fastify"
authors:
  - fullname: "Sebastian Wiewióra"
---

## Deploy a Node.js Fastify App

Deploy a Node.js Fastify application on Koyeb and benefit from Koyeb native autoscaling, automatic HTTPS (SSL), auto-healing, and global load-balancing across our edge network with zero configuration.

---

This guide explains how to deploy a Node.js [Fastify](https://www.fastify.io/) application on Koyeb using:

1. [Git-driven](https://www.koyeb.com/docs/deploy/fastapi#deploy-a-fast-api-app-on-koyeb-using-git-driven-deployment) deployment to automatically build and deploy a new version of your application each time a change is detected on your branch.
2. [Pre-built containers](https://www.koyeb.com/docs/deploy/fastapi#deploy-the-fast-api-app-on-koyeb-using-a-pre-built-container) you can deploy from any public or private registry.

To successfully follow this documentation, you will need to have a Koyeb account. You can optionally install the Koyeb CLI if you prefer to follow this guide without leaving the terminal.

You can deploy and preview the sample Node.js Fastify application that we will run on Koyeb in this guide using the [Deploy to Koyeb](https://www.koyeb.com/docs/deploy-to-koyeb-button) button below.

[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?type=git&repository=github.com/swiewiora/fastify&branch=main&name=fastify-on-koyeb&ports=3000;http;/)

You can access the repository used for this documentation [here](https://github.com/swiewiora/fastify).

## Create the Node.js Fastify app

Get started by creating a minimalistic Node.js Fastify application. You will need [Node.js](https://nodejs.org/) installed on your machine. In your terminal, run the following commands to create the directory that will hold the application code:
```
mkdir example-fastify
cd example-fastify
```
Koyeb detects Node.js applications when one of the following [requirements](https://www.koyeb.com/docs/apps/build-from-git#node-js) is met. In this guide, we will use `package.json` to trigger the detection.

In the folder you created, install fastify using `npm i fastify`.

Next, create a  `server.js` and copy the following Fastify application code:

```
const fastify = require('fastify')({
  logger: true
})

fastify.get('/', async (request, reply) => {
  return { message: 'Hello from Koyeb' }
})

/**
 * Run the server
 */
const start = async () => {
  fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
  })
}
start()
```

The code above defines a single route `/` that returns a JSON response with the message `Hello from Koyeb` when a GET `/` request is made.

## Run the Node.js Fastify app locally
Launch the application locally to make sure everything is running as expected.
```
node server
```
You can now test the result on `http://localhost:3000`:
```
curl http://localhost:3000
```

## Deploy the Node.js Fastify app on Koyeb using git-driven deployment

In the project directory, initialize a new git repository by running the following command:
```
git init
```
We will use this repository to version the application code and push the changes to a GitHub repository. If you don't have an existing GitHub repository to push the code to, you can create a new one and run the following commands to commit and push changes to your GitHub repository:
```
git add requirements.txt app.py
git commit -m "Initial commit"
git remote add origin git@github.com:<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
git push -u origin main
```

## Via the Koyeb control panel

To deploy the Node.js Fastify app on Koyeb, using the [control panel](https://app.koyeb.com/), click __Create App__ and follow the steps below:

1. Create a new Koyeb App named `example-fastify`
2. Select __GitHub__ as the deployment option
3. Choose the GitHub __repository__ and __branch__ contaning your application code
4. Name your service, for instance `fastify-service`
5. Click the __Deploy__ button.

A Koyeb App and Service have been created. Your application is now going to be built and deployed on Koyeb. Once the build has finished, you will be able to access your application running on Koyeb by clicking the URL ending with .koyeb.app.

## Via Koyeb CLI

To deploy the Node.js Fastify app on Koyeb using the Koyeb CLI, run the following command in your terminal:
```
koyeb app init example-fastify \
  --git github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME> \
  --git-branch main \
  --ports 3000:http \
  --routes /:3000 \
  --env PORT=3000
```
Make sure to replace `<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>` with your GitHub username and repository name.

### Access deployment logs

To track the app deployment and visualize build logs, execute the following command:

koyeb service logs example-fastify/example-fastify -t build

### Access your app

Once the deployment of your application has finished, you can retrieve the public domain to access your application by running the following command:
```
$ koyeb app get example-fastify
ID      	NAME         	DOMAINS                          	CREATED AT
55d75993	example-fastify	["example-fastify-myorg.koyeb.app"]	20 Sep 22 09:55 UTC
```
### Access runtime logs

With your app running, you can track the runtime logs by running the following command:
```
koyeb service logs example-fastify/example-fastify -t runtime
```

## Deploy the Node.JS Fastify app on Koyeb using a pre-built container

Alternatively to using git-driven deployment, you can deploy a pre-built container from any public or private registry. This can be useful if your application needs specific system dependencies or you need more control over how the build is performed.

To dockerize the Node.JS Fastify application, create a `Dockerfile` in your project root directory and copy the content below:
```
FROM node:18.15-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "node", "server" ]
```

