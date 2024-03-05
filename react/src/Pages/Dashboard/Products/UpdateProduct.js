import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function UpdateProduct() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [accept, setAccept] = useState(false);
  const nav = useNavigate();

  const id = window.location.pathname.split("/").slice(-1)[0];

  const context = useContext(User);
  const token = context.auth.token;

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {
        console.log(data);
        setTitle(data.data[0].title);
        setDesc(data.data[0].description);
      })
      .catch((err) => console.log(err));
  }, []);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", desc);
      formData.append("image", img);
      let res = await axios.post(
        `http://127.0.0.1:8000/api/product/update/${id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      nav("/dashboard/products");
    } catch (err) {
      console.log(err);
      setAccept(true);
    }
  }

  return (
    <div>
      <div>
        <div>
          <form onSubmit={Submit}>
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {title.length < 1 && accept && (
              <p className="error">Title Must Be More Than 1 Char</p>
            )}

            <label htmlFor="desc">Description:</label>
            <input
              id="desc"
              type="text"
              placeholder="Description..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />

            {/* {accept && emailError && (
              <p className="error">Email is Already been Taken</p>
            )} */}

            <label htmlFor="img">Image:</label>
            <input
              id="img"
              type="file"
              placeholder="image..."
              onChange={(e) => setImg(e.target.files.item(0))}
            />
            {/* {password.length < 8 && accept && (
              <p className="error">Password Must be More Than 8 Char</p>
            )} */}

            <div style={{ textAlign: "center" }}>
              <button className="btn" type="submit">
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
