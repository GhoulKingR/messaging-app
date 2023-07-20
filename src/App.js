import { useEffect, useState } from "react";
import "./App.css";
import { Button, Input, InputLabel } from "@mui/material";
import { FormControl, IconButton } from "@mui/material";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import db from "./firebase";
import Message from "./Message";
import FlipMove from "react-flip-move";
import MessengerLogo from "./assets/580b57fcd9996e24bc43c526.png";
import SendIcon from "@mui/icons-material/Send";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  // Get all the messages stored in the firestore database
  // at the start of the application and save them to the
  // `messages` state
  useEffect(() => {
    let msg = collection(db, "messages"); // reference to message collection
    let orderedMsg = query(msg, orderBy("timestamp", "desc"));

    // Collect all data in the database
    // and real-time updates when it changes
    onSnapshot(msg, () => {
      // Get the snapshot from the ordered database and save
      // to the `messages` state
      getDocs(orderedMsg).then((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
        );
      });
    });
  }, []);

  // Prompt the user for username at the start of the application
  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    // push message to the firestore database
    let msg = collection(db, "messages"); // message collection reference
    addDoc(msg, {
      message: input,
      username,
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="app">
      {/* messenger logo */}
      <img src={MessengerLogo} alt="Messenger" className="app__logo" />

      {/* Welcome message */}
      <h1>Hello {username}!</h1>

      {/* Send message form */}
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <IconButton
            className="app__iconButton"
            variant="contained"
            color="primary"
            type="submit"
            disabled={!input.trim()}
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      {/* Messages list */}
      <FlipMove>
        {/* `FlipMove allows animation in the message component */}
        {messages.map(({ data, id }) => (
          <Message {...data} key={id} loggedInUser={username} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
