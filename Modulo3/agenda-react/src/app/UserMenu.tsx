import {
  Avatar,
  Icon,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { userContext } from "./authContext";
import { signOutEndpoint } from "./backend";

const useStyles = makeStyles({
  userDetails: {
    borderBottom: "1px solid rgb(224, 224, 224)",
    padding: "16px",
    marginBottom: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      marginBottom: "8px",
    },
  },
});

interface IUserMenu {
  onSignOut: () => void;
}

export function UserMenu(props: IUserMenu) {
  // Pegando o user autenticado na app através do context
  const user = useContext(userContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function signOut() {
    signOutEndpoint();
    props.onSignOut();
  }

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar>
          <Icon>person</Icon>
        </Avatar>
      </IconButton>
      <Menu
        id="simpleMenu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className={classes.userDetails}>
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
          <div>{user.name}</div>
          <small>{user.email}</small>
        </div>
        <MenuItem onClick={signOut}>Sair</MenuItem>
      </Menu>
    </div>
  );
}
