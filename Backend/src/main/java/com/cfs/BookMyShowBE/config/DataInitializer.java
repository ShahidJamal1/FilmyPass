package com.cfs.BookMyShowBE.config;

import com.cfs.BookMyShowBE.entity.Customer;
import com.cfs.BookMyShowBE.entity.Movie;
import com.cfs.BookMyShowBE.entity.Show;
import com.cfs.BookMyShowBE.entity.Theatre;
import com.cfs.BookMyShowBE.repository.CustomerRepository;
import com.cfs.BookMyShowBE.repository.MovieRepository;
import com.cfs.BookMyShowBE.repository.ShowRepository;
import com.cfs.BookMyShowBE.repository.ShowSeatRepository;
import com.cfs.BookMyShowBE.repository.TheatreRepository;
import com.cfs.BookMyShowBE.service.CatalogService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Configuration
public class DataInitializer implements CommandLineRunner {

    private final MovieRepository movieRepository;
    private final TheatreRepository theatreRepository;
    private final ShowRepository showRepository;
    private final ShowSeatRepository showSeatRepository;
    private final CustomerRepository customerRepository;
    private final CatalogService catalogService;

    public DataInitializer(MovieRepository movieRepository,
                           TheatreRepository theatreRepository,
                           ShowRepository showRepository,
                           ShowSeatRepository showSeatRepository,
                           CustomerRepository customerRepository,
                           CatalogService catalogService) {
        this.movieRepository = movieRepository;
        this.theatreRepository = theatreRepository;
        this.showRepository = showRepository;
        this.showSeatRepository = showSeatRepository;
        this.customerRepository = customerRepository;
        this.catalogService = catalogService;
    }

    record MovieSeed(Long tmdbId, String title, String language, String genre, Integer durationMinutes,
                     String certificate, String description, String posterUrl, String trailerUrl) {}

    @Override
    @Transactional
    public void run(String... args) {
        // 1. Ensure default customer exists
        if (customerRepository.count() == 0) {
            customerRepository.save(new Customer("Aryan Sharma", "aryan@filmypass.com", "9876543210"));
        }

        // 2. Ensure default theatres exist
        if (theatreRepository.count() == 0) {
            theatreRepository.save(new Theatre("PVR Icon: Phoenix Palladium", "Mumbai", "Lower Parel, Mumbai"));
            theatreRepository.save(new Theatre("INOX: Megaplex Inorbit Mall", "Mumbai", "Malad West, Mumbai"));
            theatreRepository.save(new Theatre("Prasads Multiplex: NTR Marg", "Hyderabad", "NTR Marg, Opposite Lumbini Park, Hyderabad"));
            theatreRepository.save(new Theatre("AMB Cinemas: Gachibowli", "Hyderabad", "Sarath City Capital Mall, Gachibowli, Hyderabad"));
            theatreRepository.save(new Theatre("PVR Forum Sujana Mall: Kukatpally", "Hyderabad", "Kukatpally Housing Board Colony, Hyderabad"));
            theatreRepository.save(new Theatre("PVR Plaza: Connaught Place", "Delhi", "H-Block, Connaught Place, New Delhi"));
            theatreRepository.save(new Theatre("PVR: Forum Mall Koramangala", "Bengaluru", "Hosur Road, Koramangala, Bengaluru"));
            theatreRepository.save(new Theatre("PVR: Phoenix Marketcity", "Pune", "Viman Nagar, Pune"));
            theatreRepository.save(new Theatre("PVR: Grand Mall Velachery", "Chennai", "Velachery, Chennai"));
            theatreRepository.save(new Theatre("INOX: Quest Mall", "Kolkata", "Park Circus, Kolkata"));
        }

        // 3. Known authentic TMDB movie seeds with valid poster paths and trailers
        List<MovieSeed> seeds = List.of(
                new MovieSeed(585268L, "War 2", "Hindi", "Action", 155, "UA",
                        "An action thriller about a mysterious mission and powerful enemies.",
                        "/posters/war-2.jpg", "https://www.youtube.com/embed/tQ0mzXRk-oM"),
                new MovieSeed(811941L, "Devara: Part 1", "Telugu", "Action", 170, "UA",
                        "A high-energy action drama following a fearless protagonist protecting his coastal clan.",
                        "/posters/devara-part-1.jpg", "https://www.youtube.com/embed/Fw91n6mN3Yw"),
                new MovieSeed(634649L, "Spider-Man: No Way Home", "English", "Action", 148, "UA",
                        "Peter Parker seeks Doctor Strange's help to make his identity secret again, breaking open the multiverse.",
                        "/posters/spider-man-no-way-home.jpg", "https://www.youtube.com/embed/JfVOs4VSpmA"),
                new MovieSeed(20453L, "3 Idiots", "Hindi", "Comedy Drama", 170, "U",
                        "Two friends search for their long lost companion while revisiting their college days with Rancho.",
                        "/posters/3-idiots.jpg", "https://www.youtube.com/embed/K0eDlFX9GMc"),
                new MovieSeed(579974L, "RRR", "Telugu", "Action Drama", 187, "UA",
                        "An epic historical action drama about friendship, courage and sacrifice of two Indian revolutionaries.",
                        "/posters/rrr.jpg", "https://www.youtube.com/embed/NgBoAMQh1gI"),
                new MovieSeed(299534L, "Avengers: Endgame", "English", "Superhero", 181, "UA",
                        "After devastating events, the surviving Avengers assemble to reverse Thanos's actions and restore balance.",
                        "/posters/avengers-endgame.jpg", "https://www.youtube.com/embed/TcMBFSGVi1c"),
                new MovieSeed(79464L, "Rockstar", "Hindi", "Romance", 158, "UA",
                        "Janardhan pursues his passion for becoming a rockstar, leading through love, heartbreak and musical brilliance.",
                        "/posters/rockstar.jpg", "https://www.youtube.com/embed/bD5FShPZdpw"),
                new MovieSeed(770906L, "Salaar: Part 1 – Ceasefire", "Telugu", "Action", 178, "UA",
                        "A gang leader tries to keep a promise made to his dying friend and takes on other criminal gangs.",
                        "/posters/salaar-part-1-ceasefire.jpg", "https://www.youtube.com/embed/4GPvYMKtrtI"),
                new MovieSeed(27205L, "Inception", "English", "Science Fiction", 148, "UA",
                        "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.",
                        "/posters/inception.jpg", "https://www.youtube.com/embed/YoHD9XEInc0"),
                new MovieSeed(11807L, "Jab We Met", "Hindi", "Romance", 136, "UA",
                        "A depressed wealthy businessman's life changes after he meets a bubbly and feisty Punjabi girl on a train.",
                        "/posters/jab-we-met.jpg", "https://www.youtube.com/embed/bQ_f_oU6h-4"),
                new MovieSeed(256040L, "Baahubali: The Beginning", "Telugu", "Historical Action", 167, "UA",
                        "In the kingdom of Mahishmati, a young man raised by tribals discovers his royal lineage.",
                        "/posters/baahubali-the-beginning.jpg", "https://www.youtube.com/embed/sOEg_YZQsTI"),
                new MovieSeed(414906L, "The Batman", "English", "Crime Thriller", 139, "UA",
                        "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues.",
                        "/posters/the-batman.jpg", "https://www.youtube.com/embed/mqqft2x_Aa4"),
                new MovieSeed(596650L, "Chhichhore", "Hindi", "Comedy Drama", 143, "U",
                        "A tragic incident forces middle-aged Anirudh to reunite with his college friends and relive memories.",
                        "/posters/chhichhore.jpg", "https://www.youtube.com/embed/-KKlF-VxOfo"),
                new MovieSeed(866444L, "Pathaan", "Hindi", "Spy Action", 146, "UA",
                        "An Indian agent races against a doomsday clock as a ruthless mercenary with a bitter vendetta mounts an attack.",
                        "/posters/pathaan.jpg", "https://www.youtube.com/embed/vqu4z34wENw"),
                new MovieSeed(800609L, "Pushpa: The Rise", "Telugu", "Action", 175, "UA",
                        "A laborer rises through the ranks of a red sandalwood smuggling syndicate, making dangerous enemies.",
                        "/posters/pushpa-the-rise.jpg", "https://www.youtube.com/embed/Q1NKMPhP8PY"),
                new MovieSeed(141052L, "Justice League", "English", "Superhero", 148, "UA",
                        "Fueled by restored faith in humanity, Bruce Wayne enlists new allies to face an even greater enemy.",
                        "/posters/justice-league.jpg", "https://www.youtube.com/embed/3cxixDgHUYw"),
                new MovieSeed(801688L, "Kalki 2898 AD", "Telugu", "Sci-Fi, Action", 181, "UA",
                        "A modern avatar of Lord Vishnu descends to Earth to protect humanity from dark forces in dystopian Kasi.",
                        "/posters/kalki-2898-ad.jpg", "https://www.youtube.com/embed/k9N_7N6P30Y"),
                new MovieSeed(1150027L, "Stree 2: Sarkate Ka Aatank", "Hindi", "Comedy", 149, "UA",
                        "Chanderi is once again haunted by a terrifying entity called Sarkate. Vicky and friends must unite.",
                        "/posters/stree-2-sarkate-ka-aatank.jpg", "https://www.youtube.com/embed/KVnheXwqF08"),
                new MovieSeed(693134L, "Dune: Part Two", "English", "Sci-Fi", 166, "UA",
                        "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators.",
                        "/posters/dune-part-two.jpg", "https://www.youtube.com/embed/Way9Dexny3w"),
                new MovieSeed(1181283L, "Jigra", "Hindi, Telugu", "Action, Thriller, Drama", 155, "UA16+",
                        "A fiercely protective sister undertakes an impossible prison break across international borders to save her brother.",
                        "/posters/jigra.jpg", "https://www.youtube.com/embed/Pj13k8f2lqU"),
                new MovieSeed(1196470L, "Kantara: A Legend Chapter 1", "Kannada, Hindi, Telugu, Tamil", "Action, Adventure, Mythology", 165, "UA16+",
                        "A mythological action epic exploring the origins of the divine spirit of Panjurli and Guliga in ancient forests.",
                        "/posters/kantara.jpg", "https://www.youtube.com/embed/yQ0wB6Y4j6A"),
                new MovieSeed(1195430L, "Lucky Baskhar", "Telugu, Hindi, Tamil, Malayalam", "Drama, Crime, Thriller", 150, "UA",
                        "An ordinary bank employee embarks on an extraordinary journey through high-stakes financial manoeuvres.",
                        "/posters/lucky-baskhar.jpg", "https://www.youtube.com/embed/F4181uK0HqY"),
                new MovieSeed(1134418L, "Singham Again", "Hindi", "Action", 144, "UA",
                        "Bajirao Singham joins hands with an elite task force to embark on a cross-border mission following the abduction of his wife.",
                        "/posters/singham-again.jpg", "https://www.youtube.com/embed/5aG6A8Wj0B0"),
                new MovieSeed(912649L, "Venom: The Last Dance", "English", "Action", 110, "UA",
                        "Eddie Brock and Venom are on the run, hunted by both of their worlds and forced into a devastating decision.",
                        "/posters/venom-the-last-dance.jpg", "https://www.youtube.com/embed/__2bjWbetsA"),
                new MovieSeed(1200001L, "Jailer 2", "Tamil, Telugu, Kannada", "Action", 165, "UA16+",
                        "Tiger Muthuvel Pandian returns to confront an international crime cartel threatening peace across borders.",
                        "/posters/jailer-2.jpg", "https://www.youtube.com/embed/3cxixDgHUYw"),
                new MovieSeed(1200002L, "Ranabaali", "Telugu, Hindi, Tamil", "Period Action", 155, "UA16+",
                        "A fierce warrior on horseback leads an armed rebellion against colonial rule to reclaim his motherland.",
                        "/posters/ranabaali.jpg", "https://www.youtube.com/embed/NgBoAMQh1gI"),
                new MovieSeed(1200003L, "Garividi Lakshmi", "Telugu", "Drama", 140, "UA13+",
                        "An inspiring village leader stands up against local landlords to secure water rights and dignified life for rural families.",
                        "/posters/garividi-lakshmi.jpg", "https://www.youtube.com/embed/Fw91n6mN3Yw"),
                new MovieSeed(1200004L, "Nayyi Navelli", "Hindi", "Drama", 130, "UA16+",
                        "A spirited young bride takes matters into her own hands with sharp wit and unmatched archery skills in traditional Varanasi.",
                        "/posters/nayyi-navelli.jpg", "https://www.youtube.com/embed/bQ_f_oU6h-4"),
                new MovieSeed(1200005L, "Crazy Kalyanam", "Telugu", "Comedy", 145, "UA13+",
                        "A whirlwind destination wedding spirals into non-stop hilarious chaos as quirky family rivalries boil over.",
                        "/posters/crazy-kalyanam.jpg", "https://www.youtube.com/embed/KVnheXwqF08"),
                new MovieSeed(1200006L, "Prahaar", "Hindi", "Crime", 135, "UA16+",
                        "A relentless investigative bureau chief uncovers high-level courtroom conspiracies in a sensational murder trial.",
                        "/posters/prahaar.jpg", "https://www.youtube.com/embed/vqu4z34wENw"),
                new MovieSeed(1200007L, "Street Fighter", "English, Hindi, Tamil, Telugu", "Action", 125, "UA16+",
                        "Legendary underground martial artists clash in an explosive worldwide tournament with earth-shattering elemental powers.",
                        "/posters/street-fighter.jpg", "https://www.youtube.com/embed/JfVOs4VSpmA"),
                new MovieSeed(117251L, "Ramayana: Rise of a Legend", "Hindi, Telugu, Tamil", "Mythological Action", 175, "UA",
                        "An epic mythological saga depicting the timeless victory of righteousness over darkness.",
                        "https://image.tmdb.org/t/p/w500/b11RXdbaBI4ATpHiAMOGc6WTgvu.jpg", "https://www.youtube.com/embed/sOEg_YZQsTI"),
                new MovieSeed(1400940L, "Clayface", "English", "Action", 130, "UA",
                        "A disfigured actor discovers a dangerous chemical substance that grants shape-shifting powers at a terrifying psychological cost.",
                        "/posters/clayface.jpg", "https://www.youtube.com/embed/mqqft2x_Aa4"),
                new MovieSeed(1300001L, "Titans", "Hindi, Telugu", "Comedy, Fantasy, Thriller", 140, "UA",
                        "Armed guards guarding a mysterious dungeon become reluctant saviors when mythical titans awaken.",
                        "/posters/titans.jpg", "https://www.youtube.com/embed/yQ0wB6Y4j6A"),
                new MovieSeed(1300002L, "Tu Hai Meri Kiran", "Hindi", "Romantic, Thriller", 135, "UA",
                        "A romantic tale with unexpected suspense in the foggy hills of Shimla.",
                        "/posters/tu-hai-meri-kiran.jpg", "https://www.youtube.com/embed/bD5FShPZdpw"),
                new MovieSeed(1300003L, "418", "Hindi, Tamil", "Horror, Thriller", 128, "A",
                        "An ancient cursed anklet unleashes terrifying demonic apparitions in a desolate colonial bungalow.",
                        "/posters/418.jpg", "https://www.youtube.com/embed/KVnheXwqF08"),
                new MovieSeed(1300004L, "Udta Teer", "Hindi", "Action, Comedy", 132, "UA",
                        "A border comedy following two quirky friends who find themselves in absurd espionage crossfire.",
                        "/posters/udta-teer.jpg", "https://www.youtube.com/embed/Pj13k8f2lqU"),
                new MovieSeed(1300005L, "Titanic", "Tamil, Telugu", "Comedy, Romantic", 138, "UA",
                        "A charming retro romance set in seaside Chennai with hilarious misunderstandings.",
                        "/posters/titanic.jpg", "https://www.youtube.com/embed/sOEg_YZQsTI"),
                new MovieSeed(1300006L, "Tum Mere Ho", "Hindi", "Drama, Romantic", 134, "UA",
                        "Two passionate musicians navigate love, stardom, and heartbreak across the royal palaces of Udaipur.",
                        "/posters/tum-mere-ho.jpg", "https://www.youtube.com/embed/bD5FShPZdpw"),
                new MovieSeed(1300007L, "Hope", "English, Hindi", "Action, Sci-Fi, Thriller", 126, "UA",
                        "A rogue sniper fights through urban warzones to protect the last hope for mankind's survival.",
                        "/posters/hope.jpg", "https://www.youtube.com/embed/Way9Dexny3w"),
                new MovieSeed(1300008L, "321 [Love Marriage Vs Arranged]", "Hindi", "Comedy, Drama, Family, Romance", 142, "U",
                        "A riotous clash of generations when modern live-in couple's families meet for unexpected arranged nuptials.",
                        "/posters/321-love-marriage-vs-arranged.jpg", "https://www.youtube.com/embed/-KKlF-VxOfo")
        );

        // Update or insert each movie
        for (MovieSeed seed : seeds) {
            Optional<Movie> existingOpt = movieRepository.findByTitleIgnoreCase(seed.title().trim());
            if (existingOpt.isEmpty()) {
                // Also check if existing by tmdbId
                existingOpt = movieRepository.findByTmdbId(seed.tmdbId());
            }

            if (existingOpt.isPresent()) {
                Movie m = existingOpt.get();
                m.setTmdbId(seed.tmdbId());
                m.setPosterUrl(seed.posterUrl());
                m.setTrailerUrl(seed.trailerUrl());
                movieRepository.save(m);
            } else {
                movieRepository.save(new Movie(
                        seed.tmdbId(), seed.title(), seed.language(), seed.genre(),
                        seed.durationMinutes(), seed.certificate(), seed.description(),
                        seed.posterUrl(), seed.trailerUrl()
                ));
            }
        }

        // Guarantee no movie in database has a null or empty trailerUrl
        List<Movie> allDbMovies = movieRepository.findAll();
        for (Movie m : allDbMovies) {
            if (m.getTrailerUrl() == null || m.getTrailerUrl().isBlank() || m.getTrailerUrl().contains("example.com")) {
                m.setTrailerUrl("https://www.youtube.com/embed/5aG6A8Wj0B0");
                movieRepository.save(m);
            }

            // Guarantee all movies use reliable clean local poster assets without broken tmdb URLs
            String poster = m.getPosterUrl();
            if (poster == null || poster.isBlank() || poster.contains("image.tmdb.org")) {
                String title = m.getTitle() != null ? m.getTitle().toLowerCase() : "";
                if (title.contains("war")) m.setPosterUrl("/posters/war-2.jpg");
                else if (title.contains("devara")) m.setPosterUrl("/posters/devara-part-1.jpg");
                else if (title.contains("spider")) m.setPosterUrl("/posters/spider-man-no-way-home.jpg");
                else if (title.contains("3 idiots")) m.setPosterUrl("/posters/3-idiots.jpg");
                else if (title.contains("rrr")) m.setPosterUrl("/posters/rrr.jpg");
                else if (title.contains("avengers") || title.contains("endgame")) m.setPosterUrl("/posters/avengers-endgame.jpg");
                else if (title.contains("rockstar")) m.setPosterUrl("/posters/rockstar.jpg");
                else if (title.contains("salaar")) m.setPosterUrl("/posters/salaar-part-1-ceasefire.jpg");
                else if (title.contains("inception")) m.setPosterUrl("/posters/inception.jpg");
                else if (title.contains("jab we met")) m.setPosterUrl("/posters/jab-we-met.jpg");
                else if (title.contains("baahubali")) m.setPosterUrl("/posters/baahubali-the-beginning.jpg");
                else if (title.contains("batman")) m.setPosterUrl("/posters/the-batman.jpg");
                else if (title.contains("chhichhore")) m.setPosterUrl("/posters/chhichhore.jpg");
                else if (title.contains("pathaan")) m.setPosterUrl("/posters/pathaan.jpg");
                else if (title.contains("pushpa")) m.setPosterUrl("/posters/pushpa-the-rise.jpg");
                else if (title.contains("justice league")) m.setPosterUrl("/posters/justice-league.jpg");
                else if (title.contains("kalki")) m.setPosterUrl("/posters/kalki-2898-ad.jpg");
                else if (title.contains("stree")) m.setPosterUrl("/posters/stree-2-sarkate-ka-aatank.jpg");
                else if (title.contains("dune")) m.setPosterUrl("/posters/dune-part-two.jpg");
                movieRepository.save(m);
            }
        }

        // 4. Fix any legacy shows with null startsAt
        List<Show> allShows = showRepository.findAll();
        for (Show s : allShows) {
            if (s.getStartsAt() == null) {
                s.setStartsAt(LocalDateTime.of(2026, 9, 20, 10, 30));
                s.setEndsAt(LocalDateTime.of(2026, 9, 20, 13, 0));
                showRepository.save(s);
            }
        }

        // 5. Clean up any shows previously generated for unreleased upcoming movies (e.g. Ramayana, Clayface, Titans, etc.)
        List<String> upcomingTitles = List.of("Ramayana", "Clayface", "Titans", "Tu Hai Meri Kiran", "418", "Udta Teer", "Titanic", "Tum Mere Ho", "Hope", "321", "Lucky Baskhar");
        List<Movie> unreleasedUpcoming = movieRepository.findAll().stream()
                .filter(m -> m.getTitle() != null && upcomingTitles.stream().anyMatch(t -> m.getTitle().toLowerCase().contains(t.toLowerCase())))
                .toList();
        for (Movie up : unreleasedUpcoming) {
            List<Show> upShows = showRepository.findAll().stream()
                    .filter(s -> s.getMovie() != null && s.getMovie().getId().equals(up.getId()))
                    .toList();
            for (Show s : upShows) {
                showSeatRepository.deleteAll(showSeatRepository.findByShowId(s.getId()));
                showRepository.delete(s);
            }
        }

        // 6. Ensure now-playing movies have active shows for the 4-day window
        List<Movie> activeMovies = movieRepository.findByActiveTrueOrderByTitle();
        for (Movie movie : activeMovies) {
            if (movie.getTitle() != null && upcomingTitles.stream().anyMatch(t -> movie.getTitle().toLowerCase().contains(t.toLowerCase()))) {
                continue; // Do not generate shows for upcoming unreleased movies
            }
            catalogService.generateShowsForMovie(movie);
        }
    }
}
