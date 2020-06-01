import React from 'react';
import ReactDOM from 'react-dom';
import Evaluator from './evaluator.js';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.evalExpression = this.evalExpression.bind(this);
        this.handleKeyPadPress = this.handleKeyPadPress.bind(this);
        this.state = {previous_results: [], current_expression: "", evaluator: new Evaluator()}
    }
    handleChange(expression) {
        this.setState({previous_results: this.state.previous_results, current_expression: expression.target.value, evaluator: new Evaluator()});
    }
    evalExpression(event) {
        if (event.key === "Enter") {
            let result = this.state.evaluator.eval(this.state.current_expression);
            this.setState({previous_results: [...this.state.previous_results, result], current_expression: "", evaluator:  new Evaluator()});
        }
    }

    // this could possibly be merged with the handle change function!
    handleKeyPadPress(key) {
        if (key === "=") {
            let result = this.state.evaluator.eval(this.state.current_expression);
            this.setState({previous_results: [...this.state.previous_results, result], current_expression: "", evaluator: new Evaluator()});
        } else if(key === "C") {
            this.setState({previous_results: this.state.previous_results, current_expression: "", evaluator: new Evaluator()});
        } else {
            this.setState({previous_results: this.state.previous_results, current_expression: this.state.current_expression + key, evaluator:  new Evaluator()});
        }
    }

    render() {
        return (
        <div className="calculator" onKeyPress={this.evalExpression}>
                <div className="view">
                    <input type="text" value={this.state.current_expression} onChange={this.handleChange}  />
                    <div className="keypad">
                        <Keypad enterValue={this.handleKeyPadPress} />
                    </div>
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

function Keypad(props) {
    let keys = "()%C789/456*123-0.=+";
    return (
                    keys.split("").map((c) =>
                        <div role="button" className="key" onClick={() => props.enterValue(c)}>
                            {c}
                        </div>
                        )
    )
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
