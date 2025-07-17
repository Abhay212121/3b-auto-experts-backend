import { Router } from "express";
import { getHomeData } from "../contollers/homeController.js";

const homeRoute = Router()

homeRoute.get('/', getHomeData)

export default homeRoute