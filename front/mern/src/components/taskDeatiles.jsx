import { useState } from "react";

const Details = () => {
  const [responseData, setResponseData] = useState(null);

  const HandleClick = async (e) => {
    e.preventDefault();
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDMxNTM2OTksImV4cCI6MTc3NDY4OTY5OX0.StMtsNpxqP12mebrZzyfGKH_PmQdoylLj-7KZqJ5fmw";

      const res = await fetch("http://localhost:5000/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authentication-Token": token,
        },
      });

      const data = await res.json();
      setResponseData(data);
      console.log("data is ===>>", data);
    } catch (error) {
      console.log(
        "error while creating the to do list from react UI !!",
        error
      );
    }
  };

  return (
    <form className="ui form">
      <div className="field">
        <label>Make a todo !</label>
        <input
          type="text"
          name="first-name"
          placeholder="like , finance learning ..."
        />
      </div>
      <div className="field">
        <label>User Name</label>
        <input type="text" name="last-name" placeholder="assign by to ..." />
      </div>
      <h1>eee </h1>{" "}
      {responseData.forEach((element) => {
        element.type;
      })}
      <button className="ui button" type="submit" onClick={HandleClick}>
        Submit
      </button>
    </form>
  );
};

export default Details;
