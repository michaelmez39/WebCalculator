import React from 'react';
import ReactDOM from 'react-dom';
import Evaluator from './evaluator.js';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.evalExpression = this.evalExpression.bind(this);
        this.evaluator = new Evaluator();
        this.state = {previous_results: [], current_expression: ""}
    }
    handleChange(expression) {
        this.setState({previous_results: this.state.previous_results, current_expression: expression.target.value});
    }
    evalExpression(event) {
        if (event.key === "Enter") {
            this.setState({previous_results: [...this.state.previous_results, this.evaluator.eval(this.state.current_expression)], current_expression: ""});
        }
    }
    render() {
        return (
        <div className="calculator">
                <div className="view">
                    <input type="text" value={this.state.current_expression} onChange={this.handleChange} onKeyPress={this.evalExpression} />
                </div>
                <div className="previous">
                    <PreviousCalculation evaluator_results = {this.state.previous_results} />
                </div>
        </div>  
        );
    }
}

function PreviousCalculation(props) {
        return (
            props.evaluator_results.map((result) => 
            <div className="entry">
                <span>{result.expression}</span>
                <span>= {result.result}</span>
            </div>
            ) 
        );
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
