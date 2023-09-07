import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useContactQuery, useUpdateContactMutation } from "../services/contactsApi";
import "./AddEditUser.css";

interface FormValue {
    id: string;
  name: string;
  email: string;
  contact: string;
}

const EditUser: React.FC = () => {
  const [formValue, setFormValue] = useState<FormValue>({
    id: "",
    name: "",
    email: "",
    contact: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [updateContact] = useUpdateContactMutation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading, isFetching } = useContactQuery(id || "");

  useEffect(() => {
    if (id) {
      setEditMode(true);
      if (data) {
        setFormValue({ ...data });
      }
    }
  }, [id, data]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formValue.name.trim() === "" || formValue.email.trim() === "" || formValue.contact.trim() === "") {
      toast.error("Please provide a value for each input field");
    } else {
      await updateContact(formValue);
      navigate("/");
      setEditMode(false);
      toast.success("Contact Updated Successfully");
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
          value={formValue.name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Your Email..."
          value={formValue.email}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="text"
          id="contact"
          name="contact"
          placeholder="Your Contact No. ..."
          value={formValue.contact}
          onChange={handleInputChange}
        />

        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default EditUser;
