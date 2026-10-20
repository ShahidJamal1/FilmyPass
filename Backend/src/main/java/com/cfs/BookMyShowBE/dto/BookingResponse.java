package com.cfs.BookMyShowBE.dto;

import com.cfs.BookMyShowBE.entity.Booking;
import com.cfs.BookMyShowBE.entity.BookingStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record BookingResponse(
        Long id,
        Long showId,
        Long profileId,
        String movieTitle,
        String moviePoster,
        String theatreName,
        String theatreAddress,
        LocalDateTime showStartsAt,
        String customerName,
        String customerEmail,
        String customerPhone,
        List<String> seatLabels,
        BigDecimal totalAmount,
        BookingStatus status,
        LocalDateTime bookedAt) {

    public static BookingResponse from(Booking booking) {
        String poster = booking.getShow() != null && booking.getShow().getMovie() != null
                ? booking.getShow().getMovie().getPosterUrl() : null;
        String address = booking.getShow() != null && booking.getShow().getTheatre() != null
                ? booking.getShow().getTheatre().getAddress() : null;
        LocalDateTime startsAt = booking.getShow() != null
                ? booking.getShow().getStartsAt() : null;
        Long showId = booking.getShow() != null ? booking.getShow().getId() : null;
        String movieTitle = booking.getShow() != null && booking.getShow().getMovie() != null
                ? booking.getShow().getMovie().getTitle() : null;
        String theatreName = booking.getShow() != null && booking.getShow().getTheatre() != null
                ? booking.getShow().getTheatre().getName() : null;

        return new BookingResponse(
                booking.getId(),
                showId,
                booking.getCustomer() == null ? null : booking.getCustomer().getId(),
                movieTitle,
                poster,
                theatreName,
                address,
                startsAt,
                booking.getCustomerName(),
                booking.getCustomerEmail(),
                booking.getCustomerPhone(),
                booking.getSeatLabels(),
                booking.getTotalAmount(),
                booking.getStatus(),
                booking.getBookedAt()
        );
    }
}