import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { CalendarPicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { useEffect } from "react";
import moment, { Moment } from "moment";
import { getUsersAlarmsList } from "../../../../utils/apis/nft_api";
import { Box, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import { PageContainer } from "../styleCom";
// import { HeadReturn } from "../common/HeadReturn";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { HeadReturnContainer, AddNewAlarm } from "../styleCom";
import { useNavigate } from "react-router-dom";
import AlarmSetPage from "./AlarmSetPage";
import { ItemSkeleton } from "../../components/common/ItemSkeleton";
const returnImg = chrome.runtime.getURL("images/svgs/return.svg");

export default function AlarmListPage() {
  const [alarms, setAlarms] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [showSetPage, toogleShow] = React.useState(false);
  const [date, setDate] = React.useState<Moment | null>(moment());
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
      toast.error(e.message);
    }
    setLoading(false);
  }
  useEffect(() => {
    restoreAlarmsFromServer();
  }, []);

  const toogleSetPage = () => {
    toogleShow(!showSetPage);
  };

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
        <AddNewAlarm onClick={toogleSetPage}>
          <AddBoxIcon sx={{ fontSize: "12px" }} />
          Add New
        </AddNewAlarm>
      </HeadReturnContainer>
    );
  };
  // return (
  //   <>
  //     <TrendsHotContainer>
  //       <HeadReturn title={"Alarm Reminder"} />

  const alarmList = loading ? (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "30px" }}>
      <Box>
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
      </Box>
    </Box>
  ) : (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
      </LocalizationProvider>
      {alarms.map((alarm) => {
        return (
          <List sx={{ width: "100%", bgcolor: "background.paper" }} disablePadding={true}>
            <ListItem divider={true} disablePadding={true}>
              <ListItemText
                primary={new Date(alarm.alarm_at).toLocaleString() + " | " + alarm.desc}
                secondary={
                  "Alarm After: " +
                  moment
                    .duration((new Date(alarm.alarm_at).getTime() - Date.now()) / 1000, "seconds")
                    .locale("en")
                    .humanize()
                }
              />
            </ListItem>
          </List>
        );
      })}
    </div>
  );

  return (
    <>
      <PageContainer>
        <HeadReturn title={"Alarm Reminder"} />
        {showSetPage ? <AlarmSetPage toogleSetPage={toogleSetPage} /> : alarmList}
      </PageContainer>
    </>
  );
}
