function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const buttonCyphers = [
1, 2, 3, 4, 5, 6, 7, 8, 9, 0];


const operationCyphers = [
'-', '+', '/', '*'];


class App extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      calcMemory: "",
      calcInput: "",
      answer: "",
      error: "" });_defineProperty(this, "handleAC",


    () => {
      this.setState({
        calcInput: "",
        calcMemory: "",
        answer: "" });

    });_defineProperty(this, "handleCE",

    () => {
      this.setState({
        calcInput: "" });

    });_defineProperty(this, "handleNumberClick",

    value => {
      const shouldShowError = this.state.calcInput.length >= 8 || this.state.calcMemory.length >= 12;
      switch (true) {
        case shouldShowError === true:
          this.setState({
            calcInput: "Error",
            calcMemory: "Error" });

        case this.state.answer !== "":
          this.setState({
            answer: "",
            calcInput: value,
            calcMemory: value });

          return;
        case operationCyphers.includes(this.state.calcInput):
          this.setState({
            calcInput: value,
            calcMemory: this.state.calcMemory + value });

          break;
        case buttonCyphers.includes(value):
          this.setState({
            calcInput: `${this.state.calcInput}${value}`,
            calcMemory: `${this.state.calcMemory}${value}` });}


    });_defineProperty(this, "handleOperator",

    operator => {
      const calcm = this.state.calcInput[this.state.calcInput.length - 1];
      if (this.state.calcMemory.length == 1 && (operator == "+" || operator === "*" || operator === "/")) {
        return;
      }
      if (calcm === "+" || calcm === "-" || calcm === "*" || calcm === "/") {
        return;
      }
      switch (true) {
        case this.state.calcMemory.charAt(0) == "=":
          this.state.calcMemory = this.state.calcMemory.substr(2);
          this.setState({
            answer: "",
            calcInput: operator,
            calcMemory: this.state.calcMemory + operator });

          break;
        case operationCyphers.includes(operator):
          this.setState({
            calcInput: operator,
            calcMemory: this.state.calcMemory + operator });}



    });_defineProperty(this, "handleEqual",

    equal => {
      const answer = eval(this.state.calcMemory);
      this.state.answer = answer;
      this.setState({
        calcMemory: "= " + Math.round(answer),
        calcInput: "" });

    });}

  renderButtons() {
    return buttonCyphers.map((item, index) => /*#__PURE__*/
    React.createElement("button", { key: index, onClick: () => this.handleNumberClick(item) }, item));

  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "calculator" }, /*#__PURE__*/
      React.createElement("div", { className: "calcpanel" }, /*#__PURE__*/
      React.createElement("span", { className: "line" }), /*#__PURE__*/
      React.createElement("span", { className: "camera" })), /*#__PURE__*/

      React.createElement("div", { className: "_head" }, /*#__PURE__*/
      React.createElement("p", null, this.state.calcMemory ? this.state.calcMemory : ''), /*#__PURE__*/
      React.createElement("p", null, this.state.calcInput ? this.state.calcInput : '')), /*#__PURE__*/

      React.createElement("br", null), /*#__PURE__*/
      React.createElement("div", { className: "_buttons" }, /*#__PURE__*/
      React.createElement("div", { className: "_operators" }, /*#__PURE__*/
      React.createElement("button", { onClick: () => this.handleOperator('+') }, "+"), /*#__PURE__*/
      React.createElement("button", { onClick: () => this.handleOperator('-') }, "-"), /*#__PURE__*/
      React.createElement("button", { onClick: () => this.handleOperator('*') }, "\xD7"), /*#__PURE__*/
      React.createElement("button", { onClick: () => this.handleOperator('/') }, "\xF7")), /*#__PURE__*/

      React.createElement("div", { className: "_ACCE" }, /*#__PURE__*/
      React.createElement("button", { onClick: () => this.handleAC() }, "AC"), /*#__PURE__*/
      React.createElement("button", { onClick: () => this.handleCE() }, "CE")), /*#__PURE__*/

      React.createElement("div", { className: "_numbers" },
      this.renderButtons()), /*#__PURE__*/

      React.createElement("br", null), /*#__PURE__*/
      React.createElement("div", { className: "Equal" }, /*#__PURE__*/
      React.createElement("button", { onClick: () => this.handleEqual('=') }, "=")))));




  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));