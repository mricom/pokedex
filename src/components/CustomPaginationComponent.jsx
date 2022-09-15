import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import "../css/CustomPagination.css";

export default function CustomPagination(props) {
  return (
    <div
      className={
        "d-flex justify-content-center custom-pagination " + props.className
      }
    >
      <Pagination
        count={props.pagesCount}
        page={props.page}
        siblingCount={1}
        boundaryCount={1}
        variant="outlined"
        onChange={props.handlePageChange}
      />
    </div>
  );
}
