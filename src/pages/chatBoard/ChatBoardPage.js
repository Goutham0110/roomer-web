import { useEffect, useState } from "react";
import styles from "./ChatBoardPage.module.css";
import Text from "../../components/Text";
import useSocket from "../../hooks/useSocket";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useParams } from "react-router-dom";

export default function ChatBoardPage() {
    const [messages, setMessages] = useState([]);
    const [roomPopulation, setRoomPopulation] = useState(1);
    const [text, setText] = useState("");
    const socket = useSocket();
    const params = useParams();

    useEffect(() => {
        socket.emit("room", params.room);
    }, [params, socket]);

    const sendMessage = () => {
        if (!text?.length) return;
        socket.emit("message", { text: text, room: params.room, sender: socket.id });
        setText("");
    }

    const handleEnterPress = (event) => {
        if (event.key !== "Enter") return;
        sendMessage();
    }

    function stringToHexColor(str) {

        if (!str?.length) return "#9e9e9e";

        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }


        const colors = [
            "#607d8b",
            "#795548",
            "#ff5722",
            "#2e7d32",
            "#558b2f",
            "#009688",
            "#2196f3",
            "#3f51b5",
            "#9c27b0",
            "#e91e63",
            "#f44336"
        ];
        const index = Math.abs(hash % colors.length);
        return colors[index];
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((prev) => [{ text: data.text, sender: data.sender }, ...prev,]);
        });

        socket.on("joined_room", (room) => {
            setMessages([{ text: `You have joined ${room} chat room` }]);
        });

        socket.on("population_change", (population) => {
            setRoomPopulation(population);
        })

        return () => socket.offAny();
    }, [socket]);

    return (
        <div className={styles.ChatBoard}>
            <div>
                <Text>
                    You are in {params.room} Chat Room {roomPopulation-1 ? `with ${roomPopulation - 1} other people` : "ALONE!"}
                </Text>
            </div>
            <div className={styles.Chat}>
                <div className={styles.MessageBox}>
                    {!!messages?.length &&
                        messages.map((message, index) => (
                            <div key={index + 1} style={{ display: "flex", justifyContent: message.sender === socket.id ? "start" : "end" }}>
                                <div className={styles.Message} style={{ backgroundColor: stringToHexColor(message.sender) }}>
                                    <Text style={{ color: "#fff" }} variant={"light"}>{message.text}</Text>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.MessageField}>
                    <TextField
                        fullWidth
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={"It's your turn to make things awkward!"}
                        sx={{ mt: 1 }}
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={sendMessage}>
                                        <SendIcon color="primary" />
                                    </IconButton>
                                </InputAdornment>,
                            },
                        }}
                        onKeyDown={handleEnterPress}
                    />
                </div>
            </div>
        </div >
    )
}
