import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import { db, firebase } from "../../config/firebase";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

function EditEvent({
  pname,
  pdesc,
  phigh,
  pby,
  pentry,
  pprize,
  pdeadline,
  purl,
  pid,
}) {
  let history = useHistory();
  const [name, setName] = useState(pname);
  const [desc, setDesc] = useState(pdesc);
  const [high, setHigh] = useState(phigh);
  const [by, setBy] = useState(pby);
  const [entry, setEntry] = useState(pentry);
  const [prize, setPrize] = useState(pprize);
  const [url, setUrl] = useState(purl);
  const [time, setTime] = useState(pdeadline.slice(0, 16));

  //state for loading
  const [loading, setLoading] = useState(false);

  const updateEvent = async () => {
    await setLoading(true);
    const timeToNum = new Date(time).getTime();
    await db.collection("events").doc(pid).update({
      name: name,
      decs: desc,
      high: high,
      by: by,
      entry: entry,
      prize: prize,
      url: url,
      deadline: timeToNum,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    await setName("");
    await setDesc("");
    await setHigh("");
    await setBy("");
    await setEntry("");
    await setPrize("");
    await setUrl("");
    await setTime("");
    await setLoading(false);
    history.push("/");
  };

  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  const textfieldStyle = {
    margin: "20px",
  };

  return (
    <div
      style={{
        margin: "0 auto",
        width: "600px",
        maxWidth: "600px",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontWeight: "400", color: "#cfcfcf" }}>Edit Event</h2>
      <ThemeProvider theme={theme}>
        <form>
          <TextField
            className="textfield"
            required
            fullWidth
            label="Event Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={textfieldStyle}
          />
          <TextField
            fullWidth
            required
            label="Description"
            variant="filled"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            style={textfieldStyle}
          />
          <TextField
            fullWidth
            required
            label="Highlight"
            variant="filled"
            value={high}
            onChange={(e) => setHigh(e.target.value)}
            style={textfieldStyle}
          />
          <TextField
            fullWidth
            required
            label="Organized By"
            variant="filled"
            value={by}
            onChange={(e) => setBy(e.target.value)}
            style={textfieldStyle}
          />
          <TextField
            fullWidth
            required
            label="Entry"
            variant="filled"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            style={textfieldStyle}
          />
          <TextField
            fullWidth
            required
            label="Price Money"
            variant="filled"
            value={prize}
            onChange={(e) => setPrize(e.target.value)}
            style={textfieldStyle}
          />
          <TextField
            fullWidth
            required
            label="Deadline"
            variant="filled"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={textfieldStyle}
          />
          <TextField
            fullWidth
            required
            label="Poster URL"
            variant="filled"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={textfieldStyle}
          />
          <Button
            fullWidth
            style={{
              color: "white",
              backgroundColor: "#161616",
              margin: "20px",
            }}
            onClick={updateEvent}
          >
            {loading ? (
              <CircularProgress thickness={3} size={24} color="white" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </ThemeProvider>
    </div>
  );
}
export default EditEvent;
