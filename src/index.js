import './style/index.css';
import './style/index1.less';
import _ from 'lodash';
import { Apple } from './component.js';

function component() {
  let element = document.createElement('div');
  let button = document.createElement('button');
  let br = document.createElement('br');

  button.innerHTML = 'Click me and  look at the console!';
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.appendChild(br);
  element.appendChild(button);

  button.onclick = e => import(/* webpackChunkName: "print" */'./print.js').then(module => {
    var print = module.default;
    print();
  });
  return element;
}

document.body.appendChild(component());

const appleModel = new Apple({
  model: 'X'
}).getModel();

console.log(appleModel);