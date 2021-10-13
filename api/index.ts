import express from "express"
import "express-async-errors"
import logger from "./logger"
import routes from "./routes"
import error from "./middlewares/error"

const app = express()

// BUILTIN MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

// CUSTOM MIDDLEWARES

// ROUTES
app.use(routes)

// ERROR MIDDLEWARE
app.use(error)

if (require.main === module) {
  const port = process.env.PORT || 5000
  app.listen(port, () => {
    logger.info(`API server listening on port: ${port}`)
  })
}

export default app
