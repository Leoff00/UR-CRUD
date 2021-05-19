import "./Content.scss";

import axios from "axios";
import { useEffect, useState } from "react";
import { Api } from "../../Api";

//reset input states
const initialState = {
  name: "",
  email: "",
  age: 0,
};

export default function Content(props) {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  const values = { name, email, age };

  //get/load the mock api
  useEffect(() => {
    (async function getContents() {
      try {
        const { data } = await axios.get(Api);
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      // console.log('Unmount the component');
    };
  }, []);

  //post req to the mock api
  async function submit(e) {
    e.preventDefault();

    if (name === "" || email === "" || age === "") {
      alert("Por favor, preencha os dados.");
      return;
    } else if (age <= 0) {
      alert("Por favor, digite um número válido.");
      return;
    }
    try {
      const { data } = await axios.post(Api, values);
      const newData = [...users, data]; //adding the new data with the current data
      setUsers(newData);
    } catch (err) {
      console.log(err);
    }
  }

  //clear fields in the cancel button
  function clearFields() {
    setName(initialState.name);
    setEmail(initialState.email);
    setAge(initialState.age);
  }

  //put req (edit) datas of mock api.
  async function handleUpdate(user) {
    console.log(user.id);
  }

  //delete req datas of mock api.
  async function handleDelete(user) {
    try {
      await axios.delete(`${Api}/${user.id}`);
      setUsers(users.filter((deletedUser) => user.id !== deletedUser.id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="contentApp">
      <h1 className="contentTitle">Welcome to UR CRUD.</h1>

      <h2 className="contentSubTitle">
        Type anything and simulate a real registration situation.
      </h2>

      <form>
        <div className="inputContainer">
          <label className="contentLabel" htmlFor="Name">
            Name:{" "}
          </label>
          <input
            className="contentInput"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name..."
          />

          <label className="contentLabel" htmlFor="Email">
            Email:{" "}
          </label>
          <input
            className="contentInput"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type your email..."
          />

          <label className="contentLabel" htmlFor="Age">
            Age:{" "}
          </label>
          <input
            className="contentInput"
            type="Number"
            min={1}
            max={100}
            onChange={(e) => setAge(Number(e.target.value))}
            name="age"
            value={age}
            placeholder="Type your age..."
          />
        </div>

        <div className="containerButton">
          <button
            type="button"
            onClick={(e) => submit(e)}
            className="contentButton"
          >
            Save
          </button>
          <button
            type="button"
            onClick={(e) => clearFields(e.target.value)}
            className="contentButton"
          >
            Cancel
          </button>
        </div>
      </form>
      <hr />

      <table className="table">
        <thead>
          <tr>
            <th scope="row">Id</th>
            <th scope="row">Name</th>
            <th scope="row">Email</th>
            <th scope="row">Age</th>
          </tr>
        </thead>

        <tbody>
          {/* Loading the api in HTML */}
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td className="tdContainerButton">
                <button
                  onClick={() => handleUpdate(user)}
                  className="btn btn-outline-info"
                >
                  <i className="fa fa-pencil"></i>
                </button>
                <button
                  onClick={() => handleDelete(user)}
                  className="btn btn-outline-danger ml-2"
                >
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
    </div>
  );
}
