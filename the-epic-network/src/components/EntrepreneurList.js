// src/components/EntrepreneurList.js
import React, { useEffect, useState } from 'react';
import { fetchEntrepreneurs, sendMessage } from '../api/airtable';

const EntrepreneurList = () => {
    const [entrepreneurs, setEntrepreneurs] = useState([]);
    const [message, setMessage] = useState("");
    const [receiverId, setReceiverId] = useState("");

    useEffect(() => {
        const getEntrepreneurs = async () => {
            const data = await fetchEntrepreneurs();
            setEntrepreneurs(data);
        };
        getEntrepreneurs();
    }, []);

    const handleSendMessage = async () => {
        await sendMessage({
            Sender: [{ id: 'YOUR_SENDER_ID' }], // replace with dynamic ID
            Receiver: [{ id: receiverId }],
            Message: message,
        });
        setMessage("");
        setReceiverId("");
    };

    return (
        <div>
            <h1>Entrepreneur List</h1>
            <ul>
                {entrepreneurs.map(entrepreneur => (
                    <li key={entrepreneur.id}>
                        {entrepreneur.fields.Name}
                        <button onClick={() => setReceiverId(entrepreneur.id)}>Message</button>
                    </li>
                ))}
            </ul>

            {receiverId && (
                <div>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button onClick={handleSendMessage}>Send Message</button>
                </div>
            )}
        </div>
    );
};

export default EntrepreneurList;
