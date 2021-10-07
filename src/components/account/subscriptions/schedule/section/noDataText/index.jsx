import React from "react";

export const NoDataText = ({
  emptyDataText = "لا يوجد بيانات حالية",
  loading = false,
  data = []
}) => (
  <>
    {!loading && !!!data?.length && (
      <p className="text-center my-3 position-absolute absolute-center">
        {emptyDataText}
      </p>
    )}
  </>
);
