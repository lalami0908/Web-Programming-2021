const Message = require('../models/message')

const Mutation = {
   
    createMsg: async (parent, args, { context, pubsub}, info) =>  {
        const { name, body } = args.data
        var newMsg = new Message({name, body});
        await newMsg.save(function (err) {
            if (err) return err;
            pubsub.publish('message', {
                message: {
                  mutation: 'CREATED',
                  data: [newMsg]
                }
            })
        });
       
        return newMsg;
    },

 
    deleteMsgByName: async(parent, args, { context, pubsub }, info)  =>  {

        var deleteMsg = await Message.find({name: args.deleteName  }, function (err, res) {
            if(err) {
                console.log(err);
                return ;
            }      
        });
        deleteMsg.forEach(msg => {
            msg.delete(function (err, res) {
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
        return deleteMsg;
 
    },

    deleteAllMsg: async(parent, args, { context, pubsub }, info)  =>  {   
        var deleteMsg = await Message.find({ }, function (err, res) {
            if(err) {
                console.log(err);
                return ;
            }      
        });
        deleteMsg.forEach(msg => {
            msg.delete(function (err, res) {
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
        return deleteMsg;
    }
}

export { Mutation as default }