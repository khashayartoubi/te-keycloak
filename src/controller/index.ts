import autoBind from "auto-bind";
import { Response } from "express";

export class controller {
	constructor() {
		autoBind(this);
	}

	response(
		res: any | Response,
		message: string = "",
		code: number = 200,
		data: any
	) {
		res.status(code).json({
			message,
			data,
		});
	}

	error(
		res: any | Response,
		message: string = "",
		code: number = 500,
		data: any
	) {
		res.status(code).json({
			message,
			data,
		});
	}
}
