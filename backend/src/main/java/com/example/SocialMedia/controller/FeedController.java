package com.example.SocialMedia.controller;

import com.example.SocialMedia.dto.FeedItemResponse;
import com.example.SocialMedia.dto.PostResponse;
import com.example.SocialMedia.service.FeedService;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/feed")
public class FeedController {
    private final FeedService feedService;
    public FeedController(FeedService feedService) {
        this.feedService = feedService;
    }
    @GetMapping("/{userId}")
    public List<FeedItemResponse> getHome(@PathVariable int userId, Pageable pageable) {
        return feedService.getUnifiedHome(userId, pageable);
    }
    @GetMapping("/popular")
    public List<FeedItemResponse> getPopular(Pageable pageable) {
        return feedService.getUnifiedPopular(pageable);
    }
    @GetMapping("/discussion")
    public List<FeedItemResponse> getDiscussion(Pageable pageable) {
        return feedService.getUnifiedDiscussion(pageable);
    }
}
