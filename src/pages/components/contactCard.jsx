import { useNavigate } from "react-router-dom";
import {getAllContacts} from "../api/contacts"; // Assuming you have an API utility for fetching contacts


export default function Card({ id, name, email, phone }) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async () => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const baseUrl = import.meta.env.VITE_API_BASE_URL + "/api";

        try {
            const response = await fetch(`${baseUrl}/contacts/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "x-refresh-token": refreshToken
                }
            });
            const data = await response.json();
            console.log("Delete response:", data);
            getAllContacts(); // Refresh the contact list after deletion
            console.log("Contact deleted successfully");
            navigate("/home", { replace: true });
            

            // Optionally, refresh the contact list or navigate to another page
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div className="bg-beige-200 shadow-lg rounded-2xl p-6 max-w-sm mx-auto border border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">{name}</h1>
            <h2 className="text-md text-gray-600 mt-1">{email}</h2>
            <h3 className="text-sm text-gray-500 mt-1">{phone}</h3>
            
            <div className="flex justify-between mt-4">
                <button onClick={handleEdit} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-300">✏️</button>
                <button onClick={handleDelete} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-red-300">🗑️</button>
            </div>
        </div>
    );
}