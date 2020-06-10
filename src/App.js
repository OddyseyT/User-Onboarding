import React, { useState, useEffect } from 'react';

import Form from './components/Form';




import './App.css';

function App() {
 

  

 

    const [person, setPerson] = useState([] );
    const addPerson = index => {setPerson([...person,index])}
    return (
      <div className="App">
      <h1>User Onboarding</h1>
      <Form addPerson={addPerson}/>

      </div>
  );
}
export default App;
