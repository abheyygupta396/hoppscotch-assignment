import React, { useMemo, useCallback } from "react";
import { useTable, useBlockLayout, useSortBy, useRowSelect } from "react-table";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { useSticky } from "react-table-sticky";
import { VscAccount } from "react-icons/vsc";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export default function Table({
  columns,
  data,
  update,
  hasNextPage,
  isNextPageLoading,
  totalItems,
  page,
}) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 200,
    }),
    []
  );

  const setWidth = {
    title: "100%",
    id: "220px",
    status: "420px",
    assignee: "420px",
    priority: "420px",
  };

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      autoResetSelectedRows: false,
      defaultColumn,
    },
    useSortBy,
    useRowSelect,
    useBlockLayout,
    useSticky,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "index",
          sticky: "left",
          Cell: ({ row }) => (
            <div>
              <HiOutlineDotsHorizontal />
            </div>
          ),
        },
        ...columns,
        {
          id: "actions",
          sticky: "right",
          width: 30,
          Cell: ({ row }) => (
            <div>
              <VscAccount />
            </div>
          ),
        },
      ]);
    }
  );

  const itemCount = hasNextPage ? rows.length + 1 : rows.length;
  const loadMoreItems = isNextPageLoading ? () => {} : update;
  const isItemLoaded = useCallback(
    (index) => !hasNextPage || index < rows.length,
    [hasNextPage, rows]
  );
  const RenderRow = React.useCallback(
    (rows) =>
      ({ index, style }) => {
        if (!isItemLoaded(index))
          return (
            <div className="flex border-b border-gray-300 py-2">
              <div className="px-4">Loading</div>
            </div>
          );
        const row = rows[index];
        prepareRow(row);
        const { style: rowStyle, ...restRow } = row.getRowProps({ style });
        return (
          <div
            {...restRow}
            style={{ ...rowStyle }}
            className="flex border-b border-gray-300 py-2"
            id={`table-row-${index}`}
          >
            {row.cells?.map((cell, cellIndex) => (
              <div
                {...cell.getCellProps()}
                className="px-4"
                key={cellIndex}
                style={{ width: setWidth[cell.column.id] }}
              >
                {cell.render("Cell")}
              </div>
            ))}
          </div>
        );
      },
    [prepareRow, isItemLoaded, totalColumnsWidth]
  );

  // Render the UI for your table
  return (
    <>
      <div {...getTableProps()} className="sticky">
        <div style={{ position: "relative", flex: 1, zIndex: 0 }}>
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <FixedSizeList
                height={800}
                itemCount={rows.length}
                itemSize={35}
                onItemsRendered={onItemsRendered}
                ref={ref}
                innerElementType={({ children, style, ...rest }) => (
                  <div style={{ position: "relative" }} className="body">
                    <div {...getTableBodyProps()} {...rest} style={style}>
                      {children}
                    </div>
                  </div>
                )}
              >
                {RenderRow(rows)}
              </FixedSizeList>
            )}
          </InfiniteLoader>
        </div>
        {hasNextPage ? (
          <div className="flex justify-center items-center pt-5">
            {isNextPageLoading ? (
              "Loading more items..."
            ) : (
              <>
                Current Page: {page} -- Showing {totalItems} results.{" "}
                <span
                  onClick={loadMoreItems}
                  className="cursor-pointer underline text-primary pl-4"
                >
                  Load more items
                </span>
              </>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center pt-5">
            <span className="text-primary pl-4">You are on last page !!</span>
          </div>
        )}
      </div>
    </>
  );
}
