import React, { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddContactMutation } from "../services/contactsApi";
import "./AddEditUser.css";

interface FormValue {
    id: string
  name: string;
  email: string;
  contact: string;
}

const initialState: FormValue = {
    id: "",
  name: "",
  email: "",
  contact: "",
};

const AddUser: React.FC = () => {
  const [formValue, setFormValue] = useState<FormValue>(initialState);
  const [addContact] = useAddContactMutation();
  const navigate = useNavigate();

  const { name, email, contact } = formValue;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "" || contact.trim() === "") {
      toast.error("Please provide a value for each input field");
    } else {
      await addContact(formValue);
      navigate("/");
      toast.success("Contact Added Successfully");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          value={name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Your Email..."
          value={email}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="text"
          id="contact"
          name="contact"
          placeholder="Your Contact No. ..."
          value={contact}
          onChange={handleInputChange}
        />

        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default AddUser;
