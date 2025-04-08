import { useEffect, useState } from "react";

const Fun = ({ refresh }) => {
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editField, setEditField] = useState(""); // 'task', 'status', 'user_name'
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    console.log("Refresh triggered with value: ", refresh);
    const fetchData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDMxNTM2OTksImV4cCI6MTc3NDY4OTY5OX0.StMtsNpxqP12mebrZzyfGKH_PmQdoylLj-7KZqJ5fmw";

        const res = await fetch("http://localhost:5000/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authentication-Token": token,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setList(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleEdit = (id, value, field) => {
    setEditId(id);
    setEditField(field);
    setEditValue(value);
  };

  const handleInputChange = (e) => {
    setEditValue(e.target.value);
  };

  const deletePerReq = async (id) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDMxNTM2OTksImV4cCI6MTc3NDY4OTY5OX0.StMtsNpxqP12mebrZzyfGKH_PmQdoylLj-7KZqJ5fmw";

      console.log("id ===", id);
      const callingApi = await fetch("http://localhost:5000/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authentication-Token": token,
        },
        body: JSON.stringify({ id: id }),
      });

      if (callingApi.ok) {
        console.log("hiii");
        setList(list.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log(
        "Error while the deleting the record in the deletePerReq fumction and the error is ==>",
        error
      );
    }
  };

  const handleSave = async (id) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDMxNTM2OTksImV4cCI6MTc3NDY4OTY5OX0.StMtsNpxqP12mebrZzyfGKH_PmQdoylLj-7KZqJ5fmw";

      const response = await fetch("http://localhost:5000/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authentication-Token": token,
        },
        body: JSON.stringify({
          id,
          [editField]: editValue,
        }),
      });

      if (response.ok) {
        const updatedList = list.map((item) =>
          item._id === id ? { ...item, [editField]: editValue } : item
        );
        setList(updatedList);
        setEditId(null);
        setEditField("");
        setEditValue("");
      }
    } catch (error) {
      console.log("error while saving edit:", error);
    }
  };

  return (
    <div>
      <h3>To do records !!</h3>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>User Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={index}>
              <td>
                {editId === item._id && editField === "task" ? (
                  <>
                    <input
                      value={editValue}
                      onChange={handleInputChange}
                      placeholder="Edit task!"
                    />
                    <button onClick={() => handleSave(item._id)}>Save</button>
                    <button
                      onClick={() => {
                        setEditId(null);
                        setEditField("");
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {item.task}
                    <i
                      className="edit outline icon"
                      onClick={() => handleEdit(item._id, item.task, "task")}
                    ></i>
                  </>
                )}
              </td>

              <td>
                {editId === item._id && editField === "status" ? (
                  <>
                    <input value={editValue} />
                  </>
                ) : (
                  <>
                    {item.status}
                    <i
                      className="edit outline icon"
                      onClick={() =>
                        handleEdit(item._id, item.status, "status")
                      }
                    ></i>
                  </>
                )}
              </td>

              <td>
                {editId === item._id && editField === "user_name" ? (
                  <>
                    <input
                      value={editValue}
                      onChange={handleInputChange}
                      placeholder="Edit user name!"
                    />
                    <button onClick={() => handleSave(item._id)}>Save</button>
                    <button
                      onClick={() => {
                        setEditId(null);
                        setEditField("");
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {item.user_name}
                    <i
                      className="edit outline icon"
                      onClick={() =>
                        handleEdit(item._id, item.user_name, "user_name")
                      }
                    ></i>
                  </>
                )}
              </td>

              <td>
                <button
                  className="ui button red"
                  onClick={() => {
                    deletePerReq(item._id);
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fun;
