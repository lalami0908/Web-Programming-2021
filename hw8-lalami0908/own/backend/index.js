import { GraphQLServer, PubSub } from 'graphql-yoga'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'

require('dotenv-defaults').config()

const express = require('express')
const app = express()
const http = require('http').Server(app)

const mongoose = require('mongoose')
const Message = require('./models/message')

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}


const pubsub = new PubSub()

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) => {
  console.error(error)
})

db.once('open', () => {
  console.log('MongoDB connected!')

  const server = new GraphQLServer({
    typeDefs: './backend/schema.graphql',
    resolvers: {
      Query,
      Mutation,
      Subscription,
    },
    context: {
      db,
      pubsub,
    }
  })
  
  server.start({ port: process.env.PORT | 4000 }, () => {
    console.log(`The server is up on port ${process.env.PORT | 4000}!`)
  })
  
})


// const http = require('http')
// const server = http.createServer(app)
// const WebSocket = require('ws')
// const wss = new WebSocket.Server({ server })