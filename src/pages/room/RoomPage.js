import { IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Roompage.module.css";
import Text from "../../components/Text";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

export default function RoomPage() {
    const [room, setRoom] = useState("");
    const navigate = useNavigate();

    const submitHandler = () => {
        navigate(`/chat-board/${room}`);
    }

    const handleEnterPress = (event) => {
        if (event.key !== "Enter") return;
        submitHandler();
    }

    return (<Paper variant={"outlined"} className={styles.RoomBox}>
        <Text variant="semibold" style={{ justifyContent: "center", fontSize: "28px" }}>Create or Join a Chat Room</Text>
        <TextField
            sx={{
                mt: 2
            }}
            fullWidth
            onChange={(e) => setRoom(e.target.value)}
            value={room}
            label="Room Name"
            placeholder="eg. chatterbox"
            slotProps={{
                input: {
                    endAdornment: <InputAdornment position="end">
                        <IconButton onClick={submitHandler}>
                            <ManageSearchIcon />
                        </IconButton>
                    </InputAdornment>,
                },
            }}
            onKeyDown={handleEnterPress}
        />
    </Paper>)
}