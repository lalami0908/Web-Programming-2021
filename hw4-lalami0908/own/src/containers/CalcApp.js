import React from 'react';

import CalcButton from '../components/CalcButton';

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,      
    };
    this.operator = "";
    this.valueBefore = 0;
    this.clickedOperator = false;
    this.lastOperator = false;
    
  }

  resetState = () => {
    // TODO
    this.setState({value: 0});
    this.operator =  "";
    this.valueBefore =  0;
    this.clickedOperator = false;
    this.resetNum = false;
    this.lastOperator = false;
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  clickNumber =  e => {
    const getNumber = parseInt(e.target.innerText);
    this.resetNum ? 
    this.setState({value: getNumber}) : this.setState({value: this.state.value * 10 + getNumber});
    this.resetNum = false; 
    this.lastOperator = false;
  }

  clickOperator = e => {
    const op = e.target.innerText;
    if(this.lastOperator){
      // this.lastOperator = true;
      this.operator = op;
      return ;
    }
    if(this.clickedOperator){
      
      const res = this.calculate(this.operator,this.state.value);
      this.setState({value: res});
      this.valueBefore = res;
    }
    else{
      this.valueBefore = this.state.value;
    }

    this.operator = op;
    this.resetNum = true;
    this.clickedOperator = true;
    this.lastOperator = true;


  }

  clickEqual = ()=> {
    if(!this.clickedOperator){      
      return ;
    }
    if(this.lastOperator){
      return ;
    }
    const res = this.calculate(this.operator,this.state.value);
    this.setState({value: res});
    this.valueBefore = this.state.value;
    this.operator = "";
    this.clickedOperator = false;
    this.resetNum = true;


  }
  calculate = (op, val) => {
    let result = 0;
    if(op === "+"){
      result = this.valueBefore + val;
    }
    if(op === "-"){
      result = this.valueBefore - val;
    }
    if(op === "x"){
      result = this.valueBefore * val;
    }
    if(op === "÷"){
      result = this.valueBefore / val;
    }
    if(op === "="){
      this.clickEqual();
    }
    return(result)
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.value}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState}>AC</CalcButton>
            <CalcButton onClick={this.showNotImplemented}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented}>%</CalcButton>
            <CalcButton className="calc-operator" onClick={this.showNotImplemented}>÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.clickNumber}>7</CalcButton>
            <CalcButton className="calc-number" onClick={this.clickNumber}>8</CalcButton>
            <CalcButton className="calc-number" onClick={this.clickNumber}>9</CalcButton>
            <CalcButton className="calc-operator" onClick={this.clickOperator}>x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.clickNumber}>4</CalcButton>
            <CalcButton className="calc-number" onClick={this.clickNumber}>5</CalcButton>
            <CalcButton className="calc-number" onClick={this.clickNumber}>6</CalcButton>
            <CalcButton className="calc-operator" onClick={this.clickOperator}>-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.clickNumber}>1</CalcButton>
            <CalcButton className="calc-number" onClick={this.clickNumber}>2</CalcButton>
            <CalcButton className="calc-number" onClick={this.clickNumber}>3</CalcButton>
            <CalcButton className="calc-operator" onClick={this.clickOperator}>+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number bigger-btn" onClick={this.clickNumber}>0</CalcButton>
      
            <CalcButton className="calc-number" onClick={this.clickNumber}>.</CalcButton>
            <CalcButton className="calc-operator" onClick={this.clickEqual}>=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
