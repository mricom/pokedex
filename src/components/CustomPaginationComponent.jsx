import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import "../css/CustomPagination.css";

export default function CustomPagination(props) {
  const handlePageChange = (event, value) => {
    props.setPage(Math.max(1, value));
  };
  return (
    <div className="my-4 d-flex justify-content-center custom-pagination">
      <Pagination
        count={props.pagesCount}
        page={props.page}
        siblingCount={1}
        boundaryCount={1}
        variant="outlined"
        onChange={handlePageChange}
      />
    </div>
  );
}
