import TrainerVideo from "./video/index";
import React from "react";

const VIDEO_EXTENSIONS = ["webm", "mp4"];
const IMG_EXTENSIONS = ["png", "jpg"];
const VIDEO_TYPE = "VIDEO_TYPE";
const IMG_TYPE = "IMG_TYPE";
const OTHER_FILE_TYPE = "OTHER_FILE_TYPE";

const getFileExtension = (fileUrl = "") => {
  const splittedByDot = fileUrl.split(".");
  const type = splittedByDot?.[splittedByDot.length - 1];
  return type;
};

const isType = (fileExt, extenstions) => extenstions.includes(fileExt);

export const getType = (fileUrl = "") => {
  const fileExtension = getFileExtension(fileUrl);
  const isVideo = isType(fileExtension, VIDEO_EXTENSIONS);
  const isImg = isType(fileExtension, IMG_EXTENSIONS);
  return isVideo ? VIDEO_TYPE : isImg ? IMG_TYPE : OTHER_FILE_TYPE;
};

export const attachmentsForammter = (attachments = {}) => {
  let entries = Object.entries(attachments);
  entries = entries.map(([key, value]) => {
    const fileType = getType(value);
    const fileName = key;
    return {
      fileType,
      name: fileName,
      url: value,
    };
  });

  return entries;
};

const AttachedFile = ({ url, name }) => {
  return (
    <a className="d-flex align-items-center" target="_blank" href={url}>
      <i className="fas fa-paperclip mx-2"></i>
      <span>{name}</span>
    </a>
  );
};

export const AttachmentsReducer = ({ attachment = {}, ...rest }) => {
  const { fileType, url, name } = attachment;
  switch (fileType) {
    case VIDEO_TYPE:
      return <TrainerVideo videoUrl={url} {...rest} />;
    case IMG_TYPE:
      return <img className="w-100 h-auto" src={url} alt={name} {...rest} />;
    case OTHER_FILE_TYPE:
      return <AttachedFile url={url} name={name} />;
    default:
      return null;
  }
};

export const AttachmentRenderer = ({ attachments = {}, id, ...rest }) => {
  const safeAttachments = attachmentsForammter(attachments) || [];
  return (
    <div className="d-flex flex-column">
      {safeAttachments?.map((attachment) => (
        <div className="my-1">
          <AttachmentsReducer attachment={attachment} {...rest} />
        </div>
      ))}
    </div>
  );
};
