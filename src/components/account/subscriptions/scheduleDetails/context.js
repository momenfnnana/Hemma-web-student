import { createContext } from "react";

export const ScheduleContext = createContext({
  chapterFound: {},
  sectionFound: {},
  chapters: [],
  details: {},
});
