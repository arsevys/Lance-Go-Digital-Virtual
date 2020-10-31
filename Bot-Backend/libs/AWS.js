/**
 * Esta archivo funciona como un manejador de las apis de AWS LEX.
 * Links de donde se tomo la información:
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/LexRuntime.html
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/LexRuntime.html#getSession-property
 */

const {BOT_ALIAS, BOT_NAME, AWS_REGION} = require("../config/config");
const awsLex = require("aws-sdk");

/**
 * Crea un conexión con el servicio LEX de AWS
 * @class
 */
class AWSLex {
  /**
   * @constructor
   */
  constructor() {
    this.Lex = new awsLex.LexRuntime({
      apiVersion: "2016-11-28",
      region: AWS_REGION});
    this.botAlias = BOT_ALIAS;
    this.botName = BOT_NAME;
  }

  /**
   * Función para enviar mensaje a Flex.
   * @function
   * @param {String} idUser Id del usuario(Con este ID sabremos su Sesión).
   * @param {String} message Texto que se enviara a Lex.
   * @return {String} Devolvemos el mensaje de respuesta de Lex.
   */
  async sendMessage(idUser, message) {
    let sessionId = await this.__getSession(idUser).catch(console.error);
    if (sessionId == null) {
      sessionId = await this.__createSession(idUser).catch(console.error);
    }
    const responses = await this.__sendText(idUser, message);
    return responses;
  }
  /**
   * Función para enviar un mensaje a Flex con la sesión de un usuario.
   * @function
   * @param {String} idUser Id del usuario(Con este ID sabremos su Sesión).
   * @param {String} message Mensaje que se enviara a Lex.
   * @return {Promise} Esta promeja devuelve las respuestas.
   */
  __sendText(idUser, message) {
    return new Promise((resolve, reject)=>{
      const params = {
        botAlias: this.botAlias,
        botName: this.botName,
        inputText: message,
        userId: idUser,
      };
      this.Lex.postText(params, (err, data)=>{
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }
  /**
   * Función para crear la sesión de flex de un usuario.
   * @function
   * @param {String} idUser Id del usuario(Con este ID sabremos su Sesión).
   * @return {Promise} Esta promeja devuelve la sessión.
   */
  __createSession(idUser) {
    return new Promise((resolve, reject)=>{
      const params = {
        botAlias: this.botAlias,
        botName: this.botName,
        userId: idUser,
      };
      this.Lex.putSession(params, (err, data)=>{
        if (err) {
          return reject(err);
        }
        return resolve(data.sessionId);
      });
    });
  }

  /**
   * Función para obtener la sesión de flex de un usuario.
   * @function
   * @param {String} idUser Id del usuario(Con este ID sabremos su Sesión).
   * @return {Promise} Esta promeja devuelve la sessión.
   */
  __getSession(idUser) {
    return new Promise((resolve, reject)=>{
      const params = {
        botAlias: this.botAlias,
        botName: this.botName,
        userId: idUser,
      };
      this.Lex.getSession(params, (err, data)=>{
        if (err) {
          return reject(err);
        }
        return resolve(data.sessionId);
      });
    });
  }
}

module.exports = {AWSLex};
