import dotenv from 'dotenv';
dotenv.config(); // Ensure environment variables are loaded
import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);





export const userOrders = async (req, res) => {
  try {
    const userId = req.body.userId;

    // Log the userId to ensure it's being received correctly
    console.log("Received userId:", userId);

    // Fetch orders from the database
    const orders = await Order.find({ userId });

    // Log the orders to check if any orders were fetched
    console.log("Orders:", orders);

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found for this user" });
    }

    // Send orders in response
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching user orders:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const placeOrder = async (req, res) => {
    
    const frontend_url = "http://localhost:5173";

    try {
        // Use req.id to get the authenticated user's ID from the JWT token
        const newOrder = new Order({
            userId: req.id, // Use the userId from the token
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();

        // Update the user data with empty cart
        await User.findByIdAndUpdate(req.id, { cartData: {} });

        // Prepare line items for the Stripe checkout
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 // Convert INR to paise
            },
            quantity: item.quantity
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        });

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error in placeOrder:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const verifyOrder = async(req,res)=>{

    const {orderId,success}=req.body;
    try {
        if(success=="true"){
            await Order.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"Paid"})
        }
        else{
            await Order.findOneAndDelete(orderId)
            res.json({success:false,message:" Not Paid"})

        }
    } catch (error) {

        res.json({success:false,message:error})
        
    }

}



  
export const listOrders = async(req,res)=>{
  try {
    const orders = await Order.find({})
    res.json({success:true,data:orders})
  } catch (error) {
    res.json({success:false,message:"error"})
    console.log("error")
  }


}


export const updateOrders = async (req,res)=>{
    try {
        await Order.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status updated"})
    } catch (error) {

        console.log(error)
        res.json({success:false,message:"Errro"})

        
    }
}
