import "./Content.scss";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { API } from "../../Api";
import { css } from "@emotion/core";

import ClipLoader from "react-spinners/ClipLoader";

import axios from "axios";

//reset input states
const initialState = {
  name: "",
  email: "",
  age: 0,
};

export default function Content(props) {
  const [didmount, setDidmount] = useState(true);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  let [loading, setLoading] = useState(true);

  // eslint-disable-next-line no-unused-vars
  let [color, setColor] = useState("##1d251f;");

  //centering the loader.
  const override = css`
    display: block;
    margin: 0 auto;
  `;

  const history = useHistory();
  const values = { name, email, age };

  //get/load req the api
  useEffect(() => {
    setDidmount(true); //component main

    (async function getContents() {
      try {
        const { data } = await axios.get(`${API}/users`);
        setUsers(data);
        if (data) {
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      setDidmount(false);
    };
  }, [users]);

  //post req to the api
  async function submit(e) {
    e.preventDefault();

    if (name === "" || email === "" || age === "") {
      alert("Please fill the fields.");
      return;
    } else if (age <= 0) {
      alert("Please enter a valid number.");
      return;
    } else if (age > 100) {
      alert("Please enter a valid number.");
      return;
    }

    try {
      const { data } = await axios.post(`${API}/create`, values);
      const newData = [...users, data];
      alert("Data successfully registered!");
      setUsers(newData);
      history.push("/users");
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

  //redirect to put req (edit) datas of the api.
  function handleUpdate(user) {
    history.push(`/edit/${user._id}`);
  }

  //delete req datas of the api.
  async function handleDelete(user) {
    try {
      await axios.delete(`${API}/delete/${user._id}`);
      setUsers(users.filter((deletedUser) => user._id !== deletedUser.id));
      alert("Data deleted successfully!");
    } catch (err) {
      console.log(err);
    }
  }

  //component Content unmount.
  if (!didmount) {
    return null;
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
          <tr className="header">
            <th scope="row">Name</th>
            <th scope="row">Email</th>
            <th scope="row">Age</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <ClipLoader
                color={color}
                size="50px"
                css={override}
                loading={loading}
              />
            </td>
          </tr>

          {/* Loading the api in HTML */}
          {users.map((user) => (
            <tr className="tableContent" key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td id="edit">
                <button
                  onClick={() => handleUpdate(user)}
                  className="btn btn-outline-info"
                >
                  <i className="fa fa-pencil"></i>
                </button>
              </td>
              <td id="delete">
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
