---
title: "Deploy a Node.js Fastify"
authors:
  - fullname: "Sebastian Wiewióra"
---

## Introduction

Deploy a Node.js Fastify application on Koyeb and benefit from Koyeb native autoscaling, automatic HTTPS (SSL), auto-healing, and global load-balancing across our edge network with zero configuration.

## Requirements

This guide explains how to deploy a Node.js Fastify application on Koyeb using:

1. Git-driven deployment to automatically build and deploy a new version of your application each time a change is detected on your branch.
2. Pre-built containers you can deploy from any public or private registry.

To successfully follow this documentation, you will need to have a Koyeb account. You can optionally install the Koyeb CLI if you prefer to follow this guide without leaving the terminal.

You can deploy and preview the sample Node.js Fastify application that we will run on Koyeb in this guide using the Deploy to Koyeb button below.

## Create the Node.js Fastify app

Get started by creating a minimalistic Node.js Fastify application. You will need Node.js installed on your machine. In your terminal, run the following commands to create the directory that will hold the application code:

mkdir example-fastify
cd example-fastify

Koyeb detects Node.js applications when one of the following requirements https://www.koyeb.com/docs/apps/build-from-git#node-js is met. In this guide, we will use package.json to trigger the detection.

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

The code above defines a single route `/` that returns a JSON response with the message Hello from Koyeb when a GET / request is made.

## Run the Node.js Fastify app locally
Launch the application locally to make sure everything is running as expected.
```
node server
```
You can now test the result on `http://localhost:3000`:
```
curl http://localhost:3000
```