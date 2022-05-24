import app from './app'
import { PORT } from './config/config'
import connection from './db/connection'

// connected to mongoDB
(async () => await connection())()

// start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
