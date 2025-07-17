import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditContact = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState({ name: "", email: "", phone: "" });

    useEffect(() => {
        const fetchContact = async () => {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
            const baseUrl = import.meta.env.VITE_API_BASE_URL + "/api"|| "http://localhost:5000/api";

            try {
                const response = await fetch(`${baseUrl}/contacts/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "x-refresh-token": refreshToken
                    }
                });
                const data = await response.json();
                setContact(data);
            } catch (error) {
                console.log("Error:", error);
            }
        };

        fetchContact();
    }, [id]);

    const handleEditContact = async (e) => {
        e.preventDefault();
        const name = e.target.name.value.trim();
        const email = e.target.email.value.trim();
        const phone = e.target.phone.value.trim();

        if (!name || !email || !phone) {
            alert("All fields are required.");
            return;
        }

        try {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
            const baseUrl = import.meta.env.VITE_API_BASE_URL + "/api"

            const response = await fetch(`${baseUrl}/contacts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                    "x-refresh-token": refreshToken
                },
                body: JSON.stringify({ name, email, phone, refreshToken })
            });
            const data = await response.json();
            console.log("response:", data);
            navigate("/home");
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-beige-300">
            <div className="bg-beige-400 p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6">Edit Contact</h1>
                <form onSubmit={handleEditContact}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name</label>
                        <input type="text" id="name" defaultValue={contact.name} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input type="email" id="email" defaultValue={contact.email} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700">Phone</label>
                        <input type="tel" id="phone" defaultValue={contact.phone} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default EditContact;