import React from "react";
import NewEvent from "./CreateEvent/NewEvent";
import Header from "./Header";

function NewEventMainPage() {
  return (
    <div>
      <Header />
      <div style={{ marginTop: "80px" }}>
        <NewEvent />
      </div>
    </div>
  );
}

export default NewEventMainPage;
