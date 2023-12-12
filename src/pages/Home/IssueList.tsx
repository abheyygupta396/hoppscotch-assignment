import Table from "../../components/TableComponent";
import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";

const Styles = styled.div`
  padding: 1rem;
  width: 100%;
  display: inline-block;
  max-width: 100%;
  /* overflow: scroll; */
`;

function IssuesList() {
  const totalPages = 10;
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const hasNextPage = page < totalPages;

  useEffect(() => {
    if (hasNextPage) {
      fetchItems(page);
    }
  }, [page]);

  const fetchItems = async (pge = 1) => {
    try {
      const response = await fetch(
        `https://sfe-interview.hoppscotch.com/issues-${pge}.json`
      );
      const data = await response.json();
      setItems(data?.tickets);
    } catch (e) {
      return;
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Team Id",
        accessor: "id",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Priority",
        accessor: "priority",
      },
      {
        Header: "Assignee",
        accessor: "assignee",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  const fetchMoreData = () => {
    setLoading(true);
    setTimeout(() => {
      setPage(page + 1);
      setLoading(false);
    }, 500);
  };

  const data = React.useMemo(() => items, [items]);
  const limit = items?.length;

  return (
    <Styles>
      <Table
        columns={columns}
        data={data}
        update={fetchMoreData}
        hasNextPage={hasNextPage}
        isNextPageLoading={loading}
        totalItems={limit}
        page={page}
      />
    </Styles>
  );
}

export default IssuesList;
