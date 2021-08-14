import { lectureEnum } from "./../enums/lecture";
export const getStatusText = (status) => {
  return lectureEnum?.[status] || "";
};
