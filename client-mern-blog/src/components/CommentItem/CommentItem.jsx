import React from "react";

const CommentItem = ({ cmt }) => {
  const avatar = cmt?.user?.trim().toUpperCase().split("").slice(0, 2);
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm">
        {avatar}
      </div>
      <div style={{inlineSize: '300px', overflowWrap: 'break-word'}}>
        <div className="text-Black text-[15px]">{cmt.user}</div>
        <div className="text-gray-600 text-[14px]">{cmt.comment}</div>
      </div>
    </div>
  );
};
export default CommentItem;
