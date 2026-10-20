package com.cfs.BookMyShowBE.controller;

import com.cfs.BookMyShowBE.dto.SeatResponse;
import com.cfs.BookMyShowBE.dto.ShowResponse;
import com.cfs.BookMyShowBE.service.CatalogService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/shows")
public class ShowController {

    private final CatalogService catalogService;

    public ShowController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @GetMapping
    public List<ShowResponse> shows(@RequestParam String city,
                                    @RequestParam LocalDate date,
                                    @RequestParam(required = false) Long movieId) {
        return catalogService.shows(city, date, movieId);
    }

    @GetMapping("/{id}")
    public ShowResponse show(@PathVariable Long id) {
        return catalogService.show(id);
    }

    @GetMapping("/{id}/seats")
    public List<SeatResponse> seats(@PathVariable Long id) {
        return catalogService.showSeats(id);
    }
}