package com.cfs.BookMyShowBE.service;

import com.cfs.BookMyShowBE.dto.MapMovieRequest;
import com.cfs.BookMyShowBE.dto.MovieResponse;
import com.cfs.BookMyShowBE.dto.SeatResponse;
import com.cfs.BookMyShowBE.dto.ShowResponse;
import com.cfs.BookMyShowBE.dto.TheatreResponse;
import com.cfs.BookMyShowBE.entity.Movie;
import com.cfs.BookMyShowBE.entity.Show;
import com.cfs.BookMyShowBE.entity.ShowSeat;
import com.cfs.BookMyShowBE.entity.Theatre;
import com.cfs.BookMyShowBE.repository.MovieRepository;
import com.cfs.BookMyShowBE.repository.ShowRepository;
import com.cfs.BookMyShowBE.repository.ShowSeatRepository;
import com.cfs.BookMyShowBE.repository.TheatreRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CatalogService {

    private final MovieRepository movieRepository;
    private final TheatreRepository theatreRepository;
    private final ShowRepository showRepository;
    private final ShowSeatRepository showSeatRepository;

    public CatalogService(MovieRepository movieRepository,
                          TheatreRepository theatreRepository,
                          ShowRepository showRepository,
                          ShowSeatRepository showSeatRepository) {
        this.movieRepository = movieRepository;
        this.theatreRepository = theatreRepository;
        this.showRepository = showRepository;
        this.showSeatRepository = showSeatRepository;
    }

    public List<MovieResponse> movies() {
        return movieRepository.findByActiveTrueOrderByTitle().stream().map(MovieResponse::from).toList();
    }

    public MovieResponse movie(Long id) {
        return movieRepository.findById(id)
                .map(MovieResponse::from)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with ID: " + id));
    }

    public MovieResponse movieByTmdbId(Long tmdbId) {
        return movieRepository.findByTmdbId(tmdbId)
                .map(MovieResponse::from)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with TMDB ID: " + tmdbId));
    }

    @Transactional
    public MovieResponse mapOrSyncMovie(MapMovieRequest req) {
        if (req.tmdbId() != null) {
            Optional<Movie> byTmdb = movieRepository.findByTmdbId(req.tmdbId());
            if (byTmdb.isPresent()) {
                return MovieResponse.from(byTmdb.get());
            }
        }

        if (req.title() != null && !req.title().isBlank()) {
            Optional<Movie> byTitle = movieRepository.findByTitleIgnoreCase(req.title().trim());
            if (byTitle.isPresent()) {
                Movie existing = byTitle.get();
                if (existing.getTmdbId() == null && req.tmdbId() != null) {
                    existing.setTmdbId(req.tmdbId());
                    movieRepository.save(existing);
                }
                return MovieResponse.from(existing);
            }
        }

        // Create new Movie in DB
        String lang = (req.language() != null && !req.language().isBlank()) ? req.language() : "Hindi";
        String genre = (req.genre() != null && !req.genre().isBlank()) ? req.genre() : "Action";
        int duration = req.durationMinutes() != null && req.durationMinutes() > 0 ? req.durationMinutes() : 150;
        String cert = req.certificate() != null ? req.certificate() : "UA";

        Movie newMovie = new Movie(
                req.tmdbId(),
                req.title() != null ? req.title().trim() : "Untitled Movie",
                lang,
                genre,
                duration,
                cert,
                req.description(),
                req.posterUrl(),
                req.trailerUrl()
        );

        newMovie = movieRepository.save(newMovie);
        generateShowsForMovie(newMovie);

        return MovieResponse.from(newMovie);
    }

    @Transactional
    public void generateShowsForMovie(Movie movie) {
        List<Theatre> theatres = theatreRepository.findAll();
        if (theatres.isEmpty()) return;

        // Generate shows for all registered theatres in all cities
        List<Theatre> selectedTheatres = theatres;

        LocalDate today = LocalDate.now();
        LocalTime[] showTimes = new LocalTime[]{
                LocalTime.of(10, 30),
                LocalTime.of(14, 15),
                LocalTime.of(18, 0),
                LocalTime.of(21, 15)
        };
        BigDecimal[] prices = new BigDecimal[]{
                BigDecimal.valueOf(250),
                BigDecimal.valueOf(320),
                BigDecimal.valueOf(280),
                BigDecimal.valueOf(350)
        };

        for (Theatre theatre : selectedTheatres) {
            for (int dayOffset = 0; dayOffset < 4; dayOffset++) {
                LocalDate showDate = today.plusDays(dayOffset);
                for (int slot = 0; slot < 2; slot++) {
                    int showIdx = (dayOffset * 2 + slot + (movie.getId() != null ? movie.getId().intValue() : 0)) % showTimes.length;
                    LocalDateTime startsAt = LocalDateTime.of(showDate, showTimes[showIdx]);
                    if (showRepository.existsByMovieIdAndTheatreIdAndStartsAt(movie.getId(), theatre.getId(), startsAt)) {
                        continue;
                    }
                    LocalDateTime endsAt = startsAt.plusMinutes(movie.getDurationMinutes() != null ? movie.getDurationMinutes() : 150);
                    showRepository.save(new Show(movie, theatre, startsAt, endsAt, prices[showIdx], 96));
                }
            }
        }
    }

    public List<TheatreResponse> theatres(String city) {
        if (city == null || city.isBlank()) {
            return theatreRepository.findAll().stream().map(TheatreResponse::from).toList();
        }
        return theatreRepository.findByCityIgnoreCaseOrderByName(city).stream().map(TheatreResponse::from).toList();
    }

    public TheatreResponse theatre(Long id) {
        return theatreRepository.findById(id)
                .map(TheatreResponse::from)
                .orElseThrow(() -> new ResourceNotFoundException("Theatre not found with ID: " + id));
    }

    public List<ShowResponse> shows(String city, LocalDate date, Long movieId) {
        if (date == null) {
            date = LocalDate.now();
        }
        LocalDate today = LocalDate.now();
        // Strictly allow booking only for the next 4 days: Today, Today+1, Today+2, Today+3
        if (date.isBefore(today) || date.isAfter(today.plusDays(3))) {
            return List.of();
        }
        LocalDateTime from = date.atStartOfDay();
        return showRepository.findActiveShows(city, from, from.plusDays(1), movieId).stream()
                .map(show -> ShowResponse.from(show, showSeatRepository.findAvailableLabels(show.getId()))).toList();
    }

    public ShowResponse show(Long id) {
        Show show = showRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Show not found with ID: " + id));
        return ShowResponse.from(show, showSeatRepository.findAvailableLabels(id));
    }

    @Transactional
    public List<SeatResponse> showSeats(Long showId) {
        Show show = showRepository.findById(showId)
                .orElseThrow(() -> new ResourceNotFoundException("Show not found with ID: " + showId));
        List<ShowSeat> seats = showSeatRepository.findByShowId(showId);
        if (seats.isEmpty()) {
            List<ShowSeat> newSeats = new ArrayList<>();
            for (char r = 'A'; r <= 'H'; r++) {
                for (int n = 1; n <= 12; n++) {
                    newSeats.add(new ShowSeat(show, "" + r + n));
                }
            }
            seats = showSeatRepository.saveAll(newSeats);
        }
        return seats.stream().map(SeatResponse::from).toList();
    }
}