export function obtenerFechaHoraMySQL() {
    const fechaHora = new Date(); // Obtiene la fecha y hora actual en la zona horaria local
    const fechaHoraUTC = new Date(fechaHora.getTime() - fechaHora.getTimezoneOffset() * 60000); // Convierte a UTC
  
    const formattedFechaHora = fechaHoraUTC.toISOString().slice(0, 19).replace('T', ' ');
    return formattedFechaHora;
  }

/**
 * Retorna la hora actual sumándole treinta minutos en formato timestamp para MySQL.
 * @param {Date} fecha - Objeto Date al que se le sumarán los minutos.
 * @returns {string} - String en formato timestamp para MySQL con la nueva hora.
 */
export function calcularHoraSalida(fecha) {
  // Clonar la fecha para evitar modificar la original
  const nuevaFecha = new Date(fecha);

  // Sumar 30 minutos
  nuevaFecha.setMinutes(nuevaFecha.getMinutes() + 30);

  // Obtener los componentes de la fecha
  const year = nuevaFecha.getFullYear();
  const month = String(nuevaFecha.getMonth() + 1).padStart(2, '0');
  const day = String(nuevaFecha.getDate()).padStart(2, '0');
  const hours = String(nuevaFecha.getHours()).padStart(2, '0');
  const minutes = String(nuevaFecha.getMinutes()).padStart(2, '0');
  const seconds = String(nuevaFecha.getSeconds()).padStart(2, '0');

  // Formatear la fecha como timestamp para MySQL
  const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return timestamp;
}