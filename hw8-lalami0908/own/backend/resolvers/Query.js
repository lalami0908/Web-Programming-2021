const Message = require('../models/message')

const Query = {
  showAllMsg: () => Message.find(),
  getMsgByName: async(parent, args, { pubsub }, info) => {
    let resp = await Message.find({$or: [{name: args.name}, {from: args.name}]})
    console.log("getMsgByName")
    return resp
  }
}

module.exports = Query
