const { uuid } = require('uuidv4');
const Message = require('../models/message')

const Mutation = {
  createMsg: async(parent, args, { pubsub }, info) => {
    const {name,body,from} = args.data
    let createMsg = new Message({name, body, from})
    await createMsg.save( () => {
      pubsub.publish('message', {
          message: {
            mutation: 'CREATED',
            data: [createMsg]
          }
      })
    });
    console.log("createMsg")
    return createMsg
  },
  deleteMsg: async(parent, args, { pubsub }, info) => {
    let deleteMsg = await Message.find({$or: [{name: args.name}, {from: args.name}]});
    deleteMsg.forEach(msg => {
        msg.delete((err, res) => {
            if(err) {
                console.log(err)
                return ;
            }
        })
    });
    if (deleteMsg.length !== 0){
        pubsub.publish('message', {
            message: {
                mutation: 'DELETED',
                data: deleteMsg
            }
        })
    };
    console.log("deleteMsg")
    return "success";
  }
}

module.exports = Mutation
