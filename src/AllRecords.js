import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function AllRecords() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getData = () => {
    fetch("https://632dc0152cfd5ccc2af62cde.mockapi.io/users")
      .then((data) => data.json())
      .then((response) => setData(response));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    fetch("https://632dc0152cfd5ccc2af62cde.mockapi.io/users" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((value) => value.json())
      .then((response) => {
        console.log("delete completed");
        getData();
      });
  };

  return (
    <div className="data">
      <div className="create">
      <button className="pri" onClick={() => navigate("/actionItems")}>Create Record</button>
      </div>
      {data.map((value, index) => {
        return (
          <ul className="list">
            <li>Student Name : {value.Studentname}</li>
            <li>Student ID : {value.StudentId}</li>
            <li>Teacher Name : {value.TeacherName}</li>
            <li>Teacher ID : {value.TeacherId}</li>
            <div className="bttn">
              <button className="edit"
                onClick={() => {
                  navigate("/actionItems/" + value.id + "/" + value.Studentname);
                }}
              >
                Edit
              </button>
              <button className="del"
              onClick={() => handleDelete(value.id)}>
                Delete
              </button>
            </div>
          </ul>
        );
      })}
    </div>
  );
}