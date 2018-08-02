import 'babel-polyfill';
import { app as electronApp, BrowserWindow } from 'electron'; // eslint-disable-line
import express from 'express';
import cors from 'cors';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';

// Express
const app = express();
const publicPath = (process.env.NODE_ENV === 'development') ? '../../public/' : './';
const PORT = process.env.PORT || 9000;

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', express.static(path.join(__dirname, publicPath)));
app.get('*', (req, res) => res.status(404).send('Not found'));
app.listen(PORT);

// Electron
let mainWindow = null;

electronApp.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electronApp.quit();
    }
});

electronApp.on('ready', () => {
    mainWindow = new BrowserWindow({ width: 700, height: 500, autoHideMenuBar: true });
    mainWindow.loadURL(`http://0.0.0.0:${PORT}`);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
