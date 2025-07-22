import { Pagination, Select, TextInput } from "@mantine/core";
import { useState } from "react";

const PaginationComponent = ({ meta, filter }) => {
  const [goToPage, setGoToPage] = useState("");

  const handleGoToPageChange = (event) => {
    const value = event.target.value;
    setGoToPage(value);

    const pageNumber = Number(value);
    if (pageNumber > 0 && pageNumber <= meta?.total_page) {
      filter.setFieldValue("page", pageNumber);
    }
  };

  return (
    <div className="flex justify-end items-center flex-wrap gap-2 mt-5 mr-1 space-x-2">
      <Pagination
        size="xs"
        value={meta?.current_page}
        page={meta?.current_page}
        onChange={(page) => filter.setFieldValue("page", page)}
        total={meta?.total_page}
      />
      <Select
        value={meta?.items_per_page.toString()}
        onChange={(value) => filter.setFieldValue("limit", Number(value))}
        rightSection={<div className="text-[10px] pr-2">/page</div>}
        data={["3", "5", "10", "15", "20"]}
        size="xs"
        className="w-16"
      />
      <div className="flex items-center gap-2">
        <div className="text-xs">Go to</div>
        <TextInput
          value={goToPage}
          onChange={handleGoToPageChange}
          size="xs"
          className="w-full max-w-20"
        />
      </div>
    </div>
  );
};

export default PaginationComponent;
