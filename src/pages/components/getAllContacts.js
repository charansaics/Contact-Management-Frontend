

const baseurl = import.meta.env.VITE_API_BASE_URL + "/api" ; 


const getAllContactsAfterdelete = async () => {
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
        } catch (error) {
            console.log("Error:", error);
        }
    };

export  {getAllContactsAfterdelete};