import ChatBoardPage from "../pages/chatBoard/ChatBoardPage";
import RoomPage from "../pages/room/RoomPage";

const routes = [
    {
        path: '/',
        element: <RoomPage />
    },
    {
        path: '/chat-board/:room',
        element: <ChatBoardPage />
    }
];

export default routes;