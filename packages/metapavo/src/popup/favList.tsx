import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useEffect } from "react";
import moment from "moment";
import Typography from "@mui/material/Typography";
import { getUsersFavs } from "../apis/nft_api";
import { Avatar, Box, ListItemAvatar } from "@mui/material";

export default function FavList() {
  const [favs, setFavs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  async function getFavs() {
    setLoading(true);
    const data = await getUsersFavs();
    if (data.data) {
      setFavs(data.data);
    }
    setLoading(false);
  }
  useEffect(() => {
    getFavs();
  }, []);
  return (
    <>
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
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
                        width={85}
                        height={85}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={fav.project?.name}
                    secondary={`${fav.created_at ? fav.created_at.toLocaleString() : ""} floor:${
                      fav.project?.floor_price || ""
                    } total:${fav.project?.total_volumn || ""}`}
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
