import React, { Component } from 'react';

import './App.css';
import NavBar from './components/navbar';
import Counters from './components/counters';

class App extends Component {
  state = { 
    counters:[
        { id:1,value:3 },
        { id:2,value:0 },
        { id:3,value:0 },
        { id:4,value:0 }
          
    ]
 }
 handleReset=() => {
  const counters= this.state.counters.map(c=>{
       c.value=0;
       return c;
   });

   this.setState({counters});

}
handleIcrement=counter =>{
   const counters=[...this.state.counters];
   const index=counters.indexOf(counter);
   counters[index]={...counter};//clone counter obj
   counters[index].value++;
   this.setState({counters});

}
handleDecrement=counter=> {
  const counters=[...this.state.counters];
  const index=counters.indexOf(counter);
  counters[index]={...counter};
  counters[index].value--;
  this.setState({counters})

}
handleDelete = (counterId) => {
  const counters=this.state.counters.filter(c => c.id !== counterId);
  this.setState({counters});

};
  render() {
    
    return (
      <main className="container">
    <React.Fragment>
      
      <NavBar totalCounters={this.state.counters.filter(c => c.value>0).length}
      />
     
      <Counters
       onDelete={this.handleDelete} 
       onIncrement={this.handleIcrement}
       onDecrement={this.handleDecrement}
       onReset={this.handleReset}
       
      counters={this.state.counters}/>
     
      
    </React.Fragment>
    </main>
    );
  }
}

export default App;
