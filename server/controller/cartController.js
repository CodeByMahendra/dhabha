import User from "../model/userModel.js";


export const addToCart = async (req, res) => {
  try {

    console.log("Request Body:", req.body.itemId);


    if (!req.body || !req.body.itemId) {
      return res.status(400).json({ success: false, message: "Item ID is missing" });
    }

    console.log("req.id in addToCart:", req.id); 
    const userData = await User.findOne({ _id: req.id });

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Initialize or fetch the user's cart data
    let cartData = userData.cartData || {};

    // Get the item ID from the request body
    const itemId = req.body.itemId;
    console.log("Item ID:", itemId); // Debugging itemId

    // Update cart data
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    // Save updated cart data
    const updatedUser = await User.findByIdAndUpdate(req.id, { cartData }, { new: true });
    console.log("Updated User:", updatedUser); // Debugging updated user data

    res.json({ success: true, message: "Added to cart", cartData });
  } catch (error) {
    console.error("Error in addToCart:", error); // Log error
    res.json({ success: false, message: "An error occurred", error: error.message });
  }
};


export const getCart = async (req, res) => {
    try {
      // Fetch user data
      const userData = await User.findById(req.id);
  
      if (!userData) {
        return res.json({ success: false, message: "User not found" });
      }
  
      // Retrieve cartData
      const cartData = userData.cartData || {};
  
      res.json({ success: true, cartData, message: "All data retrieved successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.json({ success: false, message: "Error occurred", error });
    }
  };


  export const removeFromCart = async (req, res) => {
    try {
      // Fetch user data
      const userData = await User.findById({_id:req.id});
      console.log("User Data:", userData);
  
      if (!userData) {
        return res.json({ success: false, message: "User not found" });
      }
  
      // Ensure cartData is initialized
      let cartData = userData.cartData || {};
  
      // Get itemId from the request body
      const itemId = req.body.itemId;

      console.log("Item id=" , itemId)

      if (!itemId) {
        return res.json({ success: false, message: "Item ID is missing" });
      }
  
      // Decrement the quantity or remove the item
      if (cartData[itemId] > 0) {
        cartData[itemId] -= 1;
  
        // Optionally, remove the item if the quantity reaches 0
        if (cartData[itemId] === 0) {
          delete cartData[itemId];
        }
      } else {
        return res.json({ success: false, message: "Item not found in cart" });
      }
  
      // Save updated cartData
      await User.findByIdAndUpdate(req.id, { $set: { cartData } });
  
      res.json({ success: true, message: "Removed from cart", cartData });
    } catch (error) {
      console.error("Error:", error);
      res.json({ success: false, message: "Error occurred", error });
    }
  };