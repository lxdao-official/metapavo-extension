import React from 'react';
import { TextField } from '@mui/material';

function TextInput(props) {
  return (
    <TextField
      fullWidth
      {...props}
      onChange={(event) => {
        props.onChange && props.onChange(event.target.value);
      }}
    />
  );
}

export default TextInput;
