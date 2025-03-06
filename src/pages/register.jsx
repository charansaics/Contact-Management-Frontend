import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const username = e.target.username.value.trim();
        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();

        if (!username || !email || !password) {
            alert("All fields are required.");
            return;
        }

        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

            const response = await fetch(`${baseUrl}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });

            if(response.status===400){
                alert("User already exists with this email");
                navigate("/");
            };

            const data = await response.json();
            console.log("response:", data);
            navigate("/");
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-beige-300">
            <div className="bg-beige-400 p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6">Register</h1>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input type="text" id="username" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input type="password" id="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;