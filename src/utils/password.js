export function generarClave () {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let contraseña = ''
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * caracteres.length)
    contraseña += caracteres.charAt(randomIndex)
  }
  return contraseña
}
