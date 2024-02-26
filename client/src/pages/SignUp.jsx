import React, { useState } from "react";
import { Button, Label, Navbar, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  console.log("form data:", formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Success:", result);
      if (result.success === false) {
        setError(result.message);
      } else {
        setLoading(false);
        navigate("/sign-in");
      }
    } catch {}
  };
  return (
    <div className="min-h-screen mt-20">
      <div className=" p-3 flex max-w-3xl mx-auto flex-col md:flex-row md:items-center  gap-5">
        <div className="flex-1">
          {" "}
          <h1 className="font-bold text-4xl dark:text-white ">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 rounded-lg text-white">
              Sahand's
            </span>
            Blog
          </h1>
          <p className="mt-5 text-sm text-gray-600">
            This is a demo project. You can sign in with your email and password
            or with Google.
          </p>
        </div>
        <div className="flex-1">
          <form className=" flex flex-col gap-4 ">
            <div>
              <Label htmlFor="username">Username</Label>
              <TextInput
                id="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <TextInput
                id="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <TextInput
                id="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              className="py-2"
              size="xs"
              onClick={handleSubmit}
            >
              Sign in
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-4">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
