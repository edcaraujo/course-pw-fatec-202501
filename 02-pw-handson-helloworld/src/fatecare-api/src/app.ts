import express, {Request, Response, NextFunction} from "express"
import dotenv from "dotenv"
dotenv.config();

import PatientRouter from "./routers/patient.router"

const app = express();
app.use(express.json());

app.use("/patients", PatientRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.send("Hello me, it's me again...");
});

const PORT = process.env.PORT || 12345

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
    console.log(`✨ API is ready to use!`);
});