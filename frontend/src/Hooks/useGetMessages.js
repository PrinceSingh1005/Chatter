import { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`/messages/${selectedConversation._id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true // Ensure cookies are sent
                });

                if (data.error) throw new Error(data.error);
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
                toast.error(error.response?.data?.error || error.message);
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?._id) {
            getMessages();
        }
    }, [selectedConversation?._id, setMessages]);

    return { loading, messages }; // Added return value
};

export default useGetMessages;