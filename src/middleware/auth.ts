import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const bearerHeader = (req: Request, res: Response, next: NextFunction) => {
	const bearerToken = req.headers["authorization"];
	if (typeof bearerToken === "undefined") {
		return res.status(403).json({
			message: "No token provided",
		});
	}

	const secret = `-----BEGIN PUBLIC KEY-----\n${process.env.JWT_KEY}\n-----END PUBLIC KEY-----`;
	const token = bearerToken.split(" ")[1];
	const verifyToken = jwt.verify(token, secret);
	if (verifyToken) return next();
    return res.status(403).json({
      message: "Invalid token",
    });
};

export default bearerHeader;
