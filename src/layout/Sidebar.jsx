import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
// import Chip from '@mui/joy/Chip';
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
// import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
// import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import ColorSchemeToggle from '../components/ColorSchemeToggle';
import { closeSidebar } from "../utils";
import { NavLink, useLocation } from "react-router-dom";
import userContext from "../context/userContext/userContext";
// import configServ from '../services/config';
import Cookies from "js-cookie";
import { useTheme } from "@mui/material";
import axios from "axios";

function Toggler({ defaultExpanded = false, renderToggle, children }) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </>
  );
}

export default function Sidebar() {
  const theme = useTheme();
  const location = useLocation();
  const { user } = React.useContext(userContext);

  function getInitials(name) {
    if (!name) {
      return "...";
    }
    const words = name.split(" ");
    let initials = "";
    for (let i = 0; i < words.length; i++) {
      initials += words[i].charAt(0).toUpperCase();
    }

    return initials;
  }

  const logout = async () => {
    const isOkay = window.confirm("You are about to be logged out");
    if (isOkay) {
      Cookies.remove("token");
      window.location.reload();
    }
  };

  const menuData = [
    {
      USER_CD: "GL00001",
      MODULE_CD: "AM",
      MODULE_NM: "Finance Module",
      MENU_CD: "AMT100",
      MENU_NM: "Transaction",
      PAGE_CD: "GLAMT100100",
      PAGE_NM: "Register Transaction",
      PAGE_YN: "Y",
      ICON_PAGE: "",
      ICON_MODULE: "",
      ICON_MENU: "",
      PAGE_LNK: "/GLAMT100100",
    },
    {
      USER_CD: "GL00001",
      MODULE_CD: "CM",
      MODULE_NM: "Common Module",
      MENU_CD: "CMA100",
      MENU_NM: "Basic Setting",
      PAGE_CD: "GLCMA100100",
      PAGE_NM: "User Creation",
      PAGE_YN: "Y",
      ICON_PAGE: "",
      ICON_MODULE: "",
      ICON_MENU: "",
      PAGE_LNK: "/UserCreation",
    },
    {
      USER_CD: "GL00001",
      MODULE_CD: "CM",
      MODULE_NM: "Common Module",
      MENU_CD: "CMA100",
      MENU_NM: "Basic Setting",
      PAGE_CD: "GLCMA100200",
      PAGE_NM: "User Access",
      PAGE_YN: "Y",
      ICON_PAGE: "",
      ICON_MODULE: "",
      ICON_MENU: "",
      PAGE_LNK: "/UserAccess",
    },
    {
      USER_CD: "GL00001",
      MODULE_CD: "CM",
      MODULE_NM: "Common Module",
      MENU_CD: "CMB100",
      MENU_NM: "Common Code",
      PAGE_CD: "GLCMA100300",
      PAGE_NM: "Create Common Code",
      PAGE_YN: "Y",
      ICON_PAGE: "",
      ICON_MODULE: "",
      ICON_MENU: "",
      PAGE_LNK: "/CommonCode",
    },
  ];




  //  const [menuData, setMenuData] = React.useState([]);
  

  // React.useEffect(() => {
  //   const fetchMenuData = async () => {
  //     try {
  //       const response = await axios.post("/api/Menu", {
  //         USER_CD: window.sessionStorage.getItem("USER_CD"),

          
  //       });
  //       if (response.status === 200) {
  //         // Update the state with the fetched menu data
  //         setMenuData(response.data);
  //         console.log("Menu data fetched successfully:", response.data);
  //       } else {
  //         console.error("Failed to fetch menu data", response.status);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching menu data", error);
  //     }
  //   };

  //   fetchMenuData();
  // }, []);


  const groupedMenuData = menuData.reduce((acc, item) => {
    const { MODULE_NM, MENU_NM } = item;  
    acc[MODULE_NM] = acc[MODULE_NM] || {};
    acc[MODULE_NM][MENU_NM] = acc[MODULE_NM][MENU_NM] || [];
    acc[MODULE_NM][MENU_NM].push(item);
    return acc;
  }, {});


  return (
    <Sheet
      className="Sidebar"
      sx={{
        //  position: { xs: "fixed", md: "sticky" },
     
        // top: 65,

        position: "fixed",  // Change from "sticky" to "fixed"
        top: 55,  // Maintain the top offset
        left: 0,  // Align to the left of the screen
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        // zIndex: 9999,
        height: "calc(100vh - 65px)",
        width: "var(--Sidebar-width)",
        
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid #ddd",
        backgroundColor: theme.palette.background.default,
     
        //  overflowY: "auto", 
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
            [theme.breakpoints.down("md")]: {
              "--Sidebar-width": "180px", // or any narrower width for mobile
            },
          },
        })}
      />
      <Box>{/* <ColorSchemeToggle sx={{ ml: 'auto' }} /> */}</Box>

      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "calc(100vh - 65px)",
          opacity: "var(--SideNavigation-slideIn)",
          // backgroundColor: "var(--joy-palette-background-backdrop)",
         
          transition: "opacity 0.9s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />

      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        {/* <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton>
              <DashboardRoundedIcon
                sx={{ color: theme.palette.primary[400] }}
              />
              <ListItemContent>
              
                <ListItemButton
                  component={NavLink}
                  to={"/"}
                  selected={location.pathname === "/"}
                >
                  Dashboard
                </ListItemButton>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AssignmentRoundedIcon
                    sx={{ color: theme.palette.primary[400] }}
                  />
                  <ListItemContent>
                    <Typography level="title-sm">Master Entry</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem>
                  <ListItemButton
                    component={NavLink}
                    to={"/item"}
                    selected={location.pathname.startsWith("/item")}
                  >
                    Item
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>


          
        </List> */}

        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton
              component={NavLink}
              to="/"
              selected={location.pathname === "/"}
            >
              <DashboardRoundedIcon
                sx={{ color: theme.palette.primary[400] }}
              />
              <ListItemContent>Dashboard</ListItemContent>
            </ListItemButton>
          </ListItem>

          {Object.entries(groupedMenuData).map(([module, menus]) => (
            <ListItem key={module} nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton sx={{fontSize:"0.8rem"}} onClick={() => setOpen(!open)}>
                    <AssignmentRoundedIcon
                      sx={{ color: theme.palette.primary[400] }}
                    />
                    <ListItemContent>{module}</ListItemContent>
                    <KeyboardArrowDownIcon
                      sx={{ transform: open ? "rotate(180deg)" : "none" }}
                    />
                  </ListItemButton>
                )}
              >
                <List sx={{ gap: 0.5 }}>
                  {Object.entries(menus).map(([menu, pages]) => (
                    <ListItem  key={menu} nested>
                      <Toggler
                        renderToggle={({ open, setOpen }) => (
                          <ListItemButton sx={{fontSize:"0.8rem"}}  onClick={() => setOpen(!open)}>
                            <ListItemContent >{menu}</ListItemContent>
                            <KeyboardArrowDownIcon
                              sx={{
                                transform: open ? "rotate(180deg)" : "none",
                              }}
                            />
                          </ListItemButton>
                        )}
                      >
                        <List sx={{ gap: 0.5 }}>
                          {pages.map((page) => (
                            <ListItem key={page.PAGE_NM}>
                              <ListItemButton
                              sx={{fontSize:"0.8rem"}}
                                component={NavLink}
                                to={page.PAGE_LNK}
                                selected={location.pathname.startsWith(
                                  page.PAGE_LNK
                                )}
                              >
                                {page.PAGE_NM}
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Toggler>
                    </ListItem>
                  ))}
                </List>
              </Toggler>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar>{user && getInitials(user.name)}</Avatar>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{user?.name || "..."}</Typography>
          <Typography level="body-xs">
            {user?.email || "..." || "..."}
          </Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral" onClick={logout}>
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}
