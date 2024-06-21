import React, { useState, useEffect } from 'react';
import { db } from '../connection/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function DisplayMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "comment"));
        const messagesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching messages: ", error);
      }
    };

    fetchMessages();
  }, []); 

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map(message => (
          <li key={message.id}>
            <strong>Name:</strong> {message.name}<br />
            <strong>Email:</strong> {message.email}<br />
            <strong>Message:</strong> {message.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
