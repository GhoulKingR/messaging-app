import React, { forwardRef } from "react";
import "./Message.css";
import { Card, CardContent, Typography } from "@mui/material";

// forwardRef is important for react-flip-move to work
// it allows me to use `ref`'s in the Message component
const Message = forwardRef(({ message, username, loggedInUser }, ref) => {
  const isUser = username === loggedInUser;

  return (
    <div
      className={`message ${
        isUser ? "message__alignRight" : "message__alignLeft"
      }`}
    >
      {!isUser && (
        <small className="message__username">
          {username || "Unknown user"}
        </small>
      )}
      <Card
        ref={ref}
        className={`message__card ${
          isUser ? "message__user" : "message__notUser"
        }`}
      >
        <CardContent>
          <Typography
            className={`${isUser && "message__userText"}`}
            color="black"
            variant="h5"
            component="h2"
          >
            {message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
