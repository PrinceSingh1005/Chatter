import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from 'react-hot-toast';
import axios from "../api/axios";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation(); // Destructure properly

    const sendMessage = async (message) => {
        if (!selectedConversation?._id) {
            toast.error("No conversation selected");
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post(`/messages/send/${selectedConversation._id}`, {
                message
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (data.error) throw new Error(data.error);

            // Optimistic update - add new message to local state immediately
            setMessages([...messages, data]);

        } catch (error) {
            console.error("Message send error:", error);
            toast.error(error.response?.data?.error || error.message);
            
            // Optionally: Revert optimistic update here if needed
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;