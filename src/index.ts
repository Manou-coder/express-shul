import { app as server } from './server'
import dotenv from 'dotenv'
import morgan from 'morgan'

dotenv.config()
const port = process.env.PORT || 3000

server.use(morgan('tiny'))

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
