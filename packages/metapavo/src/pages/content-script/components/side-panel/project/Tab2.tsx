import { Box, Skeleton } from "@mui/material";
import useGlobal from "../../../context/useGlobal";
import { EthIcon } from "../../assets/Svgs";
import { css } from "./styles";
const twoDecimal = (num: any) => {
  if (!num || num !== num || num == "NaN") return 0.0;
  const data = num + "".toLocaleString();
  return Number(data).toFixed(2);
};

const card = (obj: any) => (
  <Box
    component="div"
    sx={{
      px: "15px",
      py: "10px",
      // width: "100%",
      height: "55.71px",
      border: "0.794574px solid #D7D7D7",
      borderRadius: "6.35659px",
      textAlign: "left",
      maxWidth: "130px",
    }}
  >
    <Box
      sx={{
        mb: "6.36px",
        fontWeight: 500,
        fontSize: "12px",
        transform: "scale(0.9)",
        lineHeight: "11px",
        color: "#A9A8AF",
        display: "flex",
        alignItems: "center",
        wordBreak: "break-all",
        transformOrigin: "0 0",
      }}
    >
      {obj.label}
    </Box>
    <Box
      sx={{
        mb: 1.5,
        fontWeight: 600,
        fontSize: "14px",
        color: "#353536",
        lineHeight: "17px",
        display: "flex",
        fontFamily: "Inter",
      }}
    >
      <Box sx={{ fontSize: "14px" }}>{obj.icon}</Box>
      {obj.value}
    </Box>
    {/* <Box
      sx={{
        display: "flex",
        alignItems: "center",
        fontWeight: 500,
        fontSize: "9px",
        lineHeight: "11px",
      }}
    >
      <Box component="span" className="metapavo-roundT">
        {obj.date}
      </Box>
      <Box component="span" sx={{ color: obj.rate > 0 ? "#07A333" : "#FF1159" }}>
        {obj.rate}%
      </Box>
    </Box> */}
  </Box>
);
const MoonbirdsTab2 = () => {
  const { activeProject, detectStatus } = useGlobal();
  const mookData: any = [
    // {
    //   label: "Total Sales",
    //   value: `${twoDecimal(activeProject?.total_sales)}`,
    //   date: "24H",
    //   rate: 0,
    //   icon: <></>,
    // },
    // {
    //   label: "Holders",
    //   value: `${activeProject?.num_owners?.toLocaleString() || "-"}/${
    //     activeProject?.total_supply ? parseInt(activeProject?.total_supply) : "-"
    //   }`,
    //   date: "24H",
    //   rate: 0,
    //   icon: <EthIcon sx={{ fontSize: "inherit", marginTop: "1.5px" }} />,
    // },
    // {
    //   label: "Volume(24H)",
    //   value: `${twoDecimal(activeProject?.one_day_volume)}`,
    //   date: "24H",
    //   rate: 0,
    //   icon: <EthIcon sx={{ fontSize: "inherit", marginTop: "1.5px" }} />,
    // },
    // {
    //   label: "Volume(7D)",
    //   value: `${twoDecimal(activeProject?.seven_day_volume)}`,
    //   date: "24H",
    //   rate: 0,
    //   icon: <EthIcon sx={{ fontSize: "inherit", marginTop: "1.5px" }} />,
    // },
    // {
    //   label: "Floor Price",
    //   value: `${twoDecimal(activeProject?.floor_price)}`,
    //   date: "24H",
    //   rate: 0,
    //   icon: <EthIcon sx={{ fontSize: "inherit", marginTop: "1.5px" }} />,
    // },
  ];
  return (
    <div>
      <style type="text/css">{css}</style>

      <Box
        sx={{
          display: "grid",
          gap: 1,
          gridTemplateColumns: "repeat(2, 1fr)",
          px: 2,
          mt: 2.5,
          textAlign: "left",
        }}
      >
        {mookData.map((ii: any) => card(ii))}
      </Box>
      <Box sx={{ mb: 1, px: 2 }}>
        <Box sx={{ p: "10px", display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ fontWeight: 500, fontSize: "12px", lineHeight: "15px" }}>
            Market Cap & Volume
          </Box>
          <select className="metapavo-selectClass">
            <option value={10}>24h</option>
            <option value={20}>3d</option>
            <option value={30}>4d</option>
          </select>
        </Box>
        <Skeleton variant="rectangular" width={"100%"} height={162} />
      </Box>
      {/* <Box sx={{ mt: 2.5 }}>{mockInfo_.map((ii) => info(ii))}</Box> */}
    </div>
  );
};
