export default function AddContactac(){
    return (
        <div>
            <h1>Add Contact</h1>
            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" />
                </div>
                <button type="submit">Add Contact</button>
            </form>
        </div>
    );
};