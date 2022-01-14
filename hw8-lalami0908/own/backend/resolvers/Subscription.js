const Message = require('../models/message')
const { withFilter } = require('graphql-subscriptions')

const Subscription = {
  message: {
    subscribe: withFilter(
	    (parent, args, { pubsub }, info) => pubsub.asyncIterator('message'),
	    (payload, variables) => {
	    	console.log("subscribe");
	    	return payload.message.data[0].name === variables.name || payload.message.data[0].from === variables.name;
	    },
	  ),
  }
}

module.exports = Subscription
