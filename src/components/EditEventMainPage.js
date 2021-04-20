import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import EditEvent from "./EditEvent/EditEvent";

function EditEventMainPage() {
  const location = useLocation();
  function useQuery() {
    return new URLSearchParams(location.search);
  }

  let query = useQuery();
  return (
    <div>
      <Header />
      <div style={{ marginTop: "80px" }}>
        <EditEvent
          pname={query.get("name")}
          pdesc={query.get("desc")}
          phigh={query.get("high")}
          pby={query.get("by")}
          pentry={query.get("entry")}
          pprize={query.get("prize")}
          pdeadline={query.get("deadline")}
          purl={query.get("url")}
          pid={query.get("id")}
        />
      </div>
    </div>
  );
}

export default EditEventMainPage;
