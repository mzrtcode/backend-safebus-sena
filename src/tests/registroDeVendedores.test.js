import '../config.js'
import { assert } from "chai";
import VendedorService from "../services/vendedores.service.js"

// Instancia de la clase VendedorService
const vendedorService = new VendedorService();

describe('Registro de vendedores', () => {
  it(' Debería registrar un vendedor con éxito', async () => {
    //Datos del vendedor a registrar
    const nuevoVendedor = {
      nombres: 'Juan',
      apellidos: 'Gómez',
      tipo_identificacion: 'C.C.',
      numero_identificacion: '99999999',
      correo: 'testregistro@test.com',
      celular: '1234567890',
      fecha_nacimiento: '1990-01-01',
      direccion: 'Calle 123, Bogotá',
    };

    //Registrar el vendedor
    const vendedorRegistrado = await vendedorService.crearVendedor(nuevoVendedor);
    const { status: statusVendedorCreado, id } = vendedorRegistrado;

    //Significa que se creo el vendedor
    assert.equal(statusVendedorCreado, 201);

    //Eliminar el vendedor creado
    const { status: statusVendedorEliminado } = await vendedorService.eliminarVendedor(id);
    assert.equal(statusVendedorEliminado, 204);


  });

}
)


describe('Edición de Vendedores', () => {
  it(' Debería editar un vendedor con éxito', async () => {
    //Datos del vendedor a registrar
    const nuevoVendedor = {
      nombres: 'Juan',
      apellidos: 'Gómez',
      tipo_identificacion: 'C.C.',
      numero_identificacion: '99999999',
      correo: 'testedicion@test.com',
      celular: '1234567890',
      fecha_nacimiento: '1990-01-01',
      direccion: 'Calle 123, Bogotá',
    };

    //Registrar el vendedor
    const vendedorRegistrado = await vendedorService.crearVendedor(nuevoVendedor);
    const { status: statusVendedorCreado, id } = vendedorRegistrado;

    //Significa que se creo el vendedor
    assert.equal(statusVendedorCreado, 201);


    //Editar el vendedor creado
    const datosVendorEditado = {
      nombres: 'Andres',
      apellidos: 'Diaz',
      tipo_identificacion: 'C.C.',
      numero_identificacion: '0256129999',
      correo: 'testedicion2@test.com',
      celular: '3159999999',
      fecha_nacimiento: '2000-01-01',
      direccion: 'Direccion Modificada',
    }
    const vendedorActualizado = await vendedorService.actualizarVendedor(id, datosVendorEditado);
    const { status: statusVendedorActualizado } = vendedorActualizado;

    //Significa que se actualizo el vendedor
    assert.equal(statusVendedorActualizado, 200);


    //Eliminar el vendedor creado
    const { status: statusVendedorEliminado } = await vendedorService.eliminarVendedor(id);
    assert.equal(statusVendedorEliminado, 204);


  })
})

describe('Eliminación de Vendedores', () => {
  it(' Debería eliminar un vendedor con éxito', async () => {
    //Datos del vendedor a registrar
    const nuevoVendedor = {
      nombres: 'Juan',
      apellidos: 'Gómez',
      tipo_identificacion: 'C.C.',
      numero_identificacion: '99999999',
      correo: 'testeliminacion@test.com',
      celular: '1234567890',
      fecha_nacimiento: '1990-01-01',
      direccion: 'Calle 123, Bogotá',
    };

    //Registrar el vendedor
    const vendedorRegistrado = await vendedorService.crearVendedor(nuevoVendedor);
    const { status: statusVendedorCreado, id } = vendedorRegistrado;

    //Significa que se creo el vendedor
    assert.equal(statusVendedorCreado, 201);

    //Eliminar el vendedor creado
    const { status: statusVendedorEliminado } = await vendedorService.eliminarVendedor(id);
    assert.equal(statusVendedorEliminado, 204);


  });

}
)


describe('Listar de Vendedores', () => {
  it(' Debería obtener todos los vendedores con éxito', async () => {

    //Datos del vendedor a registrar
    const nuevoVendedor = {
      nombres: 'Juan',
      apellidos: 'Gómez',
      tipo_identificacion: 'C.C.',
      numero_identificacion: '99999999',
      correo: 'testlistar@test.com',
      celular: '1234567890',
      fecha_nacimiento: '1990-01-01',
      direccion: 'Calle 123, Bogotá',
    };

    //Registramos para un vendedor en caso de que no existan vendedores
    const vendedorRegistrado = await vendedorService.crearVendedor(nuevoVendedor);
    const { status: statusVendedorCreado, id } = vendedorRegistrado;


    //Significa que se creo el vendedor
    assert.equal(statusVendedorCreado, 201);


    //Obtiene los registros de vendedores
    const listaVendedores = await vendedorService.obtenerVendedores();
    const { data: listaVendedoresObtenidos } = listaVendedores;

    //Significa que se obtuvieron los vendedores
    const existenVendores = listaVendedoresObtenidos.length > 0;
    assert.isBoolean(existenVendores, true);

    //Eliminar el vendedor creado
    const { status: statusVendedorEliminado } = await vendedorService.eliminarVendedor(id);
    assert.equal(statusVendedorEliminado, 204);


  });

}) 


describe('Reseteo de contraseña de Vendedores', () => {
  let vendedorId; // Variable para almacenar el ID del vendedor

  // Antes de ejecutar el test, registra un vendedor
  before(async () => {
    const nuevoVendedor = {
      nombres: 'Juan',
      apellidos: 'Gómez',
      tipo_identificacion: 'C.C.',
      numero_identificacion: '99999999',
      correo: 'testresetearclave@test.com',
      celular: '1234567890',
      fecha_nacimiento: '1990-01-01',
      direccion: 'Calle 123, Bogotá',
    };

    const vendedorRegistrado = await vendedorService.crearVendedor(nuevoVendedor);
    vendedorId = vendedorRegistrado.id;
  });

  // Después de ejecutar el test, elimina el vendedor
  after(async () => {
    const { status: statusVendedorEliminado } = await vendedorService.eliminarVendedor(vendedorId);
    assert.equal(statusVendedorEliminado, 204);
  });

  it('Debería resetear la contraseña de un vendedor con éxito', async function() {
    this.timeout(5000); // Establece el tiempo de espera en 5000 ms (5 segundos)

    // Resetea la contraseña del vendedor creado
    const { status: statusVendedorReseteado } = await vendedorService.resetearClave(vendedorId);
    assert.equal(statusVendedorReseteado, 200);

    // Aquí puedes agregar aserciones adicionales o realizar pruebas relacionadas con el reseteo
  });
});
