import React from "react";
import Events from "./Events/Events";
import Header from "./Header";

function Home({ isUserAdmin }) {
  return (
    <div>
      <Header />
      <div style={{ marginTop: "80px" }}>
        <Events isUserAdmin={isUserAdmin} />
      </div>
    </div>
  );
}

export default Home;
