const { Router } = require('express');
const { messageController } = require('../controllers');

const messageRouter = Router();

messageRouter.get('/', messageController.getMessages);

messageRouter.put('/:messageId', messageController.updateMessage);

messageRouter.delete('/:messageId', messageController.deleteMessage);

module.exports = messageRouter;
