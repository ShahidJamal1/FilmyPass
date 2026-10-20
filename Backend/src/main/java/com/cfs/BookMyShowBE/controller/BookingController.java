package com.cfs.BookMyShowBE.controller;

import com.cfs.BookMyShowBE.dto.BookingResponse;
import com.cfs.BookMyShowBE.dto.CancelBookingRequest;
import com.cfs.BookMyShowBE.dto.CreateBookingRequest;
import com.cfs.BookMyShowBE.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    public record DirectBookingRequest(Long showId, Long profileId, java.util.List<String> seatLabels) {}

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponse bookDirect(@RequestBody DirectBookingRequest request) {
        Long showId = request.showId();
        if (showId == null) {
            throw new IllegalArgumentException("showId is required");
        }
        return bookingService.book(showId, new CreateBookingRequest(request.profileId(), request.seatLabels()));
    }

    @PostMapping("/shows/{showId}")
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponse book(@PathVariable Long showId, @RequestBody CreateBookingRequest request)
    {
        return bookingService.book(showId, request);
    }

    @PostMapping("/{bookingId}/cancel")
    public BookingResponse cancel(@PathVariable Long bookingId, @RequestBody CancelBookingRequest request)
    {
        return bookingService.cancel(bookingId, request.profileId());
    }

    @GetMapping("/{bookingId}")
    public BookingResponse find(@PathVariable Long bookingId)
    {
        return bookingService.find(bookingId);
    }
}