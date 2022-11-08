import { Box, Typography } from '@mui/material';

function TabPanel(props) {
  const { children, value, index } = props;
  if (!value && value !== 0) {
    return <></>;
  }
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index ? (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      ) : null}
    </div>
  );
}

export default TabPanel;
