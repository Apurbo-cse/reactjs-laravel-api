
import { useState } from 'react';
import './App.css';

function App() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://127.0.0.1:8000/api/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        console.log(response);
        // handle successful response
      })
      .catch(error => {
        console.error(error);
        // handle error response
      });
  };

  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
      <br />
      <br />
      <br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(event) => setFormData({ ...formData, name: event.target.value })}
        /> <br />
        <br />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(event) => setFormData({ ...formData, email: event.target.value })}
        />
        <br />
        <br />
        <textarea
          name="description"
          value={formData.description}
          onChange={(event) => setFormData({ ...formData, description: event.target.value })}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>


    </div>
  );
}

export default App;
