import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useEffect } from "react";
import moment from "moment";
import Typography from "@mui/material/Typography";

export default function AlarmList() {
  const [alarms, setAlarms] = React.useState<any[]>([]);
  useEffect(() => {
    chrome.alarms.getAll((alarms) => {
      setAlarms(
        alarms.filter((a) => {
          return a.name.startsWith("time_alarm:");
        }),
      );
    });
  }, []);
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Alarm List
      </Typography>
      <div>
        {alarms.map((alarm) => {
          return (
            <List sx={{ width: "100%", bgcolor: "background.paper" }} disablePadding={true}>
              <ListItem divider={true} disablePadding={true}>
                <ListItemText
                  primary={
                    new Date(alarm.scheduledTime).toLocaleString() +
                    " | " +
                    alarm.name.replace("time_alarm:", "")
                  }
                  secondary={
                    "Alarm After: " +
                    moment
                      .duration(
                        (new Date(alarm.scheduledTime).getTime() - Date.now()) / 1000,
                        "seconds",
                      )
                      .locale("en")
                      .humanize()
                  }
                />
              </ListItem>
            </List>
          );
        })}
      </div>
    </>
  );
}
