import React from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import "./index.scss";

const Exam = ({ exam, courseId, rowBtnText }) => {
  const examTime = exam.totalTime;
  const totalTime = Number(examTime);

  var h = Math.floor(totalTime / 3600);
  var m = Math.floor((totalTime % 3600) / 60);
  var s = Math.floor((totalTime % 3600) % 60);
  var time =
    ("0" + h).slice(-2) + ":" + ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2);
  return (
    <tr>
      <td scope="row" className="dark-silver-text small">
        {exam.title}
      </td>
      <td className="dark-silver-text small text-center">
        <span className="en-text">{time}</span>
      </td>
      <td className="en-text dark-silver-text small text-center">
        {exam.totalQuestions}
      </td>
      <td className="en-text dark-silver-text small text-center">
        {exam.totalAttempts}
      </td>
      <td>
        <Link
          to={`/course/content/${courseId}/exam/${exam.id}`}
          className="badge dark-bg text-white w-100"
        >
          {rowBtnText} الآن
        </Link>
        {/* <ToastDemo copyLink={{ btnName:'مشاركة الاختبار',link:this.createCourseLink(courseId,exam.id)}} />*/}
      </td>
    </tr>
  );
};

export default function ExamsList({
  loading,
  exams = [],
  emptyDataText = "لا يوجد بيانات حالية",
  tableHeaderText = "الامتحان",
  rowBtnText = "اختبر",
  ...rest
}) {
  return (
    <>
      <Table className="mb-0 table-responsive d-table position-relative">
        <thead className="silver-bg">
          <tr>
            <th className="w-40 dark-silver-text small border-0  white-space-pre">
              {tableHeaderText}
            </th>
            <th className="w-15 dark-silver-text small border-0 text-center white-space-pre">
              مدة {tableHeaderText}
            </th>
            <th className="w-15 dark-silver-text small border-0 text-center white-space-pre">
              عدد الأسئلة
            </th>
            <th className="w-15 dark-silver-text small border-0 text-center white-space-pre">
              عدد المحاولات
            </th>
            <th className="w-15 dark-silver-text small border-0 text-center white-space-pre">
              تحكم
            </th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <Exam rowBtnText={rowBtnText} exam={exam} {...rest} />
          ))}
        </tbody>
        {!loading && !exams.length && (
          <p className="text-center my-3 position-absolute absolute-center">
            {emptyDataText}
          </p>
        )}
        {loading && (
          <p className="text-center my-3 position-absolute absolute-center">
            loading...
          </p>
        )}
      </Table>
    </>
  );
}
