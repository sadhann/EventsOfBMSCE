import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

function RegisteredUsers({ eid }) {
  const [event, setEvent] = useState("");

  useEffect(() => {
    const getData = async () => {
      const getEvent = await db.collection("events").doc(eid).get();
      const anEvent = await getEvent.data();
      console.log(anEvent);
      await setEvent(anEvent);
    };
    getData();
  }, []);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2 style={{ color: "grey" }}>{event.name}</h2>
      <ThemeProvider theme={theme}>
        <TableContainer
          style={{
            backgroundColor: "black",
            maxWidth: "700px",
            margin: "0 auto",
          }}
          component={Paper}
        >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {event
                ? event.registered.map((e, indx) => (
                    <TableRow key={indx}>
                      <TableCell align="left" component="th" scope="row">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            sizes="small"
                            src={e.photoURL}
                            style={{ marginRight: "20px" }}
                          />
                          {e.name}
                        </div>
                      </TableCell>
                      <TableCell align="left">{e.email}</TableCell>
                      <TableCell align="left">null</TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </div>
  );
}

export default RegisteredUsers;
