//import style from './assets/styles/app.scss';
var css = require('./assets/styles/app.styl');
var $ = require("jquery");
import 'bootstrap';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';


console.info('Hello from app.js, this is a sample code');
console.info('Hello also from webpack server');



if (module.hot) {
  console.warn('Test Hot module, yeah baby');
  console.log('Accepting the updated printMe module!');
}

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}
