const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const session = require('express-session')
const app = express()

app.use(session({
    secret: 'keyboard dog',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 9999999999999999 }
}))


const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Express App Config
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:8081', 'http://localhost:8081'],
        credentials: true
    };
    app.use(cors(corsOptions));
}


const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const templateRoutes = require('./api/template/template.routes')
const connectSockets = require('./api/socket/socket.routes')


// routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/template', templateRoutes)
connectSockets(io)



const logger = require('./services/logger.service')
const port = process.env.PORT || 3000;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});