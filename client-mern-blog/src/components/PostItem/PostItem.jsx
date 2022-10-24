import React from "react";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import style from "./PostItem.css";
const PostItem = ({ post }) => {
  if (!post) {
    return (
      <div className="text-xl text-center text-black py-10">Загрузка...</div>
    );
  }
  return (
    <Link to={`/${post._id}`}>
      <div className={"post"}>
        <div className={post.imgUrl ? "photo" : "noPhoto"}>
          {post.imgUrl && (
            <img
              src={`http://localhost:27017/${post.imgUrl}`}
              alt="img"
              className="object-cover w-full rounded-lg"
            />
          )}
        </div>
        <div className="post_header">
          <div className="text-xs text-black opacity-50">Created By {post.username}</div>
          <div className="text-xs text-black opacity-50">
            <Moment date={post.createdAt} format="D MMM YYYY" />
          </div>
        </div>
        <div className="text-black text-xl">{post.title}</div>
        <p className="text-black opacity-60 text-xs pt-4 line-clamp-4">
          {post.text}
        </p>

        <div className="flex gap-3 items-center mt-2">
          <button className="flex items-center justify-center gap-2 text-xs text-black opacity-50">
            <AiFillEye /> <span>{post.views}</span>
          </button>
          <button className="flex items-center justify-center gap-2 text-xs text-black opacity-50">
            <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
