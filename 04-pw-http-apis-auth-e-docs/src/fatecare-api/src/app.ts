import express, {Request, Response, NextFunction} from "express"
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';
import routers from './routers';
import dotenv from "dotenv"
dotenv.config();


import { AppDataSource } from "./data-source";

AppDataSource.initialize() 
    .then(() => {
        console.log('🎉 Database connection established successfully!');
    })
    .catch((err) => {
        console.error('❌ Error connecting to the database:', err);
        process.exit(1);
    });

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use("/api/v1", routers);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.send("Hello me, it's me again...");
});

const PORT = process.env.PORT || 12345

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
    console.log(`✨ API is ready to use!`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/docs`);
});