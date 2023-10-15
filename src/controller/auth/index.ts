import { NextFunction, Request, Response } from "express";
import { controller } from "../index.js";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export class authController extends controller {
	constructor() {
		super();
	}

	async loginBody(): Promise<any> {
		return {
			client_id: process.env.CLIENT_ID,
			client_secret: process.env.CLIENT_SECRET,
			grant_type: process.env.GRANT_TYPE,
		};
	}

	// CHECK ISADMIN
	async isAdmin(req: Request): Promise<boolean> {
		try {
			const resp = await axios.get(
				`${process.env.BASE_URL}/admin/realms/myrealm/users/${req.params.id}/role-mappings/realm`,
				{
					headers: {
						Authorization: req.headers["authorization"],
					},
				}
			);
			const role = [];
			for (let i = 0; i < resp.data.length; i++) {
				role.push(resp.data[i].name);
			}
			const addRoleAlow = role.includes("admin");
			return addRoleAlow;
		} catch (error: any) {
			return false;
		}
	}

	// GET TOKEN FOR MYCLIENT
	async loginController(req: Request, res: Response) {
		try {
			const resp = await axios.post(
				`${process.env.BASE_URL}/realms/myrealm/protocol/openid-connect/token`,
				{
					client_id: process.env.CLIENT_ID,
					client_secret: process.env.CLIENT_SECRET,
					grant_type: process.env.GRANT_TYPE,
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				}
			);
			return this.response(res, "login success", 200, {
				data: resp.data,
			});
		} catch (error: any) {
			return this.error(res, error.message, error.status, {
				err: error,
			});
		}
	}

	// ADD ROLE TO CLIENT
	async addRoleClientController(req: Request, res: Response): Promise<void> {
		try {
			const addRoleAlow = await this.isAdmin(req);
			if (addRoleAlow) {
				const resp2 = await axios.post(
					`${process.env.BASE_URL}/admin/realms/myrealm/clients/${process.env.ID_CLIENT}/roles`,
					req.body,
					{
						headers: {
							Authorization: req.headers["authorization"],
						},
					}
				);

				return this.response(res, "add role to client success", 200, {
					data: resp2.data,
				});
			}
			// return this.error(res, "not permission", 403, {
			// 	err: [],
			// });
		} catch (error: any) {
			return this.error(res, error.message, error.status, {
				err: error,
			});
		}
	}

	// ADD ROLE TO USER
	async addRoleUserController(req: Request, res: Response): Promise<void> {
		try {
			const addRoleAlow = await this.isAdmin(req);
			if (addRoleAlow) {
				const resp2 = await axios.post(
					`${process.env.BASE_URL}/admin/realms/myrealm/users/${req.params.id}/role-mappings/realm`,
					req.body,
					{
						headers: {
							Authorization: req.headers["authorization"],
						},
					}
				);

				return this.response(res, "add role to client success", 200, {
					data: resp2.data,
				});
			}
			return this.error(res, "not permission", 403, {
				err: [],
			});
		} catch (error: any) {
			return this.error(res, error.message, error.status, { err: error });
		}
	}

	// ADD NEW USER
	async addUserController(req: Request, res: Response): Promise<void> {
		try {
			const addUserAlow = await this.isAdmin(req);
			if (addUserAlow) {
				const resp = await axios.post(
					`${process.env.BASE_URL}/admin/realms/myrealm/users`,
					req.body
				);
				return this.response(res, "add user success", 200, {
					data: resp.data,
				});
			}
		} catch (error: any) {
			return this.error(res, error.message, error.status, { err: error });
		}
	}
}
