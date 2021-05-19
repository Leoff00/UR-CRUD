import "./Header.scss";

export default function Home(props) {
  return (
    <header>
      <span className="headerTitle">
        UR CRUD |
        <p className="headerSubTitle">
          Create, Read, Update and Delete Fake datas.
        </p>
      </span>
    </header>
  );
}
