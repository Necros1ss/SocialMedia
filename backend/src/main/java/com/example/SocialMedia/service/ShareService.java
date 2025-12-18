package com.example.SocialMedia.service;

import com.example.SocialMedia.dto.ShareRequest;
import com.example.SocialMedia.dto.ShareResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ShareService {
    ShareResponse createShare(ShareRequest request, String username);
    ShareResponse getShareById(Integer shareId);
    Page<ShareResponse> getAllShares(Pageable pageable);
    Page<ShareResponse> getSharesByUserId(Integer userId, Pageable pageable);
    Page<ShareResponse> getSharesByPostId(Integer postId, Pageable pageable);
    ShareResponse updateShare(Integer shareId, ShareRequest request, String username);
    void deleteShare(Integer shareId, String username);
}
