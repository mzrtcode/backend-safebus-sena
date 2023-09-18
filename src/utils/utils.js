export function obtenerFechaHoraMySQL() {
    const fechaHora = new Date(); // Obtiene la fecha y hora actual en la zona horaria local
    const fechaHoraUTC = new Date(fechaHora.getTime() - fechaHora.getTimezoneOffset() * 60000); // Convierte a UTC
  
    const formattedFechaHora = fechaHoraUTC.toISOString().slice(0, 19).replace('T', ' ');
    return formattedFechaHora;
  }