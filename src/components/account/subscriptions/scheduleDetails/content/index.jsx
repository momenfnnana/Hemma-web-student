import React from "react";
import { Route } from "react-router";
import ChapterLectures from "../../schedule/section/chapterLectures";
import { urlTempalte } from "./../../schedule/section/index";
import { chapterSections } from "./../../schedule/section-content/index";
import ShowAt from "./../../../../../HOC/show-at/index";
import ChapterExams from './../../schedule/section/chapterExams/index';
import ChapterTrainings from './../../schedule/section/chapterTrainings/index';
import ChapterAttachments from './../../schedule/section/ChapterAttachments/index';
import SectionExams from './../../schedule/section/sectionExams/index';
import SectionTrainings from './../../schedule/section/sectionTrainings/index';

export default function DetailsContent({ isChapter, contentType }) {
  return (
    <div>
      <ShowAt at={isChapter && contentType === chapterSections.LECTURES}>
        <ChapterLectures />
      </ShowAt>
      <ShowAt at={isChapter && contentType === chapterSections.EXAMS}>
        <ChapterExams />
      </ShowAt>
      <ShowAt at={isChapter && contentType === chapterSections.TRAININGS}>
        <ChapterTrainings />
      </ShowAt>
      <ShowAt at={isChapter && contentType === chapterSections.ATTACHMENTS}>
        <ChapterAttachments />
      </ShowAt>
      <ShowAt at={!isChapter && contentType === chapterSections.EXAMS}>
        <SectionExams />
      </ShowAt>
      <ShowAt at={!isChapter && contentType === chapterSections.TRAININGS}>
        <SectionTrainings />
      </ShowAt>
    </div>
  );
}
