import React from "react";
import { useRef, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [PasswordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("password");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const ShowPassword = () => {
        passwordRef.current.type = "text";
        if (ref.current.src.includes("/eyecross.png")) {
            ref.current.src = "/eye.png";
            passwordRef.current.type = "password";
        } else {
            passwordRef.current.type = "text";
            ref.current.src = "/eyecross.png";
        }
    };

    const copytext = (text) => {
        toast("Copied To Clipboard!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    };

    const SavePassword = () => {
        if (form.site.length > 4 && form.username.length > 4 && form.password.length > 4) {
            console.log(form);
            setPasswordArray([...PasswordArray, { ...form, id: uuidv4() }]);
            localStorage.setItem(
                "password",
                JSON.stringify([...PasswordArray, { ...form, id: uuidv4() }])
            );
            console.log(PasswordArray);
            setform({ site: "", username: "", password: "" });
            toast("Password Saved", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast("All fields should be filled!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };
    const DeletePassword = (id) => {
        console.log("Delete id is", id);

        let c = confirm("Are you sure you want to delete this password?");
        if (c) {

            setPasswordArray(PasswordArray.filter((item) => item.id !== id));
            localStorage.setItem(
                "password",
                JSON.stringify(PasswordArray.filter((item) => item.id !== id))
            );

        }
        toast("Password Deleted!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };
    const EditPassword = (id) => {
        console.log("Edit id is", id);
        setform(PasswordArray.filter(i => i.id === id)[0])
        setPasswordArray(PasswordArray.filter(item => item.id !== id));
    };

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
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
                theme="dark"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full ">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>

            <div className="p-3 md:mycontainer min-h-[91vh] w-full">
                <h1 className="text-4xl text font-bold text-center">
                    <span className="text-green-500">&lt;</span>
                    <span>Pass</span>
                    <span className="text-green-500">OP/&gt;</span>
                </h1>

                <p className="text-green-900 text-lg text-center">
                    Your Password Manager
                </p>
                <div className=" flex flex-col p-4 text-black gap-8 items-center">
                    <input
                        placeholder="Enter Website URL"
                        value={form.site}
                        onChange={handlechange}
                        className="rounded-full border border-green-500 w-full p-4 py-1"
                        type="text"
                        name="site"
                        id="site"
                    />
                    <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
                        <input
                            placeholder="Enter Username"
                            value={form.username}
                            onChange={handlechange}
                            className="rounded-full border border-green-500 w-full p-4 py-1"
                            type="text"
                            name="username"
                            id="username"
                        />
                        <div className="relative">
                            <input
                                placeholder="Enter Password"
                                ref={passwordRef}
                                value={form.password}
                                onChange={handlechange}
                                className="rounded-full border border-green-500 w-full p-4 py-1"
                                type="password"
                                name="password"
                                id="password"
                            />
                            <span
                                className="absolute right-[3px] top-[4px] cursor-pointer"
                                onClick={ShowPassword}
                            >
                                <img
                                    ref={ref}
                                    className="p-1"
                                    width={25}
                                    src="/eye.png"
                                    alt="eye"
                                />
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={SavePassword}
                        className="flex justify-center font-semibold items-center bg-green-500 hover:bg-green-300  rounded-full px-8 py-2 w-fit gap-2 border border-green-900"
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="hover"
                            colors="primary:#000000,secondary:#000000"
                        ></lord-icon>
                        Save
                    </button>
                </div>
                <div className="passwords">
                    <h2 className="text-green-700 text-2xl py-4  font-bold text-center">
                        Your Passwords
                    </h2>
                    {PasswordArray.length === 0 && <div> No password to show</div>}
                    {PasswordArray.length != 0 && (
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {PasswordArray.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="py-2  border border-white text-center  ">
                                                <div className="flex justify-center items-center">
                                                    <a href={item.site} target="_blank">
                                                        {item.site}
                                                    </a>
                                                    <div
                                                        className="logo w-12 p-2 flex justify-center text"
                                                        onClick={() => {
                                                            copytext(item.site);
                                                        }}
                                                    >
                                                        <img
                                                            className="w-full cursor-pointer"
                                                            src="/copy.gif"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 border border-white text-center ">
                                                <div className="flex justify-center items-center">
                                                    <span> {item.username}</span>

                                                    <div
                                                        className="logo w-12 p-2 flex justify-center text-2xl"
                                                        onClick={() => {
                                                            copytext(item.username);
                                                        }}
                                                    >
                                                        <img
                                                            className="w-full cursor-pointer"
                                                            src="/copy.gif"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 border border-white text-center ">
                                                <div className="flex justify-center items-center">
                                                    <span> {item.password}</span>

                                                    <div
                                                        className="logo w-12 p-2 flex justify-center text-2xl"
                                                        onClick={() => {
                                                            copytext(item.password);
                                                        }}
                                                    >
                                                        <img
                                                            className="w-full cursor-pointer"
                                                            src="/copy.gif"
                                                            alt="Copy"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 border border-white text-center ">
                                                <div className="flex justify-center items-center">
                                                    <span>
                                                        <div
                                                            className="logo w-12 p-2 flex justify-center text-2xl"
                                                            onClick={() => {
                                                                EditPassword(item.id);
                                                            }}
                                                        >
                                                            <img
                                                                className="w-full cursor-pointer"
                                                                src="/Edit V2.gif"
                                                                alt="Edit"
                                                            />
                                                        </div>
                                                    </span>
                                                    <span>
                                                        <div
                                                            className="logo w-12 p-2 flex justify-center text-2xl"
                                                            onClick={() => {
                                                                DeletePassword(item.id);
                                                            }}
                                                        >
                                                            <img
                                                                className="w-full cursor-pointer"
                                                                src="/delete.gif"
                                                                alt="Delete"
                                                            />
                                                        </div>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
