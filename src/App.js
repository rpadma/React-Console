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
    this.showCommands=this.showCommands.bind(this);
    this.showHelp=this.showHelp.bind(this);
    this.showIntroMsg=this.showIntroMsg.bind(this);
    this.showProject=this.showProject.bind(this);
    this.sendEmail=this.sendEmail.bind(this);
    this.downloadResume=this.downloadResume.bind(this);
    

this.state={ commands:{},
             history:[],
             prompt: 'Rohits-MacBook-Pro $ ',
             term:''
            };
  }

  handleInput(e) {
   if (e.key === "Enter") {
      
        var inputcmd = e.target.value.trim();

        var command = this.state.commands[inputcmd];

        this.addHistory(this.state.prompt+" "+ inputcmd);

        this.setState({term:e.target.value});
        
        if (command === undefined) {
            this.addHistory("sh: command not found: " + inputcmd);
        } else {
            command(inputcmd);
        }
        this.clearInput();
    }
}


componentDidMount() {

 const term= ReactDOM.findDOMNode(this)
 this.showCommands();
 this.showIntroMsg();
 this.term.focus();

}

componentDidUpdate() {

 var el=ReactDOM.findDOMNode(this.term);
 var container = document.getElementById("terminalbody");
 container.scrollTop = el.scrollHeight+10;
}


ViewLink(link) {
  return function() {
    window.open(link, '_blank');
  }
}

addHistory(output) {
  var history = this.state.history;
  history.push(output)
  this.setState({
    'history': history
  });
}

clearHistory() {
  
  var history = this.state.history;
  this.setState({
    'history': []
  });

  
}



showCommands() {
  this.setState({
    commands: {
      'clear' : this.clearHistory,
      'help'  : this.showHelp,
      'github': this.ViewLink('https://github.com/rpadma'),
      'portfolio': this.ViewLink('http://rohitpadma.me'),
      'aboutme' : this.showIntroMsg,
      'resume': this.downloadResume,
      'email' : this.sendEmail,
      'projects' :this.showProject
    
    }
  });
}

  showIntroMsg(){

    this.addHistory("Hello, I'm Rohit Padma, a graduate student in the Computer Science department.");
    this.addHistory("Type `help` to know about me!");
  }

  inputClick() {
   var term=ReactDOM.findDOMNode(this);
   term.focus();
  }

 clearInput() {
    this.term.focus();
    this.term.value=" ";

}

showHelp() {
  this.addHistory("help - this is help text to know all available options");
  this.addHistory("aboutme - to know me")
  this.addHistory("github - view github profile");
  this.addHistory("portfolio - view my portfolio");
  this.addHistory("resume - To download my resume");
  this.addHistory("email - leave a message ");
  this.addHistory("projects - Projects list");
  this.addHistory("clear - clear screen");
}

showProject(){

  this.addHistory(" Still working on this");
}

sendEmail(){

  this.addHistory("Still working on this");

}

downloadResume(){

  this.addHistory("Still working on this");
}




  render(){
console.log(this.state.history);
 let output = this.state.history.map((op) => {
     return <p>{op}</p>
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
