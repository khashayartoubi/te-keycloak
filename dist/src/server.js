import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import router from "./routes/index.js";
const app = express();
const port = 8082;
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());
// const keycloakConfig: any = {
// 	"realm": "myrealm",
//     "auth-server-url": "http://localhost:8080/",
//     "ssl-required": "external",
//     "resource": "myclient",
//     "public-client": true,
//     "confidential-port": 0
// };
// const keycloak = new Keycloak({}, keycloakConfig);
// app.use(keycloak.middleware({ logout: "/logout" }));
// // app.get("/", (req: Request, res: Response) => {});
app.use("/api/v1", router);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
