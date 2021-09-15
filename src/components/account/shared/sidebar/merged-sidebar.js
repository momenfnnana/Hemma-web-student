import React from "react";
import { Route } from "react-router-dom";
import { RatingModal } from "../../subscriptions/rating/rating-modal";
import { Instructors } from "../instructors/instructors";
import { ClassicSidebar } from "./sidebar-classic";
import { Sidebar } from "./sidebar";

export const MergedSidebar = ({ subscription, courseId, ratingStatus }) => {
  const { pathname } = window.location;
  const isClassic = pathname.includes("classic-schedule");
  return (
    <>
      {isClassic ? (
        <Route path="/course/content/:id/classic-schedule" exact>
          {subscription && subscription.chatChannelSid && (
            <ClassicSidebar
              id={courseId}
              chatChannelSid={subscription && subscription.chatChannelSid}
            />
          )}
        </Route>
      ) : (
        <Route path="/course/content/:id/schedule" exact>
          {subscription && subscription.chatChannelSid && (
            <Sidebar
              courseId={courseId}
              id={courseId}
              chatChannelSid={subscription && subscription.chatChannelSid}
            />
          )}
        </Route>
      )}
    </>
  );
};
