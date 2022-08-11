import React, { useContext, useEffect, useRef } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Extention from "./extention";

const AccordionPage = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <AccordionSummary
          expandIcon={
            expanded === "panel1" ? <RemoveIcon /> : <AddIcon sx={{ color: "#5B28EB" }} />
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>MetaPavo</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>MetaPavo</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
        <AccordionSummary
          expandIcon={
            expanded === "panel2" ? <RemoveIcon /> : <AddIcon sx={{ color: "#5B28EB" }} />
          }
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Moonbirds</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Extention />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionPage;
