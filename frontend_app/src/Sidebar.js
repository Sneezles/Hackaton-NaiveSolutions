import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddIcon from '@material-ui/icons/Add'; import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link as LinkRoute, useHistory } from "react-router-dom"

export default function Sidebar() {
  return (
    <div>
      <LinkRoute to="/home">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </LinkRoute>

      <LinkRoute to="/add">
        <ListItem button>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add" />
        </ListItem>
      </LinkRoute>

    </div>
  );
}

