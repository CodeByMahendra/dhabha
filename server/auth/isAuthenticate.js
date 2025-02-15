import jwt from "jsonwebtoken";


const isAuthenticated = (req, res, next) => {
  try {
    let token = req.headers.token || req.headers.authorization?.split(" ")[1];


    console.log("Received token:", token);  

    if (!token) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded.userId;
    next();

  } catch (error) {
    console.error("Authentication error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please log in again." });
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
};


export default isAuthenticated;
