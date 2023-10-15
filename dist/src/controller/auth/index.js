var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { controller } from "../index.js";
import axios from "axios";
export class authController extends controller {
    constructor() {
        super();
    }
    loginBody() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                grant_type: process.env.GRANT_TYPE,
            };
        });
    }
    // CHECK ISADMIN
    isAdmin(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield axios.get(`${process.env.BASE_URL}/admin/realms/myrealm/users/${req.params.id}/role-mappings/realm`, {
                    headers: {
                        Authorization: req.headers["authorization"],
                    },
                });
                const role = [];
                for (let i = 0; i < resp.data.length; i++) {
                    role.push(resp.data[i].name);
                }
                const addRoleAlow = role.includes("admin");
                return addRoleAlow;
            }
            catch (error) {
                return false;
            }
        });
    }
    // GET TOKEN FOR MYCLIENT
    loginController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield axios.post(`${process.env.BASE_URL}/realms/myrealm/protocol/openid-connect/token`, {
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    grant_type: process.env.GRANT_TYPE,
                }, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                });
                return this.response(res, "login success", 200, {
                    data: resp.data,
                });
            }
            catch (error) {
                return this.error(res, error.message, error.status, {
                    err: error,
                });
            }
        });
    }
    // ADD ROLE TO CLIENT
    addRoleClientController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addRoleAlow = yield this.isAdmin(req);
                if (addRoleAlow) {
                    const resp2 = yield axios.post(`${process.env.BASE_URL}/admin/realms/myrealm/clients/${process.env.ID_CLIENT}/roles`, req.body, {
                        headers: {
                            Authorization: req.headers["authorization"],
                        },
                    });
                    return this.response(res, "add role to client success", 200, {
                        data: resp2.data,
                    });
                }
                // return this.error(res, "not permission", 403, {
                // 	err: [],
                // });
            }
            catch (error) {
                return this.error(res, error.message, error.status, {
                    err: error,
                });
            }
        });
    }
    // ADD ROLE TO USER
    addRoleUserController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addRoleAlow = yield this.isAdmin(req);
                if (addRoleAlow) {
                    const resp2 = yield axios.post(`${process.env.BASE_URL}/admin/realms/myrealm/users/${req.params.id}/role-mappings/realm`, req.body, {
                        headers: {
                            Authorization: req.headers["authorization"],
                        },
                    });
                    return this.response(res, "add role to client success", 200, {
                        data: resp2.data,
                    });
                }
                return this.error(res, "not permission", 403, {
                    err: [],
                });
            }
            catch (error) {
                return this.error(res, error.message, error.status, { err: error });
            }
        });
    }
    // ADD NEW USER
    addUserController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addUserAlow = yield this.isAdmin(req);
                if (addUserAlow) {
                    const resp = yield axios.post(`${process.env.BASE_URL}/admin/realms/myrealm/users`, req.body);
                    return this.response(res, "add user success", 200, {
                        data: resp.data,
                    });
                }
            }
            catch (error) {
                return this.error(res, error.message, error.status, { err: error });
            }
        });
    }
}
