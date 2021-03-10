import dotenv from 'dotenv'
dotenv.config()
import app from './app'

const PORT = (process.env.PORT) ? process.env.PORT : 80

app.listen(PORT, () => {
    console.log('MetaverseVM Explorer API server listening on port ' + PORT)
})
