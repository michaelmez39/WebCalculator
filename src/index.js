import React from 'react';
import ReactDOM from 'react-dom';
import Evaluator from './evaluator.js';
let e = new Evaluator();
ReactDOM.render(<h1>{"" + e.eval("(2.3 + 4.7) / 2")}</h1>, document.getElementById('root'));

class Calculator extends React.Component {
    
}