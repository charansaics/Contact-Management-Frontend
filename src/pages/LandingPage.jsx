import React from "react";
import { useNavigate, Link } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_URL ; 

const LandingPage = () => {
    const navigate = useNavigate();

    async function loginUser(email, password) {
        try {
            const response = await fetch(`${baseUrl}api/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),  // ✅ Fix JSON.stringify
            });

            if (!response.ok) {
                const errorData = await response.json();  // ✅ Show actual error
                console.log("Error:", errorData?.message || "Unknown error");
                return null;
            }
            return await response.json();
        } catch (error) {
            console.log("Error:", error);
            return null;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        // console.log("Email:", email, "Password:", password);

        const data = await loginUser(email, password);
        if (data) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            navigate("/home", { state: { accessToken: data.accessToken, refreshToken: data.refreshToken } });
        }
    };

    return (
        <div className="h-screen flex">
            <div className="hidden lg:flex w-full lg:w-1/2 login_img_section justify-around items-center">
                <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
                    <h1 className="text-black font-bold text-4xl font-sans">Contact Book</h1>
                    <p className="text-black mt-1">The simplest app to use</p>
                </div>
            </div>
            <div className="flex w-full lg:w-1/2 justify-center items-center bg-beige-100 space-y-8">
                <div className="w-full px-8 md:px-32 lg:px-24">
                    <form className="bg-beige-500 rounded-md shadow-2xl p-5" onSubmit={handleSubmit}>
                        <h1 className="text-gray-800 font-bold text-2xl mb-1 lg:hidden">Contact Book</h1>
                        <p className="text-sm font-normal text-gray-600 mb-8 lg:hidden">Welcomes You !</p>
                        <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                            <input  id="email" className="pl-2 w-full outline-none border-none bg-beige-500" type="email" name="email" placeholder="Email Address" required />
                        </div>
                        <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl">
                            <input className="pl-2 w-full outline-none border-none" type="password" name="password" id="password" placeholder="Password" required />
                        </div>
                        <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                            Login
                        </button>
                        <div className="flex justify-center mt-4">
                            <Link to="/register" className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                                Don't have an account? <br></br>👆
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
