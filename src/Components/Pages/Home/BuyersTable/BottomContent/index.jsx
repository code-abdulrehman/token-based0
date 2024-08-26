import React, { useMemo } from 'react';
import { Pagination } from '@nextui-org/react';

const BottomContent = ({
  selectedKeys,
  filteredItems,
  page,
  pages,
  setPage
}) => {
  const bottomContent = useMemo(() => (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">
        {selectedKeys === "all"
          ? "All items selected"
          : `${selectedKeys.size} of ${filteredItems.length} selected`}
      </span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
      />
    </div>
  ), [selectedKeys, filteredItems.length, page, pages, setPage]);

  return bottomContent;
};

export default BottomContent;
