export default function Evaluator() { 
    this.variables = {};
    this.input = "";
    this.location = 0;
};
function EvaluatorResult(original, result) {
    this.expression = original;
    this.result = result;
    this.error = null;
}

Evaluator.prototype.has_next = function() {
    return this.location < this.input.length;
};

Evaluator.prototype.peek = function() {
    return this.input.charAt(this.location);
};
let escape_hatch = -1000;
Evaluator.prototype.skip_whitespace = function() {
    
    while (this.has_next() && " \t\n\r".includes(this.peek())) {
        this.location += 1;
    }
};

Evaluator.prototype.eval = function(input) {
    this.input = input;
    let result = this.parse_addition(); 
    if (this.has_next()) {
        result = new Error("Found unexpected value");
    }
    return new EvaluatorResult(input, result);
};

Evaluator.prototype.parse_addition = function() {
    console.log("Called addition");
    const values = [this.parse_multiplication()];
    while (true) {
        this.skip_whitespace();
        let next = this.peek();
        if (next === '+') {
            this.location += 1;
            values.push(this.parse_multiplication());
        } else if (next === '-') {
            this.location += 1;
            values.push(this.parse_multiplication());
        } else {
            console.log("Sum is " + values.reduce( (acc, val) => acc + val));
            return values.reduce((acc, val) => acc + val, 0);
        }
   }
};

Evaluator.prototype.parse_multiplication = function() {
    console.log("Called multiplication");
    const values = [this.parse_parentheses()];
    while (true) {
        this.skip_whitespace();
        const next = this.peek();
        if (next === "*"){
            this.location += 1;
            values.push(this.parse_parentheses());
        } else if (next === "/"){
            this.location += 1;
            const denom =  this.parse_parentheses();
            if (denom === 0) {
                throw new Error("division by zero!");
            }
            values.push(1.0 / denom);
        } else {
            console.log("Multiplication is " + values.reduce((acc, val) =>  acc * val, 1.0 ));
            return values.reduce((acc, val) =>  acc * val, 1.0 );
        }
    }
};

Evaluator.prototype.parse_parentheses = function() {
    console.log("Called parentheses");
    this.skip_whitespace();
    if (this.peek() === "(") {
        this.location += 1;
        const value = this.parse_addition();
        this.skip_whitespace();
        if (this.peek() !== ")") {
            throw new Error("Unclosed parentheses!");
        }
        this.location += 1;
        return value;
    } else {
        return this.parse_negative();
    }
};

Evaluator.prototype.parse_negative = function() {
    console.log("Called parse negative");
    this.skip_whitespace();
    if (this.peek() === "-") {
        this.location += 1;
        return -1 * this.parse_parentheses();
    } else {
        return this.parse_value();
    }
};

Evaluator.prototype.parse_value = function() {
    console.log("Called parse value");
    this.skip_whitespace();
    let val = "";
    let decimal_found = false;
    while ("0123456789.".includes(this.peek()) && this.peek() !== "") {
        let next = this.peek();
        this.location += 1;
        if (next === ".") {
            if (decimal_found) {
                throw new Error("Second decimal found in number");
            }
            decimal_found = true;
            val = val + next;
        }
        else if ("0123456789".includes(next)) {
            console.log("Adding to val");
            val = val + next;
        } else {
            return parseFloat(val);
        }
        
    }
    console.log("val is " + val);
    if (val.length === 0) {
        if (val === "") {
            throw new Error("Unexpected end of sequence!");
        } else {
            throw new Error("Expecting number, found character:" + next);
        }
    }
    console.log("Parsed val as " + parseFloat(val));
    return parseFloat(val);
};
