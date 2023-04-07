import './App.scss';
import React from 'react';
import FieldBuilder from './components/fieldBuilder/fieldbuilder'

/**
 * Main App Component used to load the field builder
 */
class App extends React.Component{

  render(){
    return (
    <div className="App">
      <FieldBuilder/>
    </div>
  );
  }
}

export default App;
