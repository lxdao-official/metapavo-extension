import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useEffect } from "react";
import moment from "moment";
import { getUsersAlarmsList, getUsersAlarmsNoLogin } from "../../../../utils/apis/nft_api";
import { Box, CircularProgress } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useSnackbar } from "notistack";
import { HeadReturnContainer, TrendsHotContainer, AddNewAlarm } from "../styleCom";
import { useNavigate } from "react-router-dom";
import AlarmSetPage from "./AlarmSetPage";
const returnImg = chrome.runtime.getURL("images/svgs/return.svg");
export default function AlarmListPage() {
  const [alarms, setAlarms] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [showSetPage, toogleShow] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
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
      enqueueSnackbar(e.message);
    }
    setLoading(false);
  }
  useEffect(() => {
    restoreAlarmsFromServer();
  }, []);

  const toogleSetPage = () => {
    toogleShow(!showSetPage)
  }

  const HeadReturn = (props: any) => {
    const title = props.title;

    return (
      <HeadReturnContainer>
        <img
          onClick={() => {
            navigate("/index");
          }}
          src={returnImg}
          alt=""
        />
        <span>{title}</span>
        <AddNewAlarm onClick={toogleSetPage}><AddBoxIcon sx={{ fontSize: "12px" }} />Add New</AddNewAlarm>
      </HeadReturnContainer>
    );
  };
  return (
    <>
      <TrendsHotContainer>
        <HeadReturn title={"alarmlist"} />
        {showSetPage ? <AlarmSetPage /> : null}
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
      </TrendsHotContainer>
    </>
  );
}
