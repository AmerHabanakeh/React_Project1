import { useContext, useState } from "react";
import Header from "../../../Components/Header";
import { User } from "../Context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Cookies from "universal-cookie";

export default function SignUp1() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [Err, setErr] = useState(false);
  const nav = useNavigate();

  // Get User
  const user = useContext(User);

  // Cookie
  const cookie = new Cookies();

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      let res = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });
      const token = res.data.data.token;
      cookie.set("Bearer", token, { path: "/" });
      const userDetails = res.data.data.user;
      user.setAuth({ token, userDetails });
      nav("/dashboard");
    } catch (err) {
      if (err.response.status === 401) {
        setErr(true);
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
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

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

            <div style={{ textAlign: "center" }}>
              <button type="submit">Login</button>
            </div>
            {accept && Err && <p className="error">Wrong Email Or Password</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
