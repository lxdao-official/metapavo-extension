import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useEffect } from "react";
import moment from "moment";
import { getUsersAlarmsList } from "../../../../utils/apis/nft_api";
import { Box, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import { PageContainer } from "../styleCom";
import { HeadReturn } from "../common/HeadReturn";
export default function AlarmListPage() {
  const [alarms, setAlarms] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  async function restoreAlarmsFromServer() {
    setLoading(true);
    try {
      const _alarms = await getUsersAlarmsList();
      if (_alarms && _alarms.data) {
        setAlarms(_alarms.data);
      } else {
        setAlarms([]);
      }
    } catch (e: any) {
      toast.error(e.message);
    }
    setLoading(false);
  }
  useEffect(() => {
    restoreAlarmsFromServer();
  }, []);

  return (
    <>
      <PageContainer>
        <HeadReturn title={"Alarm Reminder"} />
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", padding: "30px" }}>
            <CircularProgress style={{ color: "#b721ff", width: "20px", height: "20px" }} />
          </Box>
        ) : (
          <div>
            {alarms.map((alarm) => {
              return (
                <List sx={{ width: "100%", bgcolor: "background.paper" }} disablePadding={true}>
                  <ListItem divider={true} disablePadding={true}>
                    <ListItemText
                      primary={new Date(alarm.alarm_at).toLocaleString() + " | " + alarm.desc}
                      secondary={
                        "Alarm After: " +
                        moment
                          .duration(
                            (new Date(alarm.alarm_at).getTime() - Date.now()) / 1000,
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
        )}
      </PageContainer>
    </>
  );
}
