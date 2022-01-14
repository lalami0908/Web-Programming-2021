
const Message = require('../models/message')

const Query = {
    getMessages: ()=> Message.find(),
    getMessageByName: async (_,{queryName}) => {
        var result = await Message.find({"name": queryName});
        return result;
    },
    getMessageByBody: async (_,{queryBody}) => {
        var result = await Message.find({"body": queryBody});
        return result;
    },
}
export { Query as default }