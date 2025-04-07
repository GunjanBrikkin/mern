import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Details = ({ onCreate }) => {
  const [task, setTask] = useState("");
  const [userName, setUserName] = useState("");
  const [responseData, setResponseData] = useState(null);

  const handleClick = async (e) => {
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
        body: JSON.stringify({
          task,
          user_name: userName,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const uuidInjection = {
          unique_id: uuidv4(),
          ...responseData,
        };
        console.log("uuidInjection", uuidInjection);
      }

      if (res.ok && onCreate) {
        onCreate();
        setTask("");
        setUserName("");
      }

      setResponseData(data);
      console.log("data is ===>>", data);
    } catch (error) {
      console.log(
        "error while creating the to do list from react UI !!",
        error
      );
    }
  };

  // Helper to get error message for a field
  const getErrorMessage = (fieldName) => {
    const errorObj = responseData?.find?.((err) => err.path === fieldName);
    return errorObj ? errorObj.msg : null;
  };

  return (
    <form className="ui form">
      <div className="field">
        <label>Make a todo !</label>
        <input
          type="text"
          name="task"
          placeholder="like , finance learning ..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        {getErrorMessage("task") && (
          <div className="ui pointing red basic label">
            {getErrorMessage("task")}
          </div>
        )}
      </div>

      <div className="field">
        <label>User Name</label>
        <input
          type="text"
          name="user_name"
          placeholder="assign by to ..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        {getErrorMessage("user_name") && (
          <div className="ui pointing red basic label">
            {getErrorMessage("user_name")}
          </div>
        )}
      </div>

      <button className="ui button" type="submit" onClick={handleClick}>
        Submit
      </button>
    </form>
  );
};

export default Details;
