import { useState } from "react";
import styles from "../styles/Signup.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [nameError, setnameError] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [passError, setpassError] = useState(false);
  const [confirmpassError, setconfirmpassError] = useState(false);

  const isValid = (regex, string) => {
    const check = regex.test(string);
    return check;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setconfirmpassError(false);
    setemailError(false);
    setnameError(false);
    setpassError(false);

    if (!isValid(/^[a-zA-Z-' ]+$/, formData.name)) {
      setnameError(true);
    }
    if (
      !isValid(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        formData.email
      )
    ) {
      setemailError(true);
    }
    if (!isValid(/^.{8,}$/, formData.password)) {
      setpassError(true);
    }
    if (!(formData.password === formData.confirmpassword)) {
      setconfirmpassError(true);
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmpassword
    ) {
      toast.warning("All the fields are required!!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (
      isValid(/^[a-zA-Z-' ]+$/, formData.name) &&
      isValid(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        formData.email
      ) &&
      isValid(/^.{8,}$/, formData.password) &&
      formData.password === formData.confirmpassword
    ) {
      try {
        setisLoading(true);
        const response = await axios.post(
          "https://quizz-finalproject-1.onrender.com/api/auth/signup",
          formData
        );

        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setformData({
          name: "",
          email: "",
          password: "",
          confirmpassword: "",
        });

        setisLoading(false);
      } catch (error) {
        setisLoading(false);
        console.log(error);
        toast.error(error.response?.data?.message || "Registration failed!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <div className={styles.form_div}>
      <div className={styles.input_div}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />

        {nameError ? <p>Invalid Name</p> : ""}
      </div>
      <div className={styles.input_div}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />

        {emailError ? <p>Invalid Email</p> : ""}
      </div>
      <div className={styles.input_div}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />

        {passError ? <p>Weak Password(min 8 chars)</p> : ""}
      </div>
      <div className={styles.input_div}>
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          type="password"
          name="confirmpassword"
          id="confirmpassword"
          value={formData.confirmpassword}
          onChange={handleChange}
        />

        {confirmpassError ? <p>password does not match</p> : ""}
      </div>
      <div className={styles.btn_div}>
        <button onClick={handleSubmit}>
          {isLoading ? "Please Wait..." : "Sign up"}
        </button>
      </div>
    </div>
  );
};

export default Signup;
