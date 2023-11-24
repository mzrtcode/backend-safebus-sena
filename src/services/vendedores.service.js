import { pool } from '../db.js'
import { enviarEmail } from '../utils/mailer.js'
import { generarClave } from '../utils/password.js'
import bcrypt from 'bcryptjs'

class VendedorService {

  async obtenerVendedores() {
    try {
      const [resultado] = await pool.query('SELECT * FROM vendedores')
      const vendedoresConEstadoBooleano = resultado.map((vendedor) => ({
        ...vendedor,
        estado: vendedor.estado === 1 ? true : false,
      }))
      return ({ data: vendedoresConEstadoBooleano })
    } catch (error) {
      console.log(error)
      throw new Error('Error al obtener las vendedores')
    }
  }
  async obtenerVendedor(id) {
    try {
      const [resultado] = await pool.query('SELECT * FROM vendedores WHERE id_vendedor = ?', [id])
      return ({ data: resultado })
    } catch (error) {
      console.log(error)
      throw new Error('Error al obtener el vendedor')
    }
  }
  async crearVendedor({
    nombres,
    apellidos,
    tipo_identificacion,
    numero_identificacion,
    correo,
    celular,
    fecha_nacimiento,
    direccion
  }) {
    const clave = generarClave();
    console.log({ correo, clave });
    const claveCifrada = await bcrypt.hash(clave, 10);

    try {
      // Verificar si el correo electrónico ya está registrado
      const [existeVendedor] = await pool.query('SELECT * FROM vendedores WHERE correo = ?', [correo]);
      const [existeAdministrador] = await pool.query('SELECT * FROM administradores WHERE correo = ?', [correo]);

      if (existeVendedor.length > 0 || existeAdministrador.length > 0) {
        return { status: 400, message: 'El correo electrónico ya está registrado' };
      }

      // Insertar el nuevo usuario
      const [resultado] = await pool.query('INSERT INTO vendedores (nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion, clave) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion, claveCifrada]);

      if (resultado.affectedRows > 0) {
        const id = resultado.insertId || null ;
        await enviarEmail(correo, clave);
     
        return { status: 201, message: 'Usuario creado', id };
      } else {
        return { status: 500, message: 'No se pudo crear el usuario', id };
      }
    } catch (error) {
      console.error('Error en el servicio:', error);
      throw new Error('Error al registrar el usuario');
    }
  }
  async actualizarVendedor(id, vendedor) {
    const { nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion, estado } = vendedor;
    try {
      const [resultado] = await pool.query(
        'UPDATE vendedores SET nombres = IFNULL(?, nombres), apellidos = IFNULL(?, apellidos), tipo_identificacion = IFNULL(?, tipo_identificacion), numero_identificacion = IFNULL(?, numero_identificacion), correo = IFNULL(?, correo), celular = IFNULL(?, celular), fecha_nacimiento = IFNULL(?, fecha_nacimiento), direccion = IFNULL(?, direccion), estado = IFNULL(?, estado) WHERE id_vendedor = ?',
        [nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion, estado, id]
      );
      if (resultado.affectedRows === 1) {
        return { status: 200, mensaje: 'Vendedor actualizado' };
      } else {
        return { status: 404, mensaje: 'Vendedor no encontrado' };
      }
    } catch (error) {
      console.error('Error en el servicio:', error);
      throw new Error('Error al actualizar el vendedor');
    }
  }

  async eliminarVendedor(id) {
    try {
      const [resultado] = await pool.query('DELETE FROM vendedores WHERE id_vendedor = ?', [id]);

      if (resultado.affectedRows === 1) {
        return { status: 204, mensaje: 'Vendedor eliminado' };
      } else {
        return { status: 404, mensaje: 'Vendedor no encontrado' };
      }
    } catch (error) {
      console.error('Error en el servicio:', error);
      throw new Error('Error al eliminar el vendedor');
    }
  }

  async resetearClave(id) {
    const clave = generarClave();
    const claveCifrada = await bcrypt.hash(clave, 10);

    try {
      let [vendedor] = await pool.query('SELECT correo FROM vendedores WHERE id_vendedor = ?', [id]);

      if (vendedor.length === 0) {
        return { status: 404, mensaje: 'Vendedor no encontrado' };
      }

      vendedor = vendedor[0];

      const [resultado] = await pool.query('UPDATE vendedores SET clave = ? WHERE id_vendedor = ?', [claveCifrada, id]);

      if (resultado.affectedRows === 1) {
        await enviarEmail(vendedor.correo, clave);
        return { status: 200, mensaje: 'Clave actualizada' };
      } else {
        return { status: 404, mensaje: 'Vendedor no encontrado' };
      }
    } catch (error) {
      console.error('Error en el servicio:', error);
      throw new Error('Error al actualizar la clave del vendedor');
    }
  }

}

export default VendedorService; 
