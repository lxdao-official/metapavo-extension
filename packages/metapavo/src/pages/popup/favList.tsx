import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useEffect } from "react";
import moment from "moment";
import Typography from "@mui/material/Typography";
import { getUsersFavs } from "../../utils/apis/nft_api";
import { Avatar, Box, CircularProgress, ListItemAvatar } from "@mui/material";
import toast from "react-hot-toast";

export default function FavList() {
  const [favs, setFavs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  async function getFavs() {
    setLoading(true);
    try {
      const data = await getUsersFavs();
      if (data.data) {
        setFavs(data.data);
      }
    } catch (e: any) {
      toast.error(e.message);
    }

    setLoading(false);
  }
  useEffect(() => {
    getFavs();
  }, []);
  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", padding: "30px" }}>
          <CircularProgress style={{ color: "#b721ff", width: "20px", height: "20px" }} />
        </Box>
      ) : (
        <div>
          {favs.length === 0 ? <Typography variant="h6">No Projects</Typography> : null}
          <List sx={{ width: "100%", bgcolor: "background.paper" }} disablePadding={true}>
            {favs.map((fav) => {
              return (
                <ListItem divider={true} disablePadding={true}>
                  <ListItemAvatar>
                    <Avatar>
                      <Box
                        component="img"
                        src={fav.project?.image_url || ""}
                        width={40}
                        height={40}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={fav.project?.name}
                    secondary={`${fav.created_at ? moment(fav.created_at).fromNow() : ""} floor:${
                      fav.project?.floor_price || ""
                    } total:${fav.project?.total_volume || ""}`}
                  />
                </ListItem>
              );
            })}
          </List>
        </div>
      )}
    </>
  );
}
