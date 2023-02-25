import { messagesModel } from "../models/messages.model.js";

class MsgsManager {
  async getMsgs() {
    try {
      const getAll = await messagesModel.find();
      return getAll;
    } catch (err) {
      console.log(err);
    }
  }

  async sendMsg(msg) {
    try {
      const send = await messagesModel.create(msg);
      return send;
    } catch (err) {
      console.log(err);
    }
  }
}

export default MsgsManager;
