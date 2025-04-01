import { useRef, useState, useEffect } from "react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [form, setform] = useState({ site: "", password: "", username: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const passwordRef = useRef();
  const ref = useRef();

  const getpasswords = async () => {
    let req = await fetch("https://localhost:3000/");
    let passwords = await req.json();
    setpasswordArray = passwords;
  };
  useEffect(() => {
    getpasswords();
  }, []);

  const showpassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.innerHTML == "Show") {
      ref.current.innerHTML = "Hide";
    } else if ((ref.current.innerHTML = "Hide")) {
      ref.current.innerHTML = "Show";
      passwordRef.current.type = "password";
    }
  };

  const handlechange = (e) => {
    // console.log(...form)
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const save = async () => {
    console.log(form);
    console.log([...passwordArray]);
    //If any such id exists in db , Delete it..
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: form.id }),
    });
    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: uuidv4() }),
    });
    // localStorage.setItem("password", JSON.stringify([...passwordArray, {...form,id: uuidv4()}]));
    setform({ site: "", username: "", password: "" });
    // console.log([...passwordArray, form]);
  };

  const deletePassword = async (id) => {
    console.log("Delete", id);
    let c = confirm("Delete ? ");

    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      // setpasswordArray([...passwordArray, {form,id: uuidv4()}]);
      // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
      let res = await fetch("https://loaclhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id }),
      });
    }
    // console.log([...passwordArray, form]);
  };

  const editpassword = (id) => {
    console.log("edit", id);
    setform({ ...passwordArray.filter((item) => item.id === id)[0], id: id });
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("🦄 Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div class="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <div className="container mx-auto">
          <h1 className="font-sans font-bold text-center text-red-900">
            Password Manager
          </h1>
          <p className="text-green-800 font-bold text-center">
            Your Personalised Password Manager
          </p>
          <div className="text-white flex flex-col p4 items-center gap-4">
            <input
              onChange={handlechange}
              value={form.site}
              placeholder="Enter Website URL"
              className="rounded-full border-2 border-green-600 text-black px-2 w-full py-1 gap-2 my-2 max-w-4xl mx-auto"
              type="text"
              name="site"
              id="site"
            />
            <div className="flex gap-8 w-full justify-between">
              <input
                id="username"
                onChange={handlechange}
                value={form.username}
                placeholder="Enter Username"
                className="rounded-full border-2 border-green-600 text-black py-1 p-4 w-full"
                type="text"
                name="username"
              />
              <div className="relative">
                <span
                  ref={ref}
                  className="absolute right-2 top-1 text-black cursor-pointer font-bold "
                  onClick={showpassword}
                >
                  Show
                </span>
                <input
                  id="password"
                  ref={passwordRef}
                  value={form.password}
                  onChange={handlechange}
                  placeholder="Enter Password"
                  className="rounded-full border-2 border-green-600 text-black py-1 p-4 w-full"
                  type="password"
                  name="password"
                />
              </div>
            </div>
            <button
              onClick={save}
              className="text-black bg-green-500 rounded-full w-fit p-2 px-4"
            >
              Save Password
            </button>
          </div>

          <div className="passwords">
            <h2 className="text-white">Your Passwords</h2>
            {passwordArray.length === 0 && (
              <div className="text-white">No passwords to Show</div>
            )}
            {passwordArray.length != 0 && (
              <table className="table-auto w-full text-white">
                <thead className=" bg-green-800 text-white">
                  <tr>
                    <th>Site</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="text-center flex justify-center items-center gap-5 ">
                            <a href="item.site" target="_blank">
                              {item.site}
                            </a>
                            <img
                              onClick={() => {
                                copyText(item.site);
                              }}
                              src="/public/copy.png"
                              className="invert h-4 p-0 cursor-pointer"
                              alt="Copy"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="text-center flex justify-center items-center gap-5">
                            {item.username}
                            <img
                              onClick={() => {
                                copyText(item.username);
                              }}
                              src="/public/copy.png"
                              className="invert h-4 p-0 cursor-pointer"
                              alt="Copy"
                            />
                          </div>
                        </td>

                        <td>
                          <div className="text-center flex justify-center items-center gap-5">
                            {"*".repeat(item.password.length)}
                            <img
                              onClick={() => {
                                copyText(item.password);
                              }}
                              src="/public/copy.png"
                              className="invert h-4 p-0 cursor-pointer"
                              alt="Copy"
                            />
                          </div>
                        </td>
                        <td className="flex items-center justify-center gap-10">
                          <span
                            onClick={() => {
                              editpassword(item.id);
                            }}
                          >
                            <img
                              className="invert h-5 cursor-pointer"
                              src="./public/edit.svg"
                              alt="Edit"
                            />
                          </span>

                          <span
                            className="invert cursor-pointer"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              color="#000000"
                              fill="none"
                            >
                              <path
                                d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              />
                              <path
                                d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              />
                              <path
                                d="M9.5 16.5L9.5 10.5"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              />
                              <path
                                d="M14.5 16.5L14.5 10.5"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              />
                            </svg>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
