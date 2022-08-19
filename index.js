const fs = require('fs'),
    mongoose = require('mongoose'),
    express = require('express'),
    path  = require('path'),
    morgan = require('morgan'),
    {userRouter} = require('./userRouter.js'),
    {notesRouter} = require('./notesRouter.js'),
    {userInfoRouter} = require('./userInfoRouter.js');

const app = express();
mongoose.connect('mongodb+srv://rojeck:Rojeck1409@cluster0.amb8dzb.mongodb.net/?retryWrites=true&w=majority')

const accessedLog = fs.createWriteStream(path.join(__dirname, 'requestLogs.log'), {flags: 'a'});

app.use(express.json());
app.use(morgan('tiny', { stream: accessedLog }));
app.use('/api/auth', userRouter);
app.use('/api/notes', notesRouter);
app.use('/api/users', userInfoRouter);

const PORT = process.env.PORT ?? 8080;

const start = async function () {
    try {
        if (!fs.existsSync('files')) {
            fs.mkdirSync('files');
        }
        app.listen(PORT, () => {
            console.log(`Server has been started successfully on port: ${PORT}`);
        })
    } catch (err) {
        console.log(`Server has not been started because of error: ${err}`);
    }
}

start();

app.use(errorHandler);

function errorHandler (err, req, res, next) {
    console.log(err);
    res.status(500).send({
        "message": "server error"
    });
}

