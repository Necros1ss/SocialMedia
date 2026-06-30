import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns"; // Import the function to format dates
import ReplyInput from "./ReplyInput.jsx";
import OptionButton from "../Common/OptionButton.jsx";
import "../../styles/comment.css";
import { CommentApi } from "../../utils/ultis.jsx";
import Reaction from "./Reaction.jsx";

const Item = ({
  userId,
  commentIndex,
  postId,
  commentList,
  setCommentList,
}) => {
  const comment = commentList[commentIndex];
  const onDelete = async () => {
    try {
      await CommentApi.deleteComment(comment);
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };
  const handleCommentReply = async (replyData) => {
    try {
      const response = await CommentApi.createForComment(replyData);
      if (response.ok) {
        console.log("this should refresh");
      }
      const data = await response.json();
      setCommentList([...commentList, { ...data, showReplies: false }]);
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };
  return (
    <article key={comment.id} className="comment-item" style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
      <img
        src={"https://api.dicebear.com/7.x/adventurer/svg?seed=" + comment.user.name}
        alt="avatar"
        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
      />
      <div className="comment-content-wrapper" style={{ flex: 1 }}>
        <div className="comment-bubble" style={{ background: '#f3f4f6', borderRadius: '16px', padding: '12px 16px', display: 'block', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#1f2937' }}>{comment.user.name}</span>
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>
              {formatDistanceToNow(new Date(comment.createdAt))} ago
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: '#4b5563', lineHeight: '1.5' }}>{comment.content}</p>
        </div>

        <div className="comment-actions" style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '4px 16px', marginTop: '4px' }}>
          <Reaction
            userId={userId}
            userReaction={comment.userReaction}
            reactions={comment.reaction}
            interactableId={comment.interactableItemId}
            entityId={comment.id}
            targetType="COMMENT"
          />
          <ReplyInput
            postId={postId}
            parentCommentId={comment.id}
            onSubmit={handleCommentReply}
          />
          <OptionButton onDelete={onDelete} onReport={() => { }} />
        </div>

        <div className="comment-replies" style={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '2px solid #e5e7eb' }}>
          {comment.showReplies ? (
            <Comment
              userId={userId}
              parentCommentId={comment.id}
              setCommentList={setCommentList}
              commentList={commentList}
            />
          ) : (
            comment.replied && (
              <button
                className="comment-replied"
                onClick={() => {
                  comment.showReplies = true;
                  setCommentList([...commentList]);
                }}
                style={{ background: 'transparent', border: 'none', color: '#1064ea', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}
              >
                View replies
              </button>
            )
          )}
        </div>
      </div>
    </article>
  );
};
const Comment = ({
  userId,
  postId,
  parentCommentId,
  commentList,
  setCommentList,
}) => {
  // Require either a postId (top-level comments) or a parentCommentId (replies).
  if (!postId && !parentCommentId) return null;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // useEffect(() => {
  //   const mockComments = [
  //     {
  //       id: 1,
  //       content: "Bài viết này thật tuyệt vời!",
  //       user: {
  //         id: 1,
  //         name: "nguyenan",
  //       },
  //       reaction: [],
  //       replied: true,
  //     },
  //     {
  //       id: 2,
  //       content: "Mình học được rất nhiều từ bài này, cảm ơn bạn!",
  //       user: {
  //         id: 2,
  //         name: "tranbinh",
  //       },
  //       reaction: [
  //         ["LIKE", 12],
  //         ["LOVE", 5],
  //       ],
  //       replied: false,
  //     },
  //     {
  //       id: 3,
  //       content: "Có thể giải thích thêm phần useEffect không ạ?",
  //       user: {
  //         id: 3,
  //         name: "phamlan",
  //       },
  //       reaction: [["LIKE", 8]],
  //       replied: true,
  //     },
  //     {
  //       id: 4,
  //       content: "Code rất sạch và dễ hiểu, vote 10 điểm",
  //       user: {
  //         id: 4,
  //         name: "levan",
  //       },
  //       reaction: [
  //         ["LIKE", 25],
  //         ["LOVE", 10],
  //         ["WOW", 3],
  //       ],
  //       replied: false,
  //     },
  //     {
  //       id: 5,
  //       content: "Mình thử chạy thì bị lỗi CORS, bạn có cách nào fix không?",
  //       user: {
  //         id: 5,
  //         name: "hoangminh",
  //       },
  //       reaction: [["LIKE", 3]],
  //       replied: true,
  //     },
  //   ];
  // Khi đang dev hoặc backend chưa xong → dùng mock
  //   setComments(mockComments);
  // }, [postId]);

  useEffect(() => {
    let ignore = false;
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await (postId
          ? CommentApi.getFromPost(postId)
          : CommentApi.getFromComment(parentCommentId));
        // const response = await fetch(
        //   postId
        //     ? `http://localhost:8080/api/comments/${postId}?page=0&size=10`
        //     : `http://localhost:8080/api/comments/parent/${parentCommentId}?page=0&size=10`,
        // );

        if (!response.ok) {
          throw new Error("Không tải được bình luận");
        }

        const data = await response.json();
        if (!ignore) {
          setCommentList((prevComments) => [
            ...prevComments,

            ...data.map((comment) => {
              comment.showReplies = false;
              return comment;
            }),
          ]);
        }
      } catch (err) {
        setError(err.message || "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
    return () => {
      ignore = true;
    };
  }, [parentCommentId, postId, setCommentList]);

  if (loading) {
    return <div className="comments-loading">Loading comments...</div>;
  }

  if (error) {
    return <div className="comments-error">Error: {error}</div>;
  }

  if (commentList.length === 0) {
    return (
      <div className="comments-empty">
        Nobody's responded to this post yet. Add your thoughts and get the
        conversation going.{" "}
      </div>
    );
  }

  return (
    <section className="comments-section">
      <div className="comments-list">
        {commentList.map((comment, index) => {
          if (
            (postId && comment.parentCommentId == null) ||
            (parentCommentId && comment.parentCommentId == parentCommentId)
          ) {
            return (
              <Item
                key={comment.id}
                userId={userId}
                commentIndex={index}
                postId={postId}
                commentList={commentList}
                setCommentList={setCommentList}
              ></Item>
            );
          }
        })}
      </div>
    </section>
  );
};

export default Comment;
