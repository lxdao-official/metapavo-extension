import List, { ListProps } from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { CalendarPicker, CalendarPickerProps } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { getUsersAlarmsList, removeAlarmForUser } from "../../../../utils/apis/nft_api";
import { Box, CircularProgress, styled } from "@mui/material";
import toast from "react-hot-toast";
import { PageContainer } from "../styleCom";
import { HeadReturnContainer, AddNewAlarm } from "../styleCom";
import { useLocation, useNavigate } from "react-router-dom";
import AlarmSetPage from "./AlarmSetPage";
import styledCom from "styled-components";

const returnImg = chrome.runtime.getURL("images/svgs/return.svg");

const AlarmListWrap = styledCom.div`
.MuiListItemSecondaryAction-root {
  visibility: hidden;
},
.MuiListItem-root:hover .MuiListItemSecondaryAction-root{
  visibility: inherit;
}
`
export default function AlarmListPage() {
  const [alarms, setAlarms] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [showSetPage, toogleShow] = React.useState(false);
  const [date, setDate] = React.useState(dayjs());
  const [timestamp, setTimestamp] = React.useState(0);
  const navigate = useNavigate();
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();

  async function restoreAlarmsFromServer() {
    setLoading(true);
    try {
      const _alarms = await getUsersAlarmsList(date.valueOf());
      if (_alarms) {
        setAlarms(_alarms);
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
    const queryTime = query.get("timestamp");
    if (queryTime) {
      setTimestamp(Number(queryTime));
      toogleShow(true);
    }
  }, [date]);

  const toogleSetPage = () => {
    toogleShow(!showSetPage);
  };

  const handleDeleteIcon = async (id: string) => {
    try {
      const _remove = await removeAlarmForUser(id);
      if (_remove) {
        restoreAlarmsFromServer();
      }
    } catch (e: any) {
      toast.error(e.message);
    }
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
          {/* <AddBoxIcon sx={{ fontSize: "12px", }} /> */}+ Add New
        </AddNewAlarm>
      </HeadReturnContainer>
    );
  };
  // return (
  //   <>
  //     <TrendsHotContainer>
  //       <HeadReturn title={"Alarm Reminder"} />

  const CustomCalendarPicker = styled(CalendarPicker)<CalendarPickerProps<any>>`
    margin: 0;
    width: 100%;
  `;

  const alarmList = loading ? (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "30px" }}>
      <CircularProgress size={20} />
    </Box>
  ) : (
    <AlarmListWrap>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={(theme) => ({
            width: "283px",
          })}
        >
          <CustomCalendarPicker
            date={date}
            onChange={(newDate) => setDate(newDate)}
            showDaysOutsideCurrentMonth
            disablePast
          />
        </Box>
      </LocalizationProvider>
      {alarms.map((alarm) => {
        return (
          <List sx={{ width: "100%", bgcolor: "background.paper" }} disablePadding={true}>
            <ListItem
              divider={true}
              disablePadding={true}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    handleDeleteIcon(alarm.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <ListItemText
                  primary={dayjs(alarm.alarm_at).format("ddd")}
                  secondary={dayjs(alarm.alarm_at).format("DD")}
                  sx={{ textAlign: "center" }}
                />
              </ListItemAvatar>
              <ListItemAvatar>
                <Avatar variant="rounded" sx={{ bgcolor: alarm.color, opacity: 0.5 }}>
                  {" "}
                  {alarm.desc.slice(0, 1)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={alarm.desc}
                secondary={dayjs(alarm.alarm_at).format("HH:mm a")}
              />
            </ListItem>
          </List>
        );
      })}
    </AlarmListWrap>
  );

  return (
    <>
      <PageContainer>
        <HeadReturn title={"Alarm Reminder"} />
        {showSetPage ? (
          <AlarmSetPage
            timestamp={timestamp}
            toogleSetPage={toogleSetPage}
            restoreAlarmsFromServer={restoreAlarmsFromServer}
          />
        ) : (
          alarmList
        )}
      </PageContainer>
    </>
  );
}
