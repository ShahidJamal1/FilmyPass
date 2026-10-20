# 🎬 FilmyPass — Movie Ticket Booking Platform

**FilmyPass** is a modern, full-stack movie ticketing and cinema discovery web application inspired by BookMyShow. Built with a **React.js** frontend and a **Spring Boot** Java backend powered by **MySQL**, it provides end-to-end cinema ticket booking with real-time seat availability, live GPS cinema sorting, dynamic calendar scheduling, and official YouTube trailer playback.

---

## 🌟 Key Highlights & Features

### 1. 🎯 Complete Movie Showcase & Accuracy
- **Catalog of 41+ Movies**: Features top Indian cinema blockbusters (*Garividi Lakshmi*, *Prahaar*, *Jailer 2*, *Ranabaali*, *Nayyi Navelli*, *Crazy Kalyanam*, *Street Fighter*, *Singham Again*, *Venom: The Last Dance*, *Jigra*, *Kantara Chapter 1*, *Lucky Baskhar*, *Kalki 2898 AD*, *3 Idiots*, *RRR*, and more).
- **100% Authentic Posters**: High-resolution local image assets (`/posters/*.jpg`) backed by TMDB fallbacks. No broken images or placeholder graphics.
- **Accurate Metadata**: Director, full star cast with character names, runtime, certificate (U, UA, UA13+, UA16+, A), languages, and genres.

### 2. 📅 Dynamic 4-Day Booking Window & Interactive Calendar
- **Strict 4-Day Booking Window**: Dynamically calculates booking availability from the system clock (`Today`, `Tomorrow`, `Day+2`, `Day+3`). Never hardcodes dates or months.
- **Interactive Calendar Modal**: Click the **Calendar** button to open a responsive calendar view with month navigation. Bookable days are clearly highlighted, while out-of-range dates are safely locked.
- **No Ghost Bookings**: Upcoming unreleased movies display *"Booking not available yet"*, while now-playing movies offer real showtimes and seat booking.

### 3. 🔍 Universal Catalog Search
- **Full Database & Site Search**: The navbar search bar queries all 41+ movies across the backend database and curated catalog simultaneously.
- **Multi-Field Filtering**: Search by **Title**, **Genre**, **Language**, **Actor/Cast**, or **Director**.
- **Instant Preview**: Live dropdown shows movie poster thumbnails, release status badges (*Now Showing* vs *Coming Soon*), ratings, and direct navigation buttons (*Book* / *View*).
- **Keyboard Navigation**: Press <kbd>Enter</kbd> to view all matching results in the dedicated filtered Movies grid (`/movies?search=...`).

### 4. 🍿 Official YouTube Trailer Playback
- **Guaranteed Trailer Embeds**: Every single movie in the catalog has an authentic YouTube trailer embed.
- **Embedded Player Modal**: Clean, responsive iframe player with `autoplay=1&enablejsapi=1`.
- **One-Click Playback**: Quick *"Watch Trailer"* button on upcoming movie cards automatically opens the trailer modal.
- **Direct Link**: Includes a direct *"Watch on YouTube ↗"* link for mobile/app viewing.

### 5. 💺 Cinema Discovery & Interactive Seat Booking
- **City-Wise Theatres**: Seamlessly browse top multiplexes across major cities:
  - **Mumbai**: PVR Icon (Phoenix Palladium), INOX (Inorbit Mall)
  - **Hyderabad**: Prasads Multiplex, AMB Cinemas (Gachibowli), PVR Forum Sujana Mall
  - **Delhi, Bengaluru, Pune, Chennai, Kolkata**
- **GPS Location Detection**: Sorts cinema halls by real distance from user coordinates.
- **⚡ Showtime & Price Comparison Modal**: Side-by-side comparison of ticket prices across morning, afternoon, evening, and night shows.
- **Interactive Seat Layout**: Visual seat grid with categorized tiers (**Platinum**, **Gold**, **Silver**) and real-time reservation locking.
- **Digital E-Ticket**: Instant booking confirmation with QR code, ticket details, and booking history in *My Bookings*.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 18](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) (Custom Navy, White, and Rose/Red design system)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

### Backend
- **Framework**: [Spring Boot 3.x](https://spring.io/projects/spring-boot) (Java 17+)
- **ORM / Persistence**: Spring Data JPA & Hibernate
- **Database Connection Pooling**: HikariCP
- **Architecture**: Layered architecture (`Controller` → `Service` → `Repository` → `Entity` / `DTO`)

### Database
- **Engine**: MySQL 8.0+
- **Database Name**: `bookmyshow`
- **Auto DDL**: `spring.jpa.hibernate.ddl-auto=update`

---

## 📁 Project Structure

```
FilmyPass/
├── FilmyPass Frontend/              # React + Vite Frontend
│   ├── public/
│   │   └── posters/                 # High-resolution local movie posters (.jpg)
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js             # Base Axios instance (http://localhost:8080/api/v1)
│   │   │   ├── movieApi.js          # Movie endpoints & unified catalog merging
│   │   │   ├── showApi.js           # Showtime & seat availability service
│   │   │   ├── theatreApi.js        # Cinema & theatre discovery service
│   │   │   ├── bookingApi.js        # Checkout, seat reservation & payment APIs
│   │   │   ├── tmdbApi.js           # Curated TMDB metadata, posters & trailer resolvers
│   │   │   └── mockData.js          # Offline mock datasets & fallback records
│   │   ├── components/
│   │   │   ├── common/              # Navbar, Footer, SearchBar, Modal, Loader
│   │   │   ├── movies/              # MovieCard, MovieBanner, FilterSidebar
│   │   │   ├── shows/               # DateSelector (with Calendar modal), TheatreCard
│   │   │   └── booking/             # SeatGrid, TicketCard, PriceBreakup
│   │   ├── context/
│   │   │   ├── CityContext.jsx      # City selection & geolocation state
│   │   │   ├── BookingContext.jsx   # Active booking session & seat selection state
│   │   │   └── AuthContext.jsx      # Customer authentication state
│   │   ├── pages/
│   │   │   ├── HomePage.jsx         # Hero banner, now showing & upcoming carousel
│   │   │   ├── MoviesPage.jsx       # 2-column BookMyShow movie grid with filters & search
│   │   │   ├── MovieDetailsPage.jsx # Showcase banner, cast, details, trailer & showtimes
│   │   │   ├── ShowsPage.jsx        # Cinema showtimes schedule with date calendar
│   │   │   ├── SeatSelectionPage.jsx# Interactive cinema hall seat map
│   │   │   ├── CheckoutPage.jsx     # Order summary, convenience fee & payment
│   │   │   ├── BookingConfirmationPage.jsx # Digital ticket with QR code
│   │   │   └── MyBookingsPage.jsx   # Booking history & active tickets
│   │   ├── App.jsx                  # Route definitions
│   │   └── main.jsx                 # Application entry point
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── BookMyShowBE/                    # Spring Boot Java Backend
    ├── src/main/java/com/cfs/BookMyShowBE/
    │   ├── config/
    │   │   ├── CorsConfig.java      # CORS policy (allows http://localhost:3000)
    │   │   └── DataInitializer.java # Auto-seeds 41 movies, theatres & 4-day shows
    │   ├── controller/
    │   │   ├── MovieController.java # /api/v1/movies
    │   │   ├── TheatreController.java # /api/v1/theatres
    │   │   ├── ShowController.java  # /api/v1/shows
    │   │   └── BookingController.java # /api/v1/bookings
    │   ├── service/
    │   │   ├── CatalogService.java  # Business logic & on-demand seat generation
    │   │   └── BookingService.java  # Ticket calculation & reservation transactions
    │   ├── entity/                  # Movie, Theatre, Show, ShowSeat, Booking, Customer
    │   ├── repository/              # Spring Data JPA Repositories
    │   └── dto/                     # Request and Response Transfer Objects
    ├── src/main/resources/
    │   └── application.properties   # MySQL credentials & server configuration
    └── pom.xml
```

---

## 🚀 Getting Started & Installation

### Prerequisites
- **Node.js**: v18 or v20+
- **Java JDK**: 17 or higher
- **Maven**: (or use included `mvnw` wrapper)
- **MySQL**: 8.0+ running on `localhost:3306`

---

### Step 1: Database Setup
1. Start your local MySQL service.
2. The backend is configured to automatically create the database `bookmyshow` if it does not exist:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/bookmyshow?createDatabaseIfNotExist=true
   spring.datasource.username=root
   spring.datasource.password=Shahid@12
   ```
   *(Update username/password in `BookMyShowBE/src/main/resources/application.properties` to match your local MySQL credentials).*

---

### Step 2: Start Spring Boot Backend
Open a terminal in the `BookMyShowBE` directory:

```bash
cd "C:\Users\shahi\Desktop\BookMyShowBE"

# Clean and compile
mvnw.cmd clean compile

# Run the Spring Boot application
mvnw.cmd spring-boot:run
```

- **Backend Base URL**: `http://localhost:8080/api/v1`
- **Data Initialization**: On startup, `DataInitializer` automatically verifies and seeds all 41 movies, theatres, and generates active shows for the current 4-day window.

---

### Step 3: Start React Frontend
Open another terminal in the `FilmyPass Frontend` directory:

```bash
cd "C:\Users\shahi\Desktop\FilmyPass Frontend"

# Install dependencies
npm install

# Start Vite dev server on port 3000
npm run dev -- --port 3000
```

- **Frontend URL**: `http://localhost:3000`
- Open your browser and navigate to `http://localhost:3000`.

---

## 🔌 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/movies` | Get all active movies (sorted by newest release date) |
| `GET` | `/api/v1/movies/{id}` | Get movie details by ID |
| `GET` | `/api/v1/movies/tmdb/{tmdbId}` | Get movie by TMDB ID |
| `POST` | `/api/v1/movies/map` | Map/sync movie between frontend and backend |
| `GET` | `/api/v1/theatres?city={city}` | Get cinemas/theatres for a specific city |
| `GET` | `/api/v1/shows?city={city}&date={YYYY-MM-DD}&movieId={id}` | Get theatre showtime schedules for movie & date |
| `GET` | `/api/v1/shows/{showId}/seats` | Fetch interactive seat layout and availability for a show |
| `POST` | `/api/v1/bookings` | Book selected seats, calculate pricing and generate ticket |
| `GET` | `/api/v1/bookings/{id}` | Retrieve booking confirmation details |
| `GET` | `/api/v1/bookings/customer/{customerId}` | Retrieve customer booking history |

---

## 🎨 Color Palette & Design System

- **Backgrounds**: Light mode `bg-slate-50` / `bg-white`, Cinema Dark `bg-slate-950` / `bg-slate-900`
- **Primary Brand**: Crimson Rose `from-brand-600 to-rose-500` (`#e11d48`)
- **Accent**: Amber Gold (`#f59e0b`) for ratings and VIP tiers
- **Text**: Deep Slate `text-slate-900` / Muted `text-slate-500`

---

## 🧪 Testing & Verification

```bash
# Verify Frontend Production Build
cd "C:\Users\shahi\Desktop\FilmyPass Frontend"
npm run build

# Verify Backend Java Compilation & Tests
cd "C:\Users\shahi\Desktop\BookMyShowBE"
mvnw.cmd test-compile
```

---

## 📄 License

This project is developed as an educational showcase and portfolio application. Movie data, posters, and trailers are properties of their respective creators and production houses.
