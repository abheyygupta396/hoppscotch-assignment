import React, { useEffect } from "react";
import NewIssueList from "./NewIssueList";

function IssueList() {
  return (
    <div className="flex flex-col overflow-auto">
      <NewIssueList />
    </div>
  );
}

export default IssueList;
