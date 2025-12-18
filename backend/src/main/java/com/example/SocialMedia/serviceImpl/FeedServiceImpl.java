package com.example.SocialMedia.serviceImpl;

import com.example.SocialMedia.dto.FeedItemResponse;
import com.example.SocialMedia.dto.PostResponse;
import com.example.SocialMedia.model.coredata_model.Post;
import com.example.SocialMedia.model.coredata_model.Share;
import com.example.SocialMedia.repository.*;
import com.example.SocialMedia.service.FeedService;
import com.example.SocialMedia.service.PostMediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedServiceImpl implements FeedService {
    private final FeedRepository feedRepository;
    private final ReactionRepository reactionRepository;
    private final ShareRepository shareRepository;
    private final CommentRepository commentRepository;
    private final PostMediaService postMediaService;
    int MAX_LOAD_MEDIA = 4;
    Pageable MEDIA_PAGEABLE = PageRequest.of(0, MAX_LOAD_MEDIA);

    @Autowired
    public FeedServiceImpl(FeedRepository feedRepository,
                           ReactionRepository reactionRepository,
                           ShareRepository shareRepository,
                           CommentRepository commentRepository,
                           PostMediaService postMediaService) {
        this.feedRepository = feedRepository;
        this.reactionRepository = reactionRepository;
        this.shareRepository = shareRepository;
        this.commentRepository = commentRepository;
        this.postMediaService = postMediaService;
    }
    private List<PostResponse> convertToPostResponse(Page<Post> posts){
        return posts.getContent().stream()
                .map(post -> new PostResponse.PostResponseBuilder()
                        .id(post.getPostId())
                        .content(post.getContent())
                        .postTopic(post.getPostTopic())
                        .location(post.getLocation())
                        .username(post.getUser().getUsername())
                        .createdAt(post.getCreatedLocalDateTime())
                        .interactableItemId(post.getInteractableItem().getInteractableItemId())
                        .updatedAt(post.getUpdatedLocalDateTime())
                        .commentCount(commentRepository.countCommentByPost(post))
                        .reactionCount(reactionRepository.countReactionsByInteractableItemId(post.getInteractableItem().getInteractableItemId()))
                        .shareCount(shareRepository.countShareByPost(post))
                        .medias(postMediaService.findByPost(post, MEDIA_PAGEABLE))
                        .build())
                .collect(Collectors.toList());
    }

    public List<PostResponse> getHome(int userId, Pageable pageable) {
        return convertToPostResponse(feedRepository.findFeed(userId, pageable));
    }
    public List<PostResponse> getPopular(Pageable pageable) {
        return convertToPostResponse(feedRepository.findPopular(pageable));
    }
    public List<PostResponse> getDiscussion(Pageable pageable) {
        return convertToPostResponse(feedRepository.findDiscussion(pageable));
    }
    
    private FeedItemResponse convertPostToFeedItem(Post post) {
        return FeedItemResponse.builder()
                .itemType("POST")
                .id(post.getPostId())
                .originalPostId(post.getPostId())
                .interactableItemId(post.getInteractableItem().getInteractableItemId())
                .content(post.getContent())
                .postTopic(post.getPostTopic())
                .location(post.getLocation())
                .username(post.getUser().getUsername())
                .reactionCount(reactionRepository.countReactionsByInteractableItemId(post.getInteractableItem().getInteractableItemId()))
                .commentCount(commentRepository.countCommentByPost(post))
                .shareCount(shareRepository.countShareByPost(post))
                .medias(postMediaService.findByPost(post, MEDIA_PAGEABLE))
                .createdAt(post.getCreatedLocalDateTime())
                .updatedAt(post.getUpdatedLocalDateTime())
                .build();
    }
    
    private FeedItemResponse convertShareToFeedItem(Share share) {
        Post originalPost = share.getPost();
        return FeedItemResponse.builder()
                .itemType("SHARE")
                .id(share.getShareId())
                .interactableItemId(share.getInteractableItem().getInteractableItemId())
                .shareCaption(share.getShareCaption())
                .sharerUsername(share.getUser().getUsername())
                .sharedAt(share.getSharedLocalDateTime())
                // Original post data
                .originalPostId(originalPost.getPostId())
                .content(originalPost.getContent())
                .postTopic(originalPost.getPostTopic())
                .location(originalPost.getLocation())
                .username(originalPost.getUser().getUsername())
                .reactionCount(reactionRepository.countReactionsByInteractableItemId(originalPost.getInteractableItem().getInteractableItemId()))
                .commentCount(commentRepository.countCommentByPost(originalPost))
                .shareCount(shareRepository.countShareByPost(originalPost))
                .medias(postMediaService.findByPost(originalPost, MEDIA_PAGEABLE))
                .createdAt(originalPost.getCreatedLocalDateTime())
                .updatedAt(originalPost.getUpdatedLocalDateTime())
                .build();
    }
    
    @Override
    public List<FeedItemResponse> getUnifiedHome(int userId, Pageable pageable) {
        List<FeedItemResponse> feedItems = new ArrayList<>();
        
        // Get posts
        Page<Post> posts = feedRepository.findFeed(userId, pageable);
        posts.getContent().forEach(post -> feedItems.add(convertPostToFeedItem(post)));
        
        // Get shares (limited to reasonable amount)
        Pageable sharePageable = PageRequest.of(0, pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "sharedLocalDateTime"));
        Page<Share> shares = shareRepository.findAll(sharePageable);
        shares.getContent().forEach(share -> feedItems.add(convertShareToFeedItem(share)));
        
        // Sort by date (newest first)
        feedItems.sort((a, b) -> {
            java.time.LocalDateTime dateA = a.getItemType().equals("SHARE") ? a.getSharedAt() : a.getCreatedAt();
            java.time.LocalDateTime dateB = b.getItemType().equals("SHARE") ? b.getSharedAt() : b.getCreatedAt();
            return dateB.compareTo(dateA);
        });
        
        // Return limited results
        return feedItems.stream().limit(pageable.getPageSize() * 2).collect(Collectors.toList());
    }
    
    @Override
    public List<FeedItemResponse> getUnifiedPopular(Pageable pageable) {
        List<FeedItemResponse> feedItems = new ArrayList<>();
        
        Page<Post> posts = feedRepository.findPopular(pageable);
        posts.getContent().forEach(post -> feedItems.add(convertPostToFeedItem(post)));
        
        return feedItems;
    }
    
    @Override
    public List<FeedItemResponse> getUnifiedDiscussion(Pageable pageable) {
        List<FeedItemResponse> feedItems = new ArrayList<>();
        
        Page<Post> posts = feedRepository.findDiscussion(pageable);
        posts.getContent().forEach(post -> feedItems.add(convertPostToFeedItem(post)));
        
        return feedItems;
    }
}
