const {WS_GUBSHUP, Text} = require("./../adathink-sdk-bot/index").WS_GUBSHUP;
const {DEFAULT_MESSAGE_USER_NO_FOUND} = require("./../config/config");
const PacientModel = require("./../models/PacientModel");
const {isJson} = require("./../libs/validation");
const AWS = require("../libs/AWS");
const AWSLex = new AWS.AWSLex();

module.exports = async function(req, res) {
  res.send("");
  const WSTools = new WS_GUBSHUP(req.body);
  if (WSTools.isMessage()) {
    if (WSTools.isTextTypeMessage()) {
      const message = WSTools.getMessage();
      const patient = await PacientModel.getUserByPhone(WSTools.getUserPhone());
      if (patient) {
        const identityDocument = patient.identity_document + "";
        const name = patient.name;
        const response = await AWSLex.sendMessage(identityDocument, message);
        const responseMessage = response.message;
        if (isJson(responseMessage)) {
          JSON.parse(responseMessage).messages.forEach((_response)=>{
            const _message = _response.value.replace("$user_name", name);
            WSTools.addResponse(new Text(_message));
          });
        } else {
          const _message = responseMessage.replace("$user_name", name);
          WSTools.addResponse(new Text(_message));
        }
      } else {
        WSTools.addResponse(new Text(DEFAULT_MESSAGE_USER_NO_FOUND));
        // Codigo agregado solo para presentacón, eliminar luego
        const identityDocument = WSTools.getUserPhone() + "";
        const name = WSTools.getUserName();
        const response = await AWSLex.sendMessage(identityDocument, message);
        const responseMessage = response.message;
        if (isJson(responseMessage)) {
          JSON.parse(responseMessage).messages.forEach((_response)=>{
            const _message = _response.value.replace("$user_name", name);
            WSTools.addResponse(new Text(_message));
          });
        } else {
          const _message = responseMessage.replace("$user_name", name);
          WSTools.addResponse(new Text(_message));
        }
        // Codigo agregado solo para presentacón, eliminar luego
      }
      WSTools.sendResponse();
    } else {
      console.log(WSTools.payload);
    }
  }
};
