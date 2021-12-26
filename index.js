const express = require("express");
const app = express();

const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/registerRouter');
const userRouter = require('./routes/userRouter');
const roleRouter = require('./routes/roleRouter');
const projectRouter = require('./routes/projectRouter');
const statusRouter = require('./routes/statusRouter');
const sprintRouter = require('./routes/sprintRouter');
const taskRouter = require('./routes/taskRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Rutas
app.get("/api", (req , res) => {
    res.json({
        mensaje: "Api 3"
    });
});
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/user', userRouter);
app.use('/api/role', roleRouter);
app.use('/api/project', projectRouter);
app.use('/api/status', statusRouter);
app.use('/api/sprint', sprintRouter);
app.use('/api/task', taskRouter);

//Run servidor
app.listen(process.env.PORT || 3000, () => {
    console.log("nodejs api running...");
});