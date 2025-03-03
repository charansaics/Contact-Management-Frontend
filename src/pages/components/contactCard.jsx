export default function Card({ name, email, phone }) {
    return (
        <div className=" bg-beige-200 shadow-lg rounded-2xl p-6 max-w-sm mx-auto border border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">{name}</h1>
            <h2 className="text-md text-gray-600 mt-1">{email}</h2>
            <h3 className="text-sm text-gray-500 mt-1">{phone}</h3>
            
            <div className="flex justify-between mt-4">
                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-300">✏️</button>
                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-red-300">🗑️</button>
            </div>
        </div>
    );
}
