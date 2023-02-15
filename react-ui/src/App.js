
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [imagedata, setImagedata] = useState("");
  const [imagePrev, setImageFile] = useState("");

  const [registerInput, setRegister] = useState({
    name: '',
    email: '',
    description: '',
    image: "",
  });

  const handleChange = (file) => {
    setImageFile(URL.createObjectURL(file[0]));
    setImagedata(file[0]);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fData = new FormData();
    fData.append("name", registerInput.name);
    fData.append("email", registerInput.email);
    fData.append("description", registerInput.description);
    fData.append("image", imagedata);

    axios.post(`http://192.168.0.208:81/reactjs-laravel-api/laravel-ui/public/api/store`, fData).then((res) => {
      if (res.data.status === 200) {
        return 'okay';
      }
    });
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://192.168.0.208:81/reactjs-laravel-api/laravel-ui/public/api/post`).then((res) => {
      if (res.status === 200) {
        setData(res.data);
      }
    });
  }, []);

  return (
    <div className="App">

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <br />
        <br />
        <br />
        <input
          type="text"
          name="name"
          onChange={handleInput}
          value={registerInput.name}
        /> <br />
        <br />

        <input
          type="email"
          name="email"
          onChange={handleInput}
          value={registerInput.email}
        />
        <br />
        <br />
        <textarea
          name="description"
          onChange={handleInput}
          value={registerInput.description}
        />
        <br />
        <br />

        {imagePrev ? (
          <img
            src={imagePrev}
            className="demo-preview-image img-fluid"
            alt=""
            style={{
              height: "200px",
              width: "300px",
            }}
          />
        ) : (
          ""
        )}
        <input
          type="file"
          onChange={(e) => handleChange(e.target.files)}
          id="image"
          name="image"
        />

        <button type="submit">Submit</button>
      </form>

      <br />
      <br />

      {data.map((item, index) => (<div key={index}>
        <small>{item.id} : {item.name}</small>
      </div>))}

    </div>
  );
}

export default App;

