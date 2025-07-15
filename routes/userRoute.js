import { Router } from "express";
import { userLogin } from "../contollers/userController.js"

const userRoute = Router()

userRoute.post('/login', userLogin)

export default userRoute