import { Login, Register } from "../controllers/user.controller.js"

export default function UserRoutes(app){
    app.post("/api/user/register",Register);
    app.post("/api/user/login",Login);
}