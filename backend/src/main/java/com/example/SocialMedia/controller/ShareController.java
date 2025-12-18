package com.example.SocialMedia.controller;

import com.example.SocialMedia.dto.ShareRequest;
import com.example.SocialMedia.dto.ShareResponse;
import com.example.SocialMedia.service.ShareService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shares")
@RequiredArgsConstructor
public class ShareController {

    private final ShareService shareService;

    @PostMapping
    public ResponseEntity<ShareResponse> createShare(
            @RequestBody ShareRequest request,
            Authentication authentication) {
        String username = (authentication != null) ? authentication.getName() : "nguyenan";
        ShareResponse response = shareService.createShare(request, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShareResponse> getShareById(@PathVariable Integer id) {
        ShareResponse response = shareService.getShareById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Page<ShareResponse>> getAllShares(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "sharedLocalDateTime") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDirection) {
        
        Sort.Direction direction = sortDirection.equalsIgnoreCase("ASC") 
                ? Sort.Direction.ASC 
                : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        
        Page<ShareResponse> shares = shareService.getAllShares(pageable);
        return ResponseEntity.ok(shares);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<ShareResponse>> getSharesByUser(
            @PathVariable Integer userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "sharedLocalDateTime"));
        Page<ShareResponse> shares = shareService.getSharesByUserId(userId, pageable);
        return ResponseEntity.ok(shares);
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<Page<ShareResponse>> getSharesByPost(
            @PathVariable Integer postId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "sharedLocalDateTime"));
        Page<ShareResponse> shares = shareService.getSharesByPostId(postId, pageable);
        return ResponseEntity.ok(shares);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShareResponse> updateShare(
            @PathVariable Integer id,
            @RequestBody ShareRequest request,
            Authentication authentication) {
        String username = (authentication != null) ? authentication.getName() : "nguyenan";
        ShareResponse response = shareService.updateShare(id, request, username);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShare(
            @PathVariable Integer id,
            Authentication authentication) {
        String username = (authentication != null) ? authentication.getName() : "nguyenan";
        shareService.deleteShare(id, username);
        return ResponseEntity.noContent().build();
    }
}
