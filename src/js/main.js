import { app } from './products.js';
import { jokesApp } from './jokes.js';


jokesApp.init();
app.init();


//Resolver problema de importación(Si se cambia la posición de jokesApp.init y viceversa va a funcionar el que esté primero.)