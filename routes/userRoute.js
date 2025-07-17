import { Router } from "express";
import { fetchUserData, userLogin } from "../contollers/userController.js"

const userRoute = Router()

userRoute.post('/login', userLogin)
userRoute.get('/getData', fetchUserData)

export default userRoute