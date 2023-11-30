import VendedorService from "../services/vendedores.service.js"

// Instancia de la clase VendedorService
const vendedorService = new VendedorService();


export const obtenerVendedores = async (req, res) => {
  try {
    const resultado = await vendedorService.obtenerVendedores(); // Llama al método del servicio
    res.status(200).json(resultado);
  } catch (error) {
    console.error(`Ocurrió un error: ${error.message}`);
    res.status(500).json({ mensaje: 'Error al obtener las vendedores' });
  }
};

// Función que maneja la solicitud para obtener una localidad por su ID
export const obtenerVendedor = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await vendedorService.obtenerVendedor(id); // Llama al método del servicio
    res.status(200).json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al obtener el vendedor' });
  }
};


export const crearVendedor = async (req, res) => {
  try {
    const resultado = await vendedorService.crearVendedor(req.body); // Llama al método del servicio
    const { status, message, usuarioCreado } = resultado; // Agrega usuarioCreado aquí

    if (status === 201) {
      return res.status(201).json({ usuarioCreado }); // Corrige el objeto que se envía en caso de éxito
    } else if (status === 400) {
      return res.status(400).json({ message });
    } else {
      return res.status(500).json({ message });
    }
  } catch (error) {
    console.error('Error en el controlador:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};


// Función que maneja la solicitud para actualizar una localidad existente.
export const actualizarVendedor = async (req, res) => {
  const { id } = req.params;
  const vendedor = req.body;
  try {
    const resultado = await vendedorService.actualizarVendedor(id, vendedor); // Llama al método del servicio
    const { status, mensaje } = resultado;

    res.status(status).json({ mensaje });
  } catch (error) {
    console.error('Error en el controlador:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Función que maneja la solicitud para eliminar una localidad existente.
export const eliminarVendedor = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await vendedorService.eliminarVendedor(id); // Llama al método del servicio
    const { status, mensaje } = resultado;

    res.status(status).json({ mensaje });
  } catch (error) {
    console.error('Error en el controlador:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const resetearClave = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await vendedorService.resetearClave(id); // Llama al método del servicio
    const { status, mensaje } = resultado;

    res.status(status).json({ mensaje });
  } catch (error) {
    console.error('Error en el controlador:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};