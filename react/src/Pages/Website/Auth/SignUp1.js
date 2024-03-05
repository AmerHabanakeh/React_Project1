import { useContext, useState } from "react";
import Header from "../../../Components/Header";
import { User } from "../Context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./login.css";

export default function SignUp1() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const nav = useNavigate();

  // Get User
  const user = useContext(User);

  // Cookie
  const cookie = new Cookies();

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      let res = await axios.post("http://127.0.0.1:8000/api/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordR,
      });
      const token = res.data.data.token;
      cookie.set("Bearer", token , {path: "/"});
      const userDetails = res.data.data.user;
      user.setAuth({ token, userDetails });
      nav("/dashboard");
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
      }
      setAccept(true);
    }
  }

  return (
    <div>
      {" "}
      <Header />
      <div className="parent login">
        <div className="register login">
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
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
