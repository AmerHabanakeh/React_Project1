import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./User.css";
import { User } from "../../Website/Context/UserContext";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const nav = useNavigate();

  const context = useContext(User);
  const token = context.auth.token;  

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      let res = await axios.post("http://127.0.0.1:8000/api/user/create" , {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordR,
      }, {
        headers: {
          Authorization: "Bearer " + token,
        }
      });
      nav("/dashboard/users");
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
      }
      setAccept(true);
    }
  }

  return (
    <div>
      <div >
        <div>
          <form onSubmit={Submit}>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              placeholder="Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {name.length < 2 && accept && (
              <p className="error">Name Must Be More Than 2 Char</p>
            )}

            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {accept && emailError && (
              <p className="error">Email is Already been Taken</p>
            )}

            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password.length < 8 && accept && (
              <p className="error">Password Must be More Than 8 Char</p>
            )}

            <label htmlFor="repeatPassword">Repeat Password:</label>
            <input
              id="repeatPassword"
              type="password"
              placeholder="Repeat Password..."
              value={passwordR}
              onChange={(e) => setPasswordR(e.target.value)}
            />

            {passwordR !== password && accept && (
              <p className="error">Password Does Not Matched</p>
            )}

            <div style={{ textAlign: "center" }}>
              <button className="btn" type="submit">Create User</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
