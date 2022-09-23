import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";

export default function FormAction() {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [record, setRecord] = useState({
    Studentname: "",
    StudentId: "",
    TeacherName: "",
    TeacherId: "",
  });

  const { Studentname, TeacherName, StudentId, TeacherId } = record;

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(record);
    if (Studentname !== "" && TeacherName !== "" && TeacherId !== 0 && StudentId !== 0) {
      if (id) {
        fetch(
          "https://632dc0152cfd5ccc2af62cde.mockapi.io/users" + id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(record),
          }
        )
          .then((value) => value.json())
          .then((response) => navigate("/"))
          .catch((err) => alert(err));
      } else {
        fetch("https://632dc0152cfd5ccc2af62cde.mockapi.io/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record),
        })
          .then((value) => value.json())
          .then((response) => navigate("/"))
          .catch((err) => alert(err));
      }
    } else {
      alert("Enter all fields");
    }
  };

  useEffect(() => {
    if (id)
      fetch("https://632dc0152cfd5ccc2af62cde.mockapi.io/users" + id)
        .then((data) => data.json())
        .then((response) => setRecord(response));
  }, [id]);
  return (
    <div className="info" >
      <h1 className="head" >{id ? "Update" : "Create"} Record</h1>
      <div className="record">
      
      <input
        type="text"
        name="Studentname"
        value={Studentname}
        placeholder="Student Name"
        onChange={handleChange}
      />
      <div/>
      <input
        type="number"
        name="StudentId"
        placeholder="Student Id"
        value={StudentId}
        onChange={handleChange}
      />
      <div/>
      <input
        type="text"
        name="TeacherName"
        value={TeacherName}
        placeholder="Teacher Name"
        onChange={handleChange}
      />
      <div/>
      <input
        type="number"
        name="TeacherId"
        value={TeacherId}
        placeholder="Teacher Id"
        onChange={handleChange}
      />
      <div/>
      </div>
      <div className="btn">
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      </div>
    </div>
  );
}