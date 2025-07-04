import { response, Router } from "express";
import userRouter from "@modules/users/routes/user.routes";
import servicoRouter from "@modules/servicos/routes/servico.routes";

const routes = Router();

routes.get("/", async (req, res, next) => {
    response.json({
        message: "Hello Dev!",
    });
    return;
});
routes.use("/users", userRouter);
routes.use("/servicos", servicoRouter);

export default routes;
