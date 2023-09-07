import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Home.css";
import { useContactsQuery, useDeleteContactMutation } from "../services/contactsApi";
import { Contact } from "../models/contact.model";

const Home: React.FC = () => {
  const { data, error } = useContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong!!!");
    }
  }, [error]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure that you want to delete that user?")) {
      await deleteContact(id);
      toast.success("Contact Deleted Successfully");
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <h2>React-RTK Query CRUD with Typescript and JSON Server</h2>
      <Link to="/add">
        <button className="btn btn-add">Add Contact</button>
      </Link>
      <br />
      <br />
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item: Contact, index: number) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => item.id && handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
