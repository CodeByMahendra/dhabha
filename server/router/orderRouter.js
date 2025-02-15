import express from 'express'
import {  listOrders, placeOrder, updateOrders, userOrders, verifyOrder } from '../controller/orderController.js'
import isAuthenticated from '../auth/isAuthenticate.js'



const orderRouter = express.Router()

orderRouter.post("/place",isAuthenticated,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.get("/list",listOrders)


orderRouter.post("/userOrders",isAuthenticated,userOrders)
orderRouter.post("/status",updateOrders)

export default orderRouter


