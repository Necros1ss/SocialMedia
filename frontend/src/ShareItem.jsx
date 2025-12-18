import { formatDistanceToNow } from "date-fns";
import FeedItem from "./FeedItem";

const ShareItem = ({ userId, item, openPost }) => {
  return (
    <div className="share-wrapper">
      {/* Share header */}
      <div className="share-header" style={{ 
        padding: '12px 16px', 
        backgroundColor: '#f8f9fa',
        borderRadius: '8px 8px 0 0',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8L22 12L18 16M6 16L2 12L6 8M14 4L10 20"/>
          </svg>
          <span style={{ fontWeight: '600', color: '#1a1a1a' }}>
            {item.sharerUsername}
          </span>
          <span style={{ color: '#666' }}>shared a post</span>
          <span style={{ color: '#999', fontSize: '14px', marginLeft: 'auto' }}>
            {formatDistanceToNow(new Date(item.sharedAt), { addSuffix: true })}
          </span>
        </div>
        
        {/* Share caption */}
        {item.shareCaption && (
          <div style={{ 
            marginTop: '8px', 
            fontSize: '15px',
            color: '#333',
            lineHeight: '1.4'
          }}>
            {item.shareCaption}
          </div>
        )}
      </div>
      
      {/* Original post */}
      <div style={{ 
        border: '2px solid #e0e0e0',
        borderRadius: '0 0 8px 8px',
        overflow: 'hidden'
      }}>
        <FeedItem
          userId={userId}
          post={{
            id: item.originalPostId,
            username: item.username,
            postTopic: item.postTopic,
            location: item.location,
            content: item.content,
            medias: item.medias,
            reactionCount: item.reactionCount,
            commentCount: item.commentCount,
            shareCount: item.shareCount,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            interactableItemId: item.interactableItemId
          }}
          openPost={openPost}
          isNested={true}
        />
      </div>
    </div>
  );
};

export default ShareItem;
