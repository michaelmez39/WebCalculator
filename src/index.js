import React from 'react';
import ReactDOM from 'react-dom';
import Evaluator from './evaluator.js';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.evalExpression = this.evalExpression.bind(this);
        this.state = {previous_results: [], evaluator: new Evaluator(), current_expression: ""}
    }
    handleChange(expression) {
        this.setState({previous_results: this.state.previous_results, evaluator: new Evaluator(), current_expression: expression.target.value});
    }
    evalExpression(event) {
        if (event.key === "Enter") {
            this.setState({previous_results: [...this.state.previous_results, this.state.evaluator.eval(this.state.current_expression)], evaluator: new Evaluator(), current_expression: ""});
        }
    }
    render() {
        return (
            <div className="calculator">
                <div className="previous-calculation">
                    <PreviousCalculation evaluator_results = {this.state.previous_results} />
                </div>
                    <div class="expression-input">
                        <input type="text" value={this.state.current_expression} onChange={this.handleChange} onKeyPress={this.evalExpression} />
                    </div>
            </div>
        );
    }
}

function PreviousCalculation(props) {
        return (
            props.evaluator_results.map((result) => 
            <div className="calc-entry">
                <span>{result.expression}</span>
                <span>= {result.result}</span>
            </div>
            ) 
        );
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
