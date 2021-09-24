import React from "react";
import { Route } from "react-router-dom";
import { RatingModal } from "../../subscriptions/rating/rating-modal";
import { Instructors } from "../instructors/instructors";
import { ClassicSidebar } from "./sidebar-classic";
import { Sidebar } from "./sidebar";

export const MergedSidebar = ({ subscription, courseId, ratingStatus,designType }) => {
  return (
    <>
      {!designType ? (
        <>
          {subscription && subscription.chatChannelSid && (
            <ClassicSidebar
              id={courseId}
              chatChannelSid={subscription && subscription.chatChannelSid}
            />
          )}
        </>
      ) : (
        <>
          {subscription && subscription.chatChannelSid && (
            <Sidebar
              courseId={courseId}
              id={courseId}
              chatChannelSid={subscription && subscription.chatChannelSid}
            />
          )}
        </>
      )}
    </>
  );
};
