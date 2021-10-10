import express from "express"
import routes from "./routes"
import logger from "./middlewares/logger"

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Call middleware
app.use(logger)

// Call routes
app.use(routes)

if (require.main === module) {
  const port = process.env.PORT || 5000
  app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`API server listening on port: ${port}`)
  })
}

export default app
