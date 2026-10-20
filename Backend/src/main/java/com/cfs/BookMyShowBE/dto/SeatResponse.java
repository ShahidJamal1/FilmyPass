package com.cfs.BookMyShowBE.dto;

import com.cfs.BookMyShowBE.entity.ShowSeat;

public record SeatResponse(Long id, String seatLabel, boolean reserved) {
    public static SeatResponse from(ShowSeat seat) {
        return new SeatResponse(seat.getId(), seat.getSeatLabel(), seat.isReserved());
    }
}
