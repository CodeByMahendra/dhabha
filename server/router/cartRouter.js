import express from 'express'
import { addToCart, getCart, removeFromCart } from '../controller/cartController.js'
import isAuthenticated from '../auth/isAuthenticate.js'

const cartRouter = express.Router()

cartRouter.post("/add",isAuthenticated, addToCart)
cartRouter.post('/remove',isAuthenticated,removeFromCart)
cartRouter.get('/get',isAuthenticated,getCart)
  

export default cartRouter
