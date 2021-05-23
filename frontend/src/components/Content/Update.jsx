import "./Content.scss";

import { useState } from "react";
import { useHistory } from "react-router-dom";

import { API } from "../../Api";

import axios from "axios";

export default function Update(props) {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  const history = useHistory();
  const values = { name, email, age };

  const _id = props.match.params._id;

  //put req
  async function submit(e) {
    e.preventDefault();

    if (name === "" || email === "" || age === "") {
      alert("Please fill the fields.");
      return;
    } else if (age <= 0) {
      alert("Please enter a valid number.");
      return;
    }
    try {
      const { data } = await axios.put(`${API}/edit/${_id}`, values);
      const newData = [...users, data];
      setUsers(newData);
      alert("Successfully changed data!");
    } catch (err) {
      console.log(err);
    }
  }

  function Back() {
    history.push("/users");
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
            onClick={() => Back()}
            className="contentButton"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
