import { useEffect,useState } from "react";
import axios from "../api/axios.js";
import toast from "react-hot-toast";

const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]); 

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const {data} = await axios.get("/users");
                
                if (data.error) throw new Error(data.error);
                setConversations(data);
            } catch (error) {
                console.error("Fetch error:", error.response || error);
                toast.error(error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        };
        getConversations();
    }, []);

    return { loading, conversations };
};

export default useGetConversation;