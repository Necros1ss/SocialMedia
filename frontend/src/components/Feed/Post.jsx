import FeedItem from "./FeedItem";
import Comment from "./Comment.jsx";
import ReplyInput from "./ReplyInput.jsx";
import { CommentApi } from "../../utils/ultis.jsx";
import { useState } from "react";
const Post = ({ userId, post, goBack }) => {
  const [commentList, setCommentList] = useState([]);
  
  if (!post) return null;

  const handlePostReply = async (replyData) => {
    const response = await CommentApi.createForPost(replyData);
    const data = await response.json();
    setCommentList([...commentList, { ...data, showReplies: false }]);
  };
  return (
    <div className="post-page" style={{ paddingBottom: '20px', width: '100%' }}>
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.02)' }}>
        <FeedItem 
          userId={userId} 
          post={post} 
          goBack={goBack}
          replyInputComponent={<ReplyInput onSubmit={handlePostReply} postId={post.interactableItemId} postMedias={post.medias} />}
        />
      </div>

      <div>
        <Comment
          userId={userId}
          postId={post.id}
          setCommentList={setCommentList}
          commentList={commentList}
        />
      </div>
    </div>
  );
};
export default Post;
