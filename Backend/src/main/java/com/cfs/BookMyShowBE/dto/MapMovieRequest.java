package com.cfs.BookMyShowBE.dto;

public record MapMovieRequest(
        Long tmdbId,
        String title,
        String language,
        String genre,
        Integer durationMinutes,
        String certificate,
        String description,
        String posterUrl,
        String trailerUrl
) {
}
