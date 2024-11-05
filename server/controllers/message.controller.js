const { Message } = require('./../models');

module.exports.getMessages = async (req, res, next) => {
  const { limit = 20 } = req.query;

  try {
    const foundMessages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit));
    res.status(200).send({ data: foundMessages });
  } catch (err) {
    console.log('err :>> ', err);
    next(err);
  }
};

module.exports.updateMessage = async (req, res, next) => {
  const { messageId } = req.params;
  const { body } = req.body;

  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { body },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).send({ message: 'Message not found' });
    }

    res.status(200).send({ data: updatedMessage });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteMessage = async (req, res, next) => {
  const { messageId } = req.params;

  try {
    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res.status(404).send({ message: 'Message not found' });
    }

    res.status(200).send({ message: 'Message deleted successfully' });
  } catch (err) {
    next(err);
  }
};
