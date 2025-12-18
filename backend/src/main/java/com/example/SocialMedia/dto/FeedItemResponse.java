package com.example.SocialMedia.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class FeedItemResponse {
    private String itemType; // "POST" or "SHARE"
    private Integer id; // postId or shareId
    private Integer interactableItemId;
    
    // For shares
    private String shareCaption;
    private String sharerUsername;
    private LocalDateTime sharedAt;
    
    // Original post data (for both posts and shares)
    private Integer originalPostId;
    private String content;
    private String postTopic;
    private String location;
    private String username; // Original post author
    private List<Object[]> reactionCount;
    private Integer commentCount;
    private Integer shareCount;
    private PostMediaResponse[] medias;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
