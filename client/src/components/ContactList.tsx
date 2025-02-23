export default function ContactList () {

    return (
        <div className="contact-list">
            <h3 className="contacts-list-title">List of Contacts</h3>
            <div className="contacts-list-table-container">
                <table className="contact-list-table">
                    <thead className="contacts-list-header">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
};