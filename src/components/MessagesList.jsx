import React, { useRef, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const MessagesList = ({ messages }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <List className="Message-list">
            {messages && messages.length ? (
              messages.map(({ id, name, picture, text }) => (
                  <ListItem 
                    button 
                    key={id}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt="Profile Picture"
                        src={picture}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={name}
                      secondary={text}
                    />
                  </ListItem>
              ))
            ) : (
              <Typography variant="h5" gutterBottom>
                No messages
              </Typography>
            )}
            <div ref={messagesEndRef} />
    </List>
  )
}

export default MessagesList;