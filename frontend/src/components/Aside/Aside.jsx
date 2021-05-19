import "./Aside.scss";
import { Link } from "react-router-dom";
import pic1 from "../../assets/img/home.svg";
import pic2 from "../../assets/img/user.svg";
import { useState } from "react";

export default function Aside(props) {
  const titles = {
    home: "UR CRUD | HOME",
    users: "UR CRUD | USERS",
  };

  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState(titles);

  function handleTitleHome() {
    document.title = title.home;
  }

  function handleTitleUsers() {
    document.title = title.users;
  }

  return (
    <aside>
      <Link onClick={handleTitleHome} className="asideA" to="/">
        <img className="asideImg" src={pic1} alt="Home" />
        <span className="asideText">Home</span>
      </Link>
      <Link onClick={() => handleTitleUsers()} className="asideA" to="/users">
        <img className="asideImg" src={pic2} alt="Users" />
        <span className="asideText">Users</span>
      </Link>
    </aside>
  );
}
