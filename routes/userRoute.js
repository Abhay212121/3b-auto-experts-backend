import { Router } from "express";
import { getUserData } from "../contollers/userController.js"

const userRoute = Router()

userRoute.post('/', getUserData)

export default userRoute