import Router from "express"
import { customerLogin } from "./customer/customerLogin"

const router = Router()

router.get("/customerLogin", customerLogin)

export default router
