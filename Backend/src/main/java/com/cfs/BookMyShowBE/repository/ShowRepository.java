package com.cfs.BookMyShowBE.repository;

import com.cfs.BookMyShowBE.entity.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ShowRepository extends JpaRepository<Show, Long> {

    boolean existsByMovieIdAndTheatreIdAndStartsAt(Long movieId, Long theatreId, LocalDateTime startsAt);

    boolean existsByMovieIdAndStartsAtGreaterThanEqual(Long movieId, LocalDateTime startsAt);

    @Query("select s from Show s join fetch s.movie m join fetch s.theatre t "+
            "where s.active = true and m.active = true and lower(t.city) = lower(:city) "+
            "and (:movieId is null or m.id = :movieId or m.tmdbId = :movieId) "+
            "and s.startsAt >= :from and s.startsAt < :to order by s.startsAt")
    List<Show> findActiveShows(@Param("city") String city,
                               @Param("from") LocalDateTime from,
                               @Param("to") LocalDateTime to,
                               @Param("movieId") Long movieId);
}