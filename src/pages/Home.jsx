import React, { useEffect, useState } from "react";
import Card from "./components/contactCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const baseurl = import.meta.env.VITE_API_BASE_URL + "/api" ; 
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    const getAllContacts = async () => {
        try {
            const response = await fetch(`${baseurl}/contacts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "x-refresh-token": localStorage.getItem("refreshToken"),
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error:", errorData?.message || "Unknown error");
                return;
            }

            const data = await response.json();
            setContacts(data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        getAllContacts();
    }, []);

    const handleCreateContact = () => {
        const accessToken = localStorage.getItem("accessToken"); 
        const refreshToken = localStorage.getItem("refreshToken"); 
        navigate("/add", { state: { accessToken: accessToken, refreshToken: refreshToken } });

    };  

    const  handleLogout= async()=>{
        try {
            //helped me in debugging the issue
            const reffeToken = localStorage.getItem("refreshToken");
            if(!reffeToken){
                console.log("No refresh token found");
                return;
            }else{
                console.log("Refresh token sending it to backend");
            }

            const response = await fetch(`${baseurl}/users/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "x-refresh-token": reffeToken
                },
                body: JSON.stringify({
                    refreshToken:reffeToken, // Send in body
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error:", errorData?.message || "Unknown error");
                return;
            }
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/");
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Sidebar for large screens, Top bar for mobile */}
            <nav className="bg-gray-800 text-white p-4 flex lg:flex-col lg:w-64 lg:h-screen justify-center lg:justify-center items-center lg:items-start lg:pl-10">
                <h1 className="text-xl font-bold mb-4 lg:mb-10 hidden lg:block">Contact Manager</h1>
                <div className="flex lg:flex-col gap-4 w-full lg:w-auto">
                    <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 w-full lg:w-40">
                        <span className="lg:inline hidden">Log Out</span>
                        <span className="lg:hidden block">⏻</span>
                    </button>
                    <button onClick={handleCreateContact} className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 w-full lg:w-40">
                        <span className="lg:inline hidden">Create Contact</span>
                        <span className="lg:hidden block">➕</span>
                    </button>
                </div>
            </nav>
            
            {/* Main Content */}
            <div className="p-6 flex-1">
                <h2 className="text-2xl font-semibold">All Contacts</h2>
                <div>
                    {contacts.length > 0 ? (
                        contacts.map((contact) => (
                            <Card
                                key={contact._id}
                                id={contact._id}
                                name={contact.name}
                                email={contact.email}
                                phone={contact.phone}
                            />
                        ))
                    ) : (
                        <p>No contacts found.</p>
                    )}
                </div>  
            </div>
        </div>
    );
};

export default Home;
