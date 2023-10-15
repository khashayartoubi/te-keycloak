import express from "express";
import { authController } from "../controller/auth/index.js";
const router = express.Router();
import Keycloak from "keycloak-connect";
import bearerHeader from "../middleware/auth.js";
const keycloakConfig = {
    realm: "myrealm",
    "auth-server-url": "http://localhost:8080",
    "ssl-required": "external",
    resource: "myclient",
    "public-client": true,
    "confidential-port": 0,
};
const keycloak = new Keycloak({}, keycloakConfig);
router.use(keycloak.middleware({ logout: "/logout" }));
router.get("/login", new authController().loginController);
router.post("/addRoleClient/:id", bearerHeader, keycloak.protect(), new authController().addRoleClientController);
router.post("/addRoleUser/:id", bearerHeader, keycloak.protect(), new authController().addRoleUserController);
router.get("/addUser/:id", new authController().addUserController);
export default router;
