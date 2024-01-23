"use client";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { UserContext } from "@/app/contexts/UserContext";
import Link from "next/link";

const settings = ["Logout"];
const Action = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { user, dispatch } = React.useContext(UserContext);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const hanldeLogout = () => {
    dispatch && dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="p-1 bg-white rounded-full border-2 border-gray-200 flex items-center hover:border-gray-400">
      <Box sx={{ flexGrow: 0 }}>
        <Box>
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{
              p: 0,
              "&:hover": {
                backgroundColor: "#fff",
              },
            }}
          >
            <Avatar src="assets/images/avatar.png" />

            <ArrowDropDownIcon />
          </IconButton>
        </Box>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {user && (
            <MenuItem disabled>
              <Typography textAlign="center" fontSize={20}>
                {user.username}
              </Typography>
            </MenuItem>
          )}

          {user ? (
            <MenuItem onClick={hanldeLogout}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          ) : (
            <Link href={`/login`}>
              <MenuItem>
                <Typography textAlign="center">Login</Typography>
              </MenuItem>
            </Link>
          )}
        </Menu>
      </Box>
    </div>
  );
};

export default Action;
