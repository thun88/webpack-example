import style from './app.scss';

console.info('Hello from app.js, this is a sample code');
console.info('Hello also from webpack server');

console.warn('Test Hot module, yeah baby');

if (module.hot) {
  console.log('Accepting the updated printMe module!');
}