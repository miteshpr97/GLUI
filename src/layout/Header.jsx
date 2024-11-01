import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import IconButton from "@mui/joy/IconButton";
import Sheet from "@mui/joy/Sheet";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { toggleSidebar } from "../utils";
import { Box } from "@mui/material";
import MuiLogo from "../components/MuiLogo";
import ColorSchemeToggle from "../components/ColorSchemeToggle";

export default function Header() {
  return (
    
    <Sheet
      sx={{
        display: "flex",
        alignItems: "center",
        position: "fixed",
        top: 0,
        width: "100vw",
        height: "var(--Header-height)",
        zIndex: 9998,
        padding: "8px 16px",
        gap: 1,
        borderBottom: "1px solid",
        borderColor: "background.level1",
        boxShadow: "sm",
        background: "#1565c0",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            "--Header-height": "50px",
            [theme.breakpoints.up("sm")]: {
              "--Header-height": "50px",
            },
            [theme.breakpoints.up("md")]: {
              "--Header-height": "50px",
            },
          },
        })}
      />

      <Box
        sx={{
          // width: "var(--Sidebar-width)",
          width:"100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding:"10px"
        }}
      >
        <span>
          <MuiLogo />
        </span>

        <span>
          <ColorSchemeToggle />
        </span>

        <IconButton
          onClick={() => toggleSidebar()}
          variant="outlined"
          color="neutral"
          size="md"
          aria-label="Toggle sidebar"
          sx={{
            display: { xs: "flex", md: "none" },
            backgroundColor: "white",
            color: "purple",
            transition: "background-color 0.2s",
            ":hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
          }}
        >
          <MenuRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}
