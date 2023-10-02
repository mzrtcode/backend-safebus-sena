import app from './app.js'
import chalk from "chalk";
import boxen from "boxen";
import ip from "ip";

const myIP = ip.address();


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(boxen(chalk.green("Sirviendo!\n\n") + chalk.whiteBright("-Local: ") + chalk.white(`    http://localhost:${PORT}\n`) + chalk.whiteBright("-En tu Red: ") + chalk.white(`http://${myIP}:${PORT}\n`)
  ,{padding: 1, borderColor: 'green'}))
})
