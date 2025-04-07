import { useEffect, useState } from "react";
import { ObjectId } from "mongodb";

const Fun = ({ refresh }) => {
  const [list, setList] = useState([]);

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

  // const handleEdit = async (_id) => {
  //   try {

  //   } catch (error) {
  //     console.log("error while edit the data , and the error is ====>>", error);
  //   }
  // };

  return (
    <div>
      <h3>To do records !!</h3>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>task</th>
            <th>status</th>
            <th>user_name</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={index}>
              <td>
                {item.task}
                <i
                  className="edit outline icon"
                  onClick={() => {
                    handleEdit(item._id);
                  }}
                ></i>
              </td>
              <td>
                {item.status} <i className="edit outline icon"></i>
              </td>
              <td>
                {item.user_name} <i className="edit outline icon"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fun;
