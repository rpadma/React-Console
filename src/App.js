import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {

 
  constructor(props)
  {
    super(props);
    this.inputClick=this.inputClick.bind(this);
    this.handleInput=this.handleInput.bind(this);
    this.clearHistory=this.clearHistory.bind(this);
    this.addHistory=this.addHistory.bind(this);
    this.ViewLink=this.ViewLink.bind(this);
    this.registerCommands=this.registerCommands.bind(this);
    this.showHelp=this.showHelp.bind(this);
    this.showIntroMsg=this.showIntroMsg.bind(this);
    

this.state={ commands:{},
             history:[],
             prompt: 'Rohits-MacBook-Pro $ ',
             term:''
            };
  }

  handleInput(e) {
   if (e.key === "Enter") {
      
        var input_text = e.target.value;
        var input_array = input_text.split(' ');
        var input = input_array[0];
        var arg = input_array[1];
        var command = this.state.commands[input];

        this.addHistory(this.state.prompt + " " + input_text);

        this.setState={term:e.target.value};
        
        if (command === undefined) {
            this.addHistory("sh: command not found: " + input);
        } else {
            command(input_text);
        }
        this.clearInput();
    }
}


componentDidMount() {
 //var term = this.refs.term.getDOMNode();

 const term= ReactDOM.findDOMNode(this.term)
 this.registerCommands();
 this.showIntroMsg();
 this.term.focus();

}

componentDidUpdate() {
 //var el = ReactDOM.findDOMNode(this.refs.term);
 const el=ReactDOM.findDOMNode(this.term);
 alert(el.scrollHeight);
 var container = document.getElementById("terminalbody");
 container.scrollTop = el.scrollHeight;
}


ViewLink(link) {
  return function() {
    window.open(link, '_blank');
  }
}

addHistory(output) {
  var history = this.state.history;
  history.push(output)
  this.setState={
    'history': history
  };
}

clearHistory() {
  alert('before clear'+this.state.history);
  var history = this.state.history;
  for(var i=0;i<history.length;i++)
  {
    history.pop();
  }
  
  this.setState={
    'history': history
  };

  alert(this.state.history);
}

registerCommands() {
  this.setState({
    commands: {
      'clear' : this.clearHistory,
      'help'  : this.showHelp,
      'github': this.ViewLink('https://github.com/rpadma'),
      'portfolio': this.ViewLink('http://rohitpadma.me'
    )
    }
  });
}

  showIntroMsg(){

    this.addHistory("Hello, I'm Rohit Padma, a graduate student in the Computer Science department.");
    this.addHistory("Type `help` to know about me!");
  }

  inputClick() {
    //var term = React.getDOMNode(this.refs.term);
    //var term=this.props.termr;
   // this.termr.focus();
   
   
   var term=ReactDOM.findDOMNode(this.term);
   term.focus();
  }

 clearInput() {
    //this.refs.term.getDOMNode().value = "";
    //this.setState={term:''};
    
    this.term.focus();
    this.term.value=" ";

}

showHelp() {
  this.addHistory("help - this  is help text");
  this.addHistory("github - view github profile");
  this.addHistory("portfolio - view my portfolio");
  this.addHistory("clear - clear screen");

 
}




  render(){

 let output = this.state.history.map(function(op,index) {
     return <p key={index}>{op}</p>
  });

    return(
      <div className='input-area' onClick={this.inputClick}>
      
       {output}

      <p>
        <span className='textstyle'>{this.state.prompt}</span> 
        <input type="text" className='textstyle' onKeyPress={this.handleInput}  ref={(input) => { this.term = input; }}   />
      </p>
    </div>
      
    );
  }

}

export default App;
