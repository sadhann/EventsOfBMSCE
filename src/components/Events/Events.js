import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import { Button, CircularProgress, IconButton } from "@material-ui/core";
import { db, firebase, auth } from "../../config/firebase";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CongoAnimation from "./CongoAnimation";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import { Link } from "react-router-dom";
import DeleteOutlineTwoToneIcon from "@material-ui/icons/DeleteOutlineTwoTone";
import PeopleTwoToneIcon from "@material-ui/icons/PeopleTwoTone";
import Badge from "@material-ui/core/Badge";

function Events({ isUserAdmin }) {
  const [events, setEvents] = useState(null);
  const [user, setUser] = useState(null);
  const [reg, setReg] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [animation, setAnimation] = useState(false);
  const [notReg, setNotReg] = useState(false);

  const dateTime = new Date().getTime();

  useEffect(async () => {
    async function fetchData() {
      await db
        .collection("events")
        .where("deadline", ">", dateTime)
        .orderBy("deadline", "desc")
        .onSnapshot(async (snap) => {
          const data = snap.docs.map((event) => event.data());
          await setEvents(data);
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [auth]);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(false);
    }, 3000);
  }, [animation]);
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const logIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth
      .signInWithPopup(provider)
      .then(function (result) {})
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  const registerAnEvent = async (id, user) => {
    await setReg(id);
    const getEvent = await db.collection("events").doc(id).get();
    const oneEvent = getEvent.data();
    const emails = oneEvent.registered;
    const check = emails?.map((e) => e.email);

    if (check?.includes(user.email)) {
      setMessage("You have Already registered for this Event");
      setMessageType("warning");
      handleClick();
      setNotReg(false);
    } else {
      await db
        .collection("events")
        .doc(id)
        .update(
          {
            registered: firebase.firestore.FieldValue.arrayUnion({
              name: user.displayName,
              photoURL: user.photoURL,
              email: user.email,
              phone: user.phoneNumber,
            }),
          },
          (error) => {
            console.log(error);
          }
        )
        .then(() => {
          setMessage("Successfully registered for this event");
          setAnimation(true);
          setMessageType("success");
          handleClick();
        });
    }
    await setReg("");
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const deleteEvent = async (eid) => {
    await db.collection("events").doc(eid).delete();
  };

  return (
    <div>
      {animation ? <CongoAnimation /> : null}
      {events
        ? events.map((event, indx) => {
            const TotalRegisterdUsers = event.registered.length;
            const pdeadline = new Date(event.deadline).toISOString();
            return (
              <div className="App_body" key={indx}>
                <Card
                  className="App_card"
                  style={{
                    backgroundColor: "#0d111a",
                    width: "600px",
                    border: "1px",
                    borderColor: "#535353",
                    borderStyle: "solid",
                    padding: "10px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {isUserAdmin ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <div>
                          <Link to={`/registered-users/${event.id}`}>
                            <IconButton>
                              <Badge
                                badgeContent={TotalRegisterdUsers}
                                color="secondary"
                              >
                                <PeopleTwoToneIcon
                                  fontSize="small"
                                  style={{ color: "white" }}
                                />
                              </Badge>
                            </IconButton>
                          </Link>
                        </div>
                        <div>
                          <Link
                            to={`/edit-event?name=${event.name}&desc=${event.decs}&high=${event.high}&by=${event.by}&entry=${event.entry}&prize=${event.prize}&deadline=${pdeadline}&url=${event.url}&id=${event.id}`}
                          >
                            <IconButton>
                              <EditTwoToneIcon
                                fontSize="small"
                                style={{ color: "white" }}
                              />
                            </IconButton>
                          </Link>
                          <IconButton onClick={() => deleteEvent(event.id)}>
                            <DeleteOutlineTwoToneIcon
                              fontSize="small"
                              style={{ color: "white" }}
                            />
                          </IconButton>
                        </div>
                      </div>
                    ) : null}
                    <div style={{ display: "flex" }}>
                      <img src={event.url} style={{ width: "150px" }} />
                      <div style={{ marginLeft: "20px" }}>
                        <h3 style={{ margin: 0, color: "white" }}>
                          {event.name}
                        </h3>
                        <h5
                          style={{
                            margin: 0,
                            marginTop: "5px",
                            color: "#c0c0c0",
                            fontWeight: "400",
                          }}
                        >
                          {event.decs}
                        </h5>
                        <h4
                          style={{
                            margin: "2px",
                            marginTop: "5px",
                            color: "#ffc400",
                          }}
                        >
                          {event.high}
                        </h4>
                        <p
                          style={{
                            margin: "2px",
                            fontWeight: "500",
                            color: "#8b8b8b",
                          }}
                        >
                          Organized By: {event.by}
                        </p>
                        <p
                          style={{
                            margin: "2px",
                            fontWeight: "500",
                            color: "#8b8b8b",
                          }}
                        >
                          Entry: {event.entry}
                        </p>
                        <p
                          style={{
                            margin: "2px",
                            fontWeight: "500",
                            color: "#8b8b8b",
                          }}
                        >
                          Prize Money: {event.prize}
                        </p>
                        <p
                          style={{
                            margin: "2px",
                            fontWeight: "500",
                            color: "#8b8b8b",
                          }}
                        >
                          Deadline: {new Date(event.deadline).toLocaleString()}
                        </p>
                        <Button
                          style={{
                            backgroundColor: "#d4d3d3",
                            borderRadius: "2px",
                            marginTop: "5px",
                          }}
                          disabled={user === null}
                          fullWidth
                          onClick={() => registerAnEvent(event.id, user)}
                        >
                          {reg === event.id ? (
                            <CircularProgress
                              thickness={5}
                              size={24}
                              style={{ color: "black" }}
                            />
                          ) : (
                            "Register Now"
                          )}
                        </Button>

                        <Snackbar
                          open={open}
                          autoHideDuration={4000}
                          onClose={handleClose}
                        >
                          <Alert onClose={handleClose} severity={messageType}>
                            {message}
                          </Alert>
                        </Snackbar>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Events;
