import React from 'react'
import { Button, Message } from "semantic-ui-react";

const ErrorMessage = ({ message, onClose }) =>
  message ? (
    <Message negative>
      <Message.Header>Error</Message.Header>
      <p>{message}</p>
      <Button size='small' onClick={onClose}>
        Close
      </Button>
    </Message>
  ) : null;

export default ErrorMessage;