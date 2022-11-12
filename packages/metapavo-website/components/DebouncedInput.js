import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import React, { useEffect, useState } from 'react';

import TextInput from './TextInput';

// copy from https://usehooks.com/useDebounce/
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

function DebounceInput(props) {
  const [value, setValue] = useState(props.value);
  const debouncedValue = useDebounce(value, props.time || 500);

  useEffect(() => {
    if (debouncedValue !== undefined) {
      props.onChange(value);
    }
    // eslint-disable-next-line
  }, [debouncedValue]);

  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value);
    }
    // eslint-disable-next-line
  }, [props.value]);

  return (
    <TextInput
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment sx={{ padding: '15px' }}>
            <SearchIcon sx={{ color: '#416AFC' }} />
          </InputAdornment>
        ),
      }}
      value={value}
      onChange={(value) => {
        setValue(value);
      }}
      onFocus={() => props.onFocus()}
      onBlur={() => props.onBlur()}
    />
  );
}

export default DebounceInput;
