import  express  from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth"
import taskRoutes from "./routes/task"
import cors from "cors"

const app = express();
app.use(cors())
app.use(express.json())
dotenv.config()

const PORT = process.env.PORT || 3001

app.use('/auth',authRoutes)

app.use('/task',taskRoutes)

app.listen(PORT,()=>{
    console.log("App running on port", PORT )
})