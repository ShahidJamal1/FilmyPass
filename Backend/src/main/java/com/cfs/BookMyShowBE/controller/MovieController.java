package com.cfs.BookMyShowBE.controller;

import com.cfs.BookMyShowBE.dto.MapMovieRequest;
import com.cfs.BookMyShowBE.dto.MovieResponse;
import com.cfs.BookMyShowBE.service.CatalogService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/movies")
public class MovieController {

    private final CatalogService catalogService;

    public MovieController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @GetMapping
    public List<MovieResponse> movies() {
        return catalogService.movies();
    }

    @GetMapping("/{id}")
    public MovieResponse movie(@PathVariable Long id) {
        return catalogService.movie(id);
    }

    @GetMapping("/tmdb/{tmdbId}")
    public MovieResponse movieByTmdb(@PathVariable Long tmdbId) {
        return catalogService.movieByTmdbId(tmdbId);
    }

    @PostMapping("/map")
    @ResponseStatus(HttpStatus.OK)
    public MovieResponse mapMovie(@RequestBody MapMovieRequest request) {
        return catalogService.mapOrSyncMovie(request);
    }
}