import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { User } from "../../Website/Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);
  let id = window.location.pathname.split("/").slice(-1)[0];

  const context = useContext(User);
  const token = context.auth.token;

  const nav = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data[0].name);
        setEmail(data[0].email);
      });
  }, []);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/user/update/${id}`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordR,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      nav("/dashboard/users");
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
      }
      setAccept(true);
    }
  }

  return (
    <>
      <h1>Update User</h1>
      <div>
        <div>
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
                <button className="btn" type="submit">
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
