const db = require("./Connection");

/**
 * @typedef {Object} Pacient
 * @property {String} name - Nombre del paciente
 * @property {String} last_name - Apellido del paciente
 * @property {Date} birthdate - Fecha de nacimiento del paciente.
 * @property {String} email - Correo electronico del paciente.
 * @property {String} phone - Número de celular del paciente.
 * @property {Date} create_at - Fecha de creación del paciente.
 * @property {Date} update_at - Fecha de ultima actualización del paciente.
 * @property {String} address - Dirección fisica del paciente del paciente.
 * @property {Float} latitud - Latitud de la ubicación del paciente.
 * @property {Float} longitud - Longitud de la ubicación del paciente.
 * @property {String} url_pdf_register - Url S3 de la firma de concentimiento.
 * @property {Boolean} is_active - ¿El paciente esta activo?
 */

/**
 * Esta clase manejara el mantenimiento de un usuario.
 * @class
 */
class PacientModel {
  /**
   * @constructor
   */
  constructor() {
  }

  /**
   * @function
   * @param {String} phone El número de celular del usuario.
   * @return {Pacient} Objeto con los datos de un usuario y Null si no existe.
   */
  static async getUserByPhone(phone) {
    const query = "select * from dm_pacient where phone = $1";
    const params = [phone];
    const result = await db.query(query, params);
    if (result.rowCount > 0) {
      return result.rows[0];
    }
    return null;
  }
}

module.exports = PacientModel;
