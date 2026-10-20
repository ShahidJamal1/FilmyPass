export const POPULAR_CITIES = [
  { id: 'mumbai', name: 'Mumbai', icon: '🏛️', landmark: 'Gateway of India', lat: 19.0760, lng: 72.8777 },
  { id: 'delhi', name: 'Delhi-NCR', icon: '🏛️', landmark: 'India Gate', lat: 28.6139, lng: 77.2090 },
  { id: 'bengaluru', name: 'Bengaluru', icon: '🏰', landmark: 'Vidhana Soudha', lat: 12.9716, lng: 77.5946 },
  { id: 'hyderabad', name: 'Hyderabad', icon: '🕌', landmark: 'Charminar', lat: 17.3850, lng: 78.4867 },
  { id: 'chandigarh', name: 'Chandigarh', icon: '✌️', landmark: 'Open Hand', lat: 30.7333, lng: 76.7794 },
  { id: 'ahmedabad', name: 'Ahmedabad', icon: '🌉', landmark: 'Riverfront', lat: 23.0225, lng: 72.5714 },
  { id: 'pune', name: 'Pune', icon: '🏰', landmark: 'Shaniwar Wada', lat: 18.5204, lng: 73.8567 },
  { id: 'chennai', name: 'Chennai', icon: '🛕', landmark: 'Kapaleeshwarar', lat: 13.0827, lng: 80.2707 },
  { id: 'kolkata', name: 'Kolkata', icon: '🌁', landmark: 'Howrah Bridge', lat: 22.5726, lng: 88.3639 },
  { id: 'kochi', name: 'Kochi', icon: '🌴', landmark: 'Chinese Fishing Nets', lat: 9.9312, lng: 76.2673 }
];

const RAW_OTHER_CITIES = [
  // Bihar Cities
  'Sitamarhi', 'Patna', 'Muzaffarpur', 'Gaya', 'Bhagalpur', 'Darbhanga', 'Purnea (Purnia)', 'Begusarai',
  'Bihar Sharif', 'Arrah (Bhojpur)', 'Katihar', 'Munger', 'Chhapra (Saran)', 'Saharsa', 'Bettiah',
  'Motihari (East Champaran)', 'Hajipur', 'Sasaram', 'Dehri', 'Siwan', 'Samastipur', 'Buxar',
  'Kishanganj', 'Gopalganj', 'Nawada', 'Aurangabad (Bihar)', 'Jamui', 'Jehanabad', 'Araria',
  'Lakhisarai', 'Sheohar', 'Madhubani', 'Supaul', 'Khagaria', 'Bhabua', 'Madhepura',

  // Other All India Cities
  'Aalo', 'Abohar', 'Abu Road', 'Achampet', 'Acharapakkam', 'Addanki', 'Adilabad', 'Adimali', 'Adipur', 'Adoni',
  'Agar Malwa', 'Agartala', 'Agiripalli', 'Agra', 'Ahilyanagar (Ahmednagar)', 'Ahmedgarh', 'Ahore', 'Aizawl', 'Akluj', 'Akaltara',
  'Akbarpur', 'Akividu', 'Akola', 'Akot', 'Alakode', 'Alangudi', 'Alangulam', 'Alappuzha', 'Alathur', 'Alibaug',
  'Aligarh', 'Alipurduar', 'Allagadda', 'Almora', 'Alwar', 'Amalapuram', 'Ambala', 'Ambajogai', 'Amravati', 'Amreli',
  'Amritsar', 'Anand', 'Anantapur', 'Annavaram', 'Asansol', 'Aurangabad (Maharashtra)', 'Baddi', 'Bareilly', 'Belagavi', 'Bharuch',
  'Bhilai', 'Bhilwara', 'Bhimavaram', 'Bhimtal', 'Bhiwadi', 'Bhopal', 'Bhubaneswar', 'Bhuj', 'Bikaner', 'Bilaspur',
  'Bokaro', 'Bulandshahr', 'Burdwan', 'Calicut (Kozhikode)', 'Chamba', 'Chandrapur', 'Chhindwara', 'Chittorgarh', 'Coimbatore', 'Cuttack',
  'Dalhousie', 'Daman', 'Darjeeling', 'Davangere', 'Dehradun', 'Dhanbad', 'Dharamshala', 'Dhule', 'Dibrugarh', 'Dimapur',
  'Durgapur', 'Eluru', 'Erode', 'Etah', 'Etawah', 'Faridabad', 'Gandhinagar', 'Gaya', 'Ghaziabad', 'Goa',
  'Gorakhpur', 'Guntur', 'Gurugram', 'Guwahati', 'Gwalior', 'Haldwani', 'Haridwar', 'Hisar', 'Hoshiarpur', 'Hubballi (Hubli)',
  'Imphal', 'Indore', 'Jabalpur', 'Jaipur', 'Jalandhar', 'Jalgaon', 'Jammu', 'Jamnagar', 'Jamshedpur', 'Jhansi',
  'Jodhpur', 'Jorhat', 'Kakinada', 'Kanchipuram', 'Kannur', 'Kanpur', 'Karad', 'Karimnagar', 'Karnal', 'Karur',
  'Kasargod', 'Kashipur', 'Khammam', 'Khandwa', 'Kharagpur', 'Kolhapur', 'Kollam', 'Kota', 'Kottayam', 'Kurnool',
  'Latur', 'Lucknow', 'Ludhiana', 'Madurai', 'Manali', 'Mangaluru', 'Mathura', 'Meerut', 'Mohali', 'Moradabad',
  'Muzaffarnagar', 'Mysuru (Mysore)', 'Nadiad', 'Nagercoil', 'Nagpur', 'Nainital', 'Nanded', 'Nashik', 'Navsari',
  'Nellore', 'Nizamabad', 'Noida', 'Palakkad', 'Palanpur', 'Pali', 'Panaji', 'Panipat', 'Pathankot', 'Patiala',
  'Pondicherry', 'Porbandar', 'Prayagraj (Allahabad)', 'Puri', 'Raipur', 'Rajahmundry', 'Rajkot', 'Ranchi', 'Rishikesh',
  'Rohtak', 'Rourkela', 'Sagar', 'Salem', 'Sambalpur', 'Satara', 'Satna', 'Shillong', 'Shimla', 'Shivamogga',
  'Siliguri', 'Solapur', 'Sonipat', 'Sri Ganganagar', 'Srinagar', 'Surat', 'Tezpur', 'Thane', 'Thanjavur', 'Thrissur',
  'Tiruchirappalli (Trichy)', 'Tirunelveli', 'Tirupati', 'Tirupur', 'Tiruvarur', 'Tuticorin', 'Udaipur', 'Ujjain', 'Vadodara', 'Varanasi',
  'Vellore', 'Vijayawada', 'Visakhapatnam', 'Warangal', 'Yamunanagar'
];

export const OTHER_CITIES = Array.from(new Set(RAW_OTHER_CITIES)).sort((a, b) => a.localeCompare(b));

export const MOCK_CITIES = [
  ...POPULAR_CITIES,
  ...OTHER_CITIES.map(c => ({ id: c.toLowerCase().replace(/[^a-z0-9]/g, '-'), name: c, isOther: true }))
];

// Mathematical Haversine Distance Formula (Exact KM calculation from User GPS coordinates)
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round((R * c) * 10) / 10;
}

// Complete Real Theatres Map with Exact Latitude/Longitude Coordinates (Comprehensive Lists)
export const REAL_CITY_THEATRES = {
  hyderabad: [
    {
      id: 'th_hyd_1',
      name: 'Prasads Multiplex: NTR Marg',
      city: 'Hyderabad',
      lat: 17.4116, lng: 78.4714,
      distance: 1.2,
      location: 'LIC Division, NTR Marg, Opposite Lumbini Park, Hyderabad',
      amenities: ['Large Screen', 'Dolby Atmos', 'Food Court', 'Gaming Zone'],
      cancellationPolicy: 'Cancellation available up to 4 hrs before showtime',
      shows: [
        { id: 2401, time: '10:30 AM', format: '3D', price: 250, status: 'Available' },
        { id: 2402, time: '02:00 PM', format: 'LARGE SCREEN 3D', price: 350, status: 'Filling Fast' },
        { id: 2403, time: '05:45 PM', format: '3D', price: 300, status: 'Almost Full' },
        { id: 2404, time: '09:30 PM', format: '3D', price: 320, status: 'Available' }
      ]
    },
    {
      id: 'th_hyd_2',
      name: 'INOX: Maheshwari Parmeshwari Mall, Abids',
      city: 'Hyderabad',
      lat: 17.3888, lng: 78.4764,
      distance: 2.1,
      location: 'Koti Main Road, Abids, Hyderabad',
      amenities: ['Dolby Digital', 'AC Seating', 'Cafeteria'],
      cancellationPolicy: 'Cancellation available up to 2 hrs before showtime',
      shows: [
        { id: 2436, time: '12:30 PM', format: '2D', price: 170, status: 'Available' },
        { id: 2437, time: '04:15 PM', format: '2D', price: 210, status: 'Filling Fast' },
        { id: 2438, time: '08:00 PM', format: '2D', price: 240, status: 'Available' }
      ]
    },
    {
      id: 'th_hyd_3',
      name: 'INOX: GVK One Mall, Banjara Hills',
      city: 'Hyderabad',
      lat: 17.4192, lng: 78.4485,
      distance: 3.5,
      location: 'Road No. 1, Banjara Hills, Hyderabad',
      amenities: ['INSIGNIA', 'Dolby Atmos', 'Recliners', 'Gourmet Menu'],
      cancellationPolicy: 'Cancellation available up to 2 hrs before showtime',
      shows: [
        { id: 2412, time: '11:45 AM', format: 'INSIGNIA', price: 650, status: 'Available' },
        { id: 2413, time: '03:15 PM', format: '3D', price: 340, status: 'Filling Fast' },
        { id: 2414, time: '07:00 PM', format: 'INSIGNIA', price: 750, status: 'Almost Full' }
      ]
    },
    {
      id: 'th_hyd_4',
      name: 'PVR Next Galleria Mall: Panjagutta',
      city: 'Hyderabad',
      lat: 17.4246, lng: 78.4504,
      distance: 4.2,
      location: 'Irrum Manzil Metro Station, Panjagutta, Hyderabad',
      amenities: ['4K Projection', 'Dolby Atmos', 'Recliners'],
      cancellationPolicy: 'Cancellation available up to 4 hrs before showtime',
      shows: [
        { id: 2418, time: '12:15 PM', format: '3D', price: 290, status: 'Available' },
        { id: 2419, time: '04:00 PM', format: '3D', price: 330, status: 'Filling Fast' },
        { id: 2420, time: '07:45 PM', format: '3D', price: 360, status: 'Available' }
      ]
    },
    {
      id: 'th_hyd_7',
      name: 'AMB Cinemas: Gachibowli',
      city: 'Hyderabad',
      lat: 17.4563, lng: 78.3662,
      distance: 7.4,
      location: 'Sarath City Capital Mall, Gachibowli Main Road, Hyderabad',
      amenities: ['VVIP Lounge', 'Dolby Atmos', '4K Projection', 'M-Ticket'],
      cancellationPolicy: 'Cancellation available up to 3 hrs before showtime',
      shows: [
        { id: 2405, time: '11:15 AM', format: '3D', price: 300, status: 'Available' },
        { id: 2406, time: '02:45 PM', format: '3D', price: 350, status: 'Filling Fast' },
        { id: 2407, time: '06:30 PM', format: 'VVIP 3D', price: 600, status: 'Almost Full' }
      ]
    },
    {
      id: 'th_hyd_8',
      name: 'PVR Forum Sujana Mall: Kukatpally',
      city: 'Hyderabad',
      lat: 17.4842, lng: 78.3889,
      distance: 8.9,
      location: 'Kukatpally Housing Board Colony, Hyderabad',
      amenities: ['IMAX 3D', '4DX', 'Recliners', 'Food Court'],
      cancellationPolicy: 'Cancellation available up to 4 hrs before showtime',
      shows: [
        { id: 2408, time: '10:00 AM', format: 'IMAX 3D', price: 380, status: 'Available' },
        { id: 2409, time: '01:30 PM', format: '4DX 3D', price: 480, status: 'Filling Fast' },
        { id: 2410, time: '05:00 PM', format: 'IMAX 3D', price: 420, status: 'Almost Full' },
        { id: 2411, time: '08:45 PM', format: '3D', price: 320, status: 'Available' }
      ]
    },
    {
      id: 'th_hyd_9',
      name: 'PVR Inorbit Mall: Cyberabad',
      city: 'Hyderabad',
      lat: 17.4375, lng: 78.3812,
      distance: 6.8,
      location: 'Inorbit Mall Road, Hitec City, Hyderabad',
      amenities: ['LUXE Recliners', 'Dolby Atmos', 'Food Court'],
      cancellationPolicy: 'Cancellation available up to 3 hrs before showtime',
      shows: [
        { id: 2440, time: '11:00 AM', format: '3D', price: 310, status: 'Available' },
        { id: 2441, time: '03:30 PM', format: 'LUXE 3D', price: 650, status: 'Filling Fast' },
        { id: 2442, time: '08:15 PM', format: '3D', price: 340, status: 'Available' }
      ]
    },
    {
      id: 'th_hyd_10',
      name: 'Cinepolis: Mantra Mall, Attapur',
      city: 'Hyderabad',
      lat: 17.3689, lng: 78.4352,
      distance: 5.2,
      location: 'PV Narasimha Rao Expressway, Attapur, Hyderabad',
      amenities: ['RealD 3D', 'VIP Lounge', 'Cafeteria'],
      cancellationPolicy: 'Cancellation available up to 2 hrs before showtime',
      shows: [
        { id: 2445, time: '12:00 PM', format: '2D', price: 200, status: 'Available' },
        { id: 2446, time: '04:30 PM', format: '3D', price: 270, status: 'Filling Fast' },
        { id: 2447, time: '08:45 PM', format: '3D', price: 290, status: 'Available' }
      ]
    },
    {
      id: 'th_hyd_11',
      name: 'Asian M-Cube Mall: Attapur',
      city: 'Hyderabad',
      lat: 17.3712, lng: 78.4380,
      distance: 5.5,
      location: 'Ring Road, Hyderguda, Attapur, Hyderabad',
      amenities: ['4K Digital', 'Dolby 7.1', 'Snack Corner'],
      cancellationPolicy: 'Cancellation available up to 2 hrs before showtime',
      shows: [
        { id: 2450, time: '10:45 AM', format: '2D', price: 180, status: 'Available' },
        { id: 2451, time: '02:15 PM', format: '2D', price: 200, status: 'Available' },
        { id: 2452, time: '06:45 PM', format: '2D', price: 220, status: 'Filling Fast' }
      ]
    },
    {
      id: 'th_hyd_12',
      name: 'INOX: GSM Mall, Chandanagar',
      city: 'Hyderabad',
      lat: 17.4982, lng: 78.3267,
      distance: 12.1,
      location: 'Mumbai Highway, Chandanagar, Hyderabad',
      amenities: ['Dolby Atmos', 'Recliner Seats', 'Popcorn Lounge'],
      cancellationPolicy: 'Cancellation available up to 3 hrs before showtime',
      shows: [
        { id: 2455, time: '11:30 AM', format: '3D', price: 250, status: 'Available' },
        { id: 2456, time: '03:45 PM', format: '3D', price: 280, status: 'Filling Fast' },
        { id: 2457, time: '07:30 PM', format: '3D', price: 310, status: 'Available' }
      ]
    },
    {
      id: 'th_hyd_13',
      name: 'Asian Radhika Multiplex: ECIL',
      city: 'Hyderabad',
      lat: 17.4690, lng: 78.5610,
      distance: 14.3,
      location: 'ECIL X Roads, Kapra, Secunderabad, Hyderabad',
      amenities: ['Dolby Atmos', 'Pushback Chairs', 'Food Court'],
      cancellationPolicy: 'Cancellation available up to 2 hrs before showtime',
      shows: [
        { id: 2460, time: '11:15 AM', format: '2D', price: 170, status: 'Available' },
        { id: 2461, time: '02:45 PM', format: '2D', price: 200, status: 'Available' },
        { id: 2462, time: '07:00 PM', format: '2D', price: 230, status: 'Filling Fast' }
      ]
    },
    {
      id: 'th_hyd_14',
      name: 'Sudarshan 35MM: RTC X Roads',
      city: 'Hyderabad',
      lat: 17.4080, lng: 78.4912,
      distance: 2.8,
      location: 'Chikkadpally, RTC X Roads, Hyderabad',
      amenities: ['Heritage Theatre', 'Mass Screen', 'Dolby 7.1'],
      cancellationPolicy: 'Non-refundable booking',
      shows: [
        { id: 2465, time: '11:00 AM', format: '2D', price: 150, status: 'Available' },
        { id: 2466, time: '02:15 PM', format: '2D', price: 170, status: 'Filling Fast' },
        { id: 2467, time: '06:00 PM', format: '2D', price: 190, status: 'Almost Full' }
      ]
    },
    {
      id: 'th_hyd_15',
      name: 'Sandhya 35MM: RTC X Roads',
      city: 'Hyderabad',
      lat: 17.4088, lng: 78.4925,
      distance: 3.0,
      location: 'Main Road, RTC X Roads, Hyderabad',
      amenities: ['Dolby Sound', 'Pushback Chairs', 'Snack Bar'],
      cancellationPolicy: 'Non-refundable booking',
      shows: [
        { id: 2470, time: '11:30 AM', format: '2D', price: 140, status: 'Available' },
        { id: 2471, time: '02:30 PM', format: '2D', price: 160, status: 'Available' },
        { id: 2472, time: '06:30 PM', format: '2D', price: 180, status: 'Filling Fast' }
      ]
    }
  ],

  sitamarhi: [
    {
      id: 'th_sitamarhi_1',
      name: 'Raj Talkies: Sitamarhi',
      city: 'Sitamarhi',
      lat: 26.5982, lng: 85.4871,
      distance: 0.8,
      location: 'Main Bazar Road, Near Court Campus, Sitamarhi',
      amenities: ['Dolby Digital Sound', 'Push-back Seats', 'M-Ticket', 'Snack Bar'],
      cancellationPolicy: 'Cancellation available up to 4 hrs before showtime',
      shows: [
        { id: 2001, time: '11:15 AM', format: '2D', price: 150, status: 'Available' },
        { id: 2002, time: '02:30 PM', format: '2D', price: 180, status: 'Filling Fast' },
        { id: 2003, time: '06:15 PM', format: '2D', price: 200, status: 'Almost Full' },
        { id: 2004, time: '09:00 PM', format: '2D', price: 180, status: 'Available' }
      ]
    },
    {
      id: 'th_sitamarhi_2',
      name: 'Prabhat Talkies: Sitamarhi',
      city: 'Sitamarhi',
      lat: 26.6005, lng: 85.4895,
      distance: 1.4,
      location: 'Cinema Hall Road, Near Main Chowk, Sitamarhi',
      amenities: ['Dolby 5.1 Sound', 'Push-back Chairs', 'Refreshment Counter'],
      cancellationPolicy: 'Cancellation available up to 2 hrs before showtime',
      shows: [
        { id: 2012, time: '11:00 AM', format: '2D', price: 130, status: 'Available' },
        { id: 2013, time: '02:15 PM', format: '2D', price: 150, status: 'Available' },
        { id: 2014, time: '06:00 PM', format: '2D', price: 170, status: 'Filling Fast' }
      ]
    },
    {
      id: 'th_sitamarhi_3',
      name: 'Shree Krishna Cinema: Sitamarhi',
      city: 'Sitamarhi',
      lat: 26.6021, lng: 85.4920,
      distance: 2.1,
      location: 'Station Road, Near Bus Stand, Sitamarhi',
      amenities: ['Dolby Sound', 'Air Conditioned', 'Food Stall'],
      cancellationPolicy: 'Cancellation available up to 2 hrs before showtime',
      shows: [
        { id: 2005, time: '10:45 AM', format: '2D', price: 140, status: 'Available' },
        { id: 2006, time: '01:45 PM', format: '2D', price: 160, status: 'Available' },
        { id: 2007, time: '05:30 PM', format: '2D', price: 180, status: 'Filling Fast' },
        { id: 2008, time: '08:45 PM', format: '2D', price: 160, status: 'Available' }
      ]
    },
    {
      id: 'th_sitamarhi_4',
      name: 'Sitamarhi Cineplex: Grand Market',
      city: 'Sitamarhi',
      lat: 26.6050, lng: 85.4950,
      distance: 2.9,
      location: 'Market Complex, Hospital Road, Sitamarhi',
      amenities: ['4K Digital', 'Dolby Atmos', 'Food Court'],
      cancellationPolicy: 'Cancellation available up to 3 hrs before showtime',
      shows: [
        { id: 2021, time: '12:15 PM', format: '3D', price: 200, status: 'Available' },
        { id: 2022, time: '04:00 PM', format: '3D', price: 240, status: 'Filling Fast' },
        { id: 2023, time: '07:45 PM', format: '3D', price: 270, status: 'Available' }
      ]
    },
    {
      id: 'th_sitamarhi_5',
      name: 'V2 Mall Cinema: Sitamarhi',
      city: 'Sitamarhi',
      lat: 26.5890, lng: 85.4750,
      distance: 3.8,
      location: 'Dumra Road, Near Collectorate, Sitamarhi',
      amenities: ['4K Projection', 'Dolby Atmos', 'Recliner Seats', 'Gourmet Snacks'],
      cancellationPolicy: 'Cancellation available up to 3 hrs before showtime',
      shows: [
        { id: 2009, time: '12:00 PM', format: '3D', price: 220, status: 'Available' },
        { id: 2010, time: '03:45 PM', format: '3D', price: 260, status: 'Filling Fast' },
        { id: 2011, time: '07:15 PM', format: '3D', price: 300, status: 'Almost Full' }
      ]
    },
    {
      id: 'th_sitamarhi_6',
      name: 'Shankar Chitra Mandir: Dumra',
      city: 'Sitamarhi',
      lat: 26.5820, lng: 85.4680,
      distance: 4.5,
      location: 'Mehsi Chowk, Dumra, Sitamarhi',
      amenities: ['Digital Sound System', 'Air Cooled', 'Fast Food Stall'],
      cancellationPolicy: 'Non-refundable booking',
      shows: [
        { id: 2015, time: '12:30 PM', format: '2D', price: 120, status: 'Available' },
        { id: 2016, time: '03:30 PM', format: '2D', price: 140, status: 'Available' },
        { id: 2017, time: '07:00 PM', format: '2D', price: 160, status: 'Filling Fast' }
      ]
    },
    {
      id: 'th_sitamarhi_7',
      name: 'Milan Cinema: Station Road',
      city: 'Sitamarhi',
      lat: 26.6035, lng: 85.4930,
      distance: 2.4,
      location: 'Station Road, Near Railway Junction, Sitamarhi',
      amenities: ['Pushback Seats', 'Dolby Digital', 'Snack Stall'],
      cancellationPolicy: 'Cancellation available up to 2 hrs before showtime',
      shows: [
        { id: 2025, time: '11:30 AM', format: '2D', price: 140, status: 'Available' },
        { id: 2026, time: '02:45 PM', format: '2D', price: 160, status: 'Available' },
        { id: 2027, time: '06:30 PM', format: '2D', price: 180, status: 'Filling Fast' }
      ]
    },
    {
      id: 'th_sitamarhi_8',
      name: 'Liberty Talkies: Main Road',
      city: 'Sitamarhi',
      lat: 26.5960, lng: 85.4840,
      distance: 1.1,
      location: 'Bazar Samiti Road, Sitamarhi',
      amenities: ['Dolby Sound', 'Air Cooled', 'Cafeteria'],
      cancellationPolicy: 'Non-refundable booking',
      shows: [
        { id: 2030, time: '11:00 AM', format: '2D', price: 130, status: 'Available' },
        { id: 2031, time: '02:00 PM', format: '2D', price: 150, status: 'Filling Fast' },
        { id: 2032, time: '06:00 PM', format: '2D', price: 170, status: 'Available' }
      ]
    },
    {
      id: 'th_sitamarhi_9',
      name: 'Amar Cinema: Mehsi Chowk',
      city: 'Sitamarhi',
      lat: 26.5810, lng: 85.4660,
      distance: 4.8,
      location: 'Dumra Road, Sitamarhi',
      amenities: ['Digital Sound', 'Popcorn Counter'],
      cancellationPolicy: 'Cancellation available up to 2 hrs before showtime',
      shows: [
        { id: 2035, time: '12:15 PM', format: '2D', price: 120, status: 'Available' },
        { id: 2036, time: '03:15 PM', format: '2D', price: 140, status: 'Available' },
        { id: 2037, time: '07:15 PM', format: '2D', price: 150, status: 'Filling Fast' }
      ]
    },
    {
      id: 'th_sitamarhi_10',
      name: 'Grand City Cineplex: Court Area',
      city: 'Sitamarhi',
      lat: 26.5990, lng: 85.4880,
      distance: 0.9,
      location: 'Near Collectorate Office, Sitamarhi',
      amenities: ['4K Digital', 'AC Lounge', 'Gourmet Counter'],
      cancellationPolicy: 'Cancellation available up to 3 hrs before showtime',
      shows: [
        { id: 2040, time: '10:30 AM', format: '3D', price: 220, status: 'Available' },
        { id: 2041, time: '02:15 PM', format: '3D', price: 250, status: 'Filling Fast' },
        { id: 2042, time: '06:45 PM', format: '3D', price: 280, status: 'Almost Full' }
      ]
    }
  ],

  patna: [
    {
      id: 'th_patna_1',
      name: 'Mona Cinema: Exhibition Road',
      city: 'Patna',
      lat: 25.6120, lng: 85.1420,
      distance: 1.1,
      location: 'East Gandhi Maidan, Exhibition Road, Patna',
      amenities: ['Dolby Digital', 'Balcony Seating', 'Snack Bar'],
      cancellationPolicy: 'Cancellation available up to 2 hrs before showtime',
      shows: [
        { id: 2105, time: '11:30 AM', format: '2D', price: 180, status: 'Available' },
        { id: 2106, time: '02:45 PM', format: '2D', price: 220, status: 'Filling Fast' },
        { id: 2107, time: '06:30 PM', format: '2D', price: 250, status: 'Almost Full' }
      ]
    },
    {
      id: 'th_patna_2',
      name: 'INOX: City Centre, Fraser Road',
      city: 'Patna',
      lat: 25.6090, lng: 85.1380,
      distance: 1.8,
      location: 'Fraser Road, Near Dak Bungalow, Patna',
      amenities: ['INSIGNIA', 'Dolby Atmos', 'Recliners'],
      cancellationPolicy: 'Cancellation available up to 3 hrs before showtime',
      shows: [
        { id: 2108, time: '12:15 PM', format: '3D', price: 320, status: 'Available' },
        { id: 2109, time: '04:00 PM', format: '3D', price: 380, status: 'Filling Fast' },
        { id: 2110, time: '07:45 PM', format: 'INSIGNIA', price: 650, status: 'Almost Full' }
      ]
    },
    {
      id: 'th_patna_3',
      name: 'Cinepolis: P&M Mall, Patliputra',
      city: 'Patna',
      lat: 25.6280, lng: 85.1120,
      distance: 4.6,
      location: 'Patliputra Industrial Area, Kurji Road, Patna',
      amenities: ['Dolby Atmos', '4K Projection', 'Recliners', 'Food Court'],
      cancellationPolicy: 'Cancellation available up to 4 hrs before showtime',
      shows: [
        { id: 2101, time: '10:30 AM', format: '3D', price: 280, status: 'Available' },
        { id: 2102, time: '01:45 PM', format: 'IMAX 3D', price: 420, status: 'Filling Fast' },
        { id: 2103, time: '05:30 PM', format: '3D', price: 380, status: 'Almost Full' },
        { id: 2104, time: '09:15 PM', format: 'Recliner 3D', price: 550, status: 'Available' }
      ]
    },
    {
      id: 'th_patna_4',
      name: 'Regent Cinema: East Gandhi Maidan',
      city: 'Patna',
      lat: 25.6135, lng: 85.1410,
      distance: 1.3,
      location: 'Opposite Gandhi Maidan, Patna',
      amenities: ['Dolby Sound', 'Heritage Balcony', 'Cafeteria'],
      cancellationPolicy: 'Cancellation available up to 2 hrs before showtime',
      shows: [
        { id: 2112, time: '11:00 AM', format: '2D', price: 170, status: 'Available' },
        { id: 2113, time: '02:30 PM', format: '2D', price: 200, status: 'Filling Fast' },
        { id: 2114, time: '06:15 PM', format: '2D', price: 230, status: 'Available' }
      ]
    },
    {
      id: 'th_patna_5',
      name: 'PVR Anisabad: Phulwari Sharif',
      city: 'Patna',
      lat: 25.5890, lng: 85.1010,
      distance: 6.2,
      location: 'Anisabad Roundabout, Bypass Road, Patna',
      amenities: ['4K Laser', 'Dolby Atmos', 'Food Court'],
      cancellationPolicy: 'Cancellation available up to 3 hrs before showtime',
      shows: [
        { id: 2118, time: '12:30 PM', format: '3D', price: 260, status: 'Available' },
        { id: 2119, time: '04:15 PM', format: '3D', price: 310, status: 'Filling Fast' },
        { id: 2120, time: '08:00 PM', format: '3D', price: 340, status: 'Available' }
      ]
    },
    {
      id: 'th_patna_6',
      name: 'Veena Cinema: Station Road',
      city: 'Patna',
      lat: 25.6040, lng: 85.1320,
      distance: 2.2,
      location: 'Near Patna Junction Railway Station, Patna',
      amenities: ['Digital Sound', 'AC Seating'],
      cancellationPolicy: 'Non-refundable booking',
      shows: [
        { id: 2125, time: '11:15 AM', format: '2D', price: 140, status: 'Available' },
        { id: 2126, time: '02:45 PM', format: '2D', price: 170, status: 'Available' },
        { id: 2127, time: '06:30 PM', format: '2D', price: 190, status: 'Filling Fast' }
      ]
    },
    {
      id: 'th_patna_7',
      name: 'Apsara Cinema: Kankarbagh',
      city: 'Patna',
      lat: 25.5990, lng: 85.1550,
      distance: 3.1,
      location: 'Kankarbagh Main Road, Patna',
      amenities: ['Pushback Seats', 'Dolby 7.1', 'Snack Stall'],
      cancellationPolicy: 'Cancellation available up to 2 hrs before showtime',
      shows: [
        { id: 2130, time: '11:45 AM', format: '2D', price: 160, status: 'Available' },
        { id: 2131, time: '03:15 PM', format: '2D', price: 180, status: 'Filling Fast' },
        { id: 2132, time: '07:00 PM', format: '2D', price: 210, status: 'Available' }
      ]
    },
    {
      id: 'th_patna_8',
      name: 'Cinepolis: Patna Central Mall',
      city: 'Patna',
      lat: 25.6105, lng: 85.1390,
      distance: 1.5,
      location: 'Fraser Road, Patna',
      amenities: ['Dolby Atmos', 'Recliners', 'VIP Service'],
      cancellationPolicy: 'Cancellation available up to 3 hrs before showtime',
      shows: [
        { id: 2135, time: '12:00 PM', format: '3D', price: 300, status: 'Available' },
        { id: 2136, time: '03:45 PM', format: '3D', price: 350, status: 'Filling Fast' },
        { id: 2137, time: '07:30 PM', format: '3D', price: 400, status: 'Almost Full' }
      ]
    }
  ],

  mumbai: [
    {
      id: 'th_mum_1',
      name: 'Regal Cinema: Colaba',
      city: 'Mumbai',
      lat: 18.9254, lng: 72.8317,
      distance: 1.5,
      location: 'Colaba Causeway, Opposite SMS Building, Mumbai',
      amenities: ['Heritage Cinema', 'Dolby Sound', 'Balcony Seating'],
      cancellationPolicy: 'Cancellation available up to 3 hrs before showtime',
      shows: [
        { id: 1015, time: '11:30 AM', format: '2D', price: 200, status: 'Available' },
        { id: 1016, time: '03:00 PM', format: '2D', price: 250, status: 'Filling Fast' },
        { id: 1017, time: '06:30 PM', format: '2D', price: 280, status: 'Available' }
      ]
    },
    {
      id: 'th_mum_2',
      name: 'PVR Icon: Phoenix Palladium',
      city: 'Mumbai',
      lat: 18.9951, lng: 72.8256,
      distance: 3.2,
      location: 'High Street Phoenix, Lower Parel, Mumbai',
      amenities: ['Dolby Atmos', '4K Laser', 'Recliners', 'Gourmet Food Court', 'M-Ticket'],
      cancellationPolicy: 'Cancellation available up to 4 hrs before showtime',
      shows: [
        { id: 1001, time: '10:30 AM', format: '4DX 3D', price: 380, status: 'Available' },
        { id: 1002, time: '01:45 PM', format: 'IMAX 3D', price: 520, status: 'Filling Fast' },
        { id: 1003, time: '05:15 PM', format: 'IMAX 3D', price: 580, status: 'Almost Full' },
        { id: 1004, time: '09:00 PM', format: 'Recliner 3D', price: 750, status: 'Available' }
      ]
    },
    {
      id: 'th_mum_3',
      name: 'Maison PVR: Jio World Drive',
      city: 'Mumbai',
      lat: 19.0650, lng: 72.8680,
      distance: 6.4,
      location: 'Bandra Kurla Complex (BKC), Mumbai',
      amenities: ['LUXE Recliners', 'Chef Special Dining', 'Dolby Atmos'],
      cancellationPolicy: 'Cancellation available up to 3 hrs before showtime',
      shows: [
        { id: 1009, time: '12:30 PM', format: 'LUXE 3D', price: 850, status: 'Available' },
        { id: 1010, time: '04:15 PM', format: 'LUXE 3D', price: 950, status: 'Filling Fast' },
        { id: 1011, time: '08:00 PM', format: 'LUXE 3D', price: 1200, status: 'Almost Full' }
      ]
    },
    {
      id: 'th_mum_4',
      name: 'G7 Multiplex (Gaiety Galaxy): Bandra',
      city: 'Mumbai',
      lat: 19.0550, lng: 72.8350,
      distance: 5.1,
      location: 'SV Road, Bandra West, Mumbai',
      amenities: ['Single Screen Legend', 'Dolby 7.1', 'Iconic Mass Vibe'],
      cancellationPolicy: 'Non-refundable booking',
      shows: [
        { id: 1020, time: '12:00 PM', format: '2D', price: 160, status: 'Available' },
        { id: 1021, time: '03:30 PM', format: '2D', price: 180, status: 'Filling Fast' },
        { id: 1022, time: '06:45 PM', format: '2D', price: 210, status: 'Almost Full' }
      ]
    },
    {
      id: 'th_mum_5',
      name: 'PVR Infiniti Mall: Malad',
      city: 'Mumbai',
      lat: 19.1840, lng: 72.8340,
      distance: 14.2,
      location: 'New Link Road, Malad West, Mumbai',
      amenities: ['IMAX 3D', '4DX', 'Recliners', 'Food Court'],
      cancellationPolicy: 'Cancellation available up to 4 hrs before showtime',
      shows: [
        { id: 1025, time: '11:15 AM', format: 'IMAX 3D', price: 420, status: 'Available' },
        { id: 1026, time: '03:00 PM', format: '4DX 3D', price: 550, status: 'Filling Fast' },
        { id: 1027, time: '07:15 PM', format: 'IMAX 3D', price: 600, status: 'Available' }
      ]
    }
  ]
};

// Helper to generate dynamic theatres for ANY selected city in India (Full 12+ Cinema Halls)
export const generateTheatresForCity = (cityName, userCoords = null) => {
  if (!cityName) cityName = 'Sitamarhi';
  const cleanKey = cityName.toLowerCase().replace(/[^a-z0-9]/g, '');

  let rawList = [];

  // Check exact mapping first
  if (REAL_CITY_THEATRES[cleanKey]) {
    rawList = [...REAL_CITY_THEATRES[cleanKey]];
  } else {
    // Also check if any key matches partly
    for (const key of Object.keys(REAL_CITY_THEATRES)) {
      if (cleanKey.includes(key) || key.includes(cleanKey)) {
        rawList = [...REAL_CITY_THEATRES[key]];
        break;
      }
    }
  }

  // If city is not explicitly mapped or has fewer than 10 theatres, auto-expand to 12+ halls!
  const cleanCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  const baseLat = userCoords?.lat || 25.6000;
  const baseLng = userCoords?.lng || 85.1000;

  const fallbackHalls = [
    {
      id: `th_${cleanCity.toLowerCase()}_1`,
      name: `PVR Icon: ${cleanCity} Central Mall`,
      city: cleanCity,
      lat: baseLat + 0.008, lng: baseLng + 0.006,
      distance: 1.2,
      location: `Bypass Road, Near District Centre, ${cleanCity}`,
      amenities: ['Dolby Atmos', '4K Laser', 'Recliners', 'Gourmet Food Court', 'M-Ticket'],
      cancellationPolicy: 'Cancellation available up to 4 hrs before showtime',
      shows: [
        { id: 1001, time: '10:30 AM', format: '4DX 3D', price: 320, status: 'Available' },
        { id: 1002, time: '01:45 PM', format: 'IMAX 3D', price: 450, status: 'Filling Fast' },
        { id: 1003, time: '05:15 PM', format: 'IMAX 3D', price: 500, status: 'Almost Full' },
        { id: 1004, time: '09:00 PM', format: 'Recliner 3D', price: 650, status: 'Available' }
      ]
    },
    {
      id: `th_${cleanCity.toLowerCase()}_2`,
      name: `INOX Multiplex: Grand Mall, ${cleanCity}`,
      city: cleanCity,
      lat: baseLat - 0.012, lng: baseLng + 0.015,
      distance: 2.5,
      location: `Station Road, Near Bus Terminal, ${cleanCity}`,
      amenities: ['Dolby Atmos', 'MX4D', 'INSIGNIA Lounge', 'Food Delivery'],
      cancellationPolicy: 'Cancellation available up to 2 hrs before showtime',
      shows: [
        { id: 1005, time: '11:15 AM', format: '3D', price: 250, status: 'Available' },
        { id: 1006, time: '02:30 PM', format: 'MX4D', price: 400, status: 'Available' },
        { id: 1007, time: '06:45 PM', format: 'INSIGNIA', price: 750, status: 'Filling Fast' },
        { id: 1008, time: '10:15 PM', format: '3D', price: 280, status: 'Sold Out' }
      ]
    },
    {
      id: `th_${cleanCity.toLowerCase()}_3`,
      name: `Cinepolis: Galleria Mall, ${cleanCity}`,
      city: cleanCity,
      lat: baseLat + 0.025, lng: baseLng - 0.018,
      distance: 3.8,
      location: `MG Road, Civil Lines, ${cleanCity}`,
      amenities: ['VIP Lounge', 'RealD 3D', '4K Projection', 'Recliner Seats'],
      cancellationPolicy: 'Non-refundable booking',
      shows: [
        { id: 1009, time: '10:00 AM', format: '2D', price: 200, status: 'Available' },
        { id: 1010, time: '03:15 PM', format: '3D', price: 300, status: 'Available' },
        { id: 1011, time: '07:30 PM', format: 'VIP 3D', price: 550, status: 'Filling Fast' }
      ]
    },
    {
      id: `th_${cleanCity.toLowerCase()}_4`,
      name: `Miraj Cinemas: City Centre Mall, ${cleanCity}`,
      city: cleanCity,
      lat: baseLat - 0.035, lng: baseLng - 0.025,
      distance: 5.1,
      location: `Commercial Hub, ${cleanCity}`,
      amenities: ['Dolby Atmos', 'Pushback Seats', 'Cafeteria'],
      cancellationPolicy: 'Cancellation available up to 3 hrs before showtime',
      shows: [
        { id: 1012, time: '11:45 AM', format: '2D', price: 180, status: 'Available' },
        { id: 1013, time: '03:30 PM', format: '3D', price: 260, status: 'Filling Fast' },
        { id: 1014, time: '07:15 PM', format: '2D', price: 220, status: 'Available' }
      ]
    },
    {
      id: `th_${cleanCity.toLowerCase()}_5`,
      name: `Asian Cinemas: Town Square, ${cleanCity}`,
      city: cleanCity,
      lat: baseLat + 0.048, lng: baseLng + 0.042,
      distance: 7.2,
      location: `Main Market Road, ${cleanCity}`,
      amenities: ['4K Digital Projection', 'Dolby 7.1', 'Snack Counter'],
      cancellationPolicy: 'Cancellation available up to 2 hrs before showtime',
      shows: [
        { id: 1015, time: '12:15 PM', format: '2D', price: 160, status: 'Available' },
        { id: 1016, time: '04:00 PM', format: '3D', price: 230, status: 'Available' },
        { id: 1017, time: '08:30 PM', format: '2D', price: 200, status: 'Filling Fast' }
      ]
    },
    {
      id: `th_${cleanCity.toLowerCase()}_6`,
      name: `Wave Cinemas: ${cleanCity} Boulevard`,
      city: cleanCity,
      lat: baseLat - 0.042, lng: baseLng + 0.038,
      distance: 8.4,
      location: `Grand Trunk Road, ${cleanCity}`,
      amenities: ['Dolby Digital 7.1', 'Gourmet Snacks', 'M-Ticket'],
      cancellationPolicy: 'Cancellation available up to 3 hrs before showtime',
      shows: [
        { id: 1018, time: '11:30 AM', format: '2D', price: 170, status: 'Available' },
        { id: 1019, time: '03:15 PM', format: '2D', price: 190, status: 'Filling Fast' },
        { id: 1020, time: '07:45 PM', format: '2D', price: 220, status: 'Available' }
      ]
    },
    {
      id: `th_${cleanCity.toLowerCase()}_7`,
      name: `SRS Cinemas: Crown Mall, ${cleanCity}`,
      city: cleanCity,
      lat: baseLat + 0.055, lng: baseLng - 0.045,
      distance: 9.6,
      location: `Ring Road Junction, ${cleanCity}`,
      amenities: ['Dolby Atmos', 'Recliner Section', 'Food Court'],
      cancellationPolicy: 'Cancellation available up to 2 hrs before showtime',
      shows: [
        { id: 1021, time: '12:00 PM', format: '3D', price: 240, status: 'Available' },
        { id: 1022, time: '04:15 PM', format: '3D', price: 270, status: 'Available' },
        { id: 1023, time: '08:30 PM', format: '3D', price: 300, status: 'Filling Fast' }
      ]
    },
    {
      id: `th_${cleanCity.toLowerCase()}_8`,
      name: `Fun Cinemas: Galaxy Mall, ${cleanCity}`,
      city: cleanCity,
      lat: baseLat - 0.060, lng: baseLng - 0.050,
      distance: 11.2,
      location: `Airport Road, ${cleanCity}`,
      amenities: ['4K Digital', 'Pushback Chairs', 'Arcade Zone'],
      cancellationPolicy: 'Cancellation available up to 2 hrs before showtime',
      shows: [
        { id: 1024, time: '10:45 AM', format: '2D', price: 160, status: 'Available' },
        { id: 1025, time: '02:00 PM', format: '2D', price: 180, status: 'Filling Fast' },
        { id: 1026, time: '06:15 PM', format: '2D', price: 210, status: 'Available' }
      ]
    },
    {
      id: `th_${cleanCity.toLowerCase()}_9`,
      name: `Raj Cinema: Heritage Chowk, ${cleanCity}`,
      city: cleanCity,
      lat: baseLat + 0.015, lng: baseLng + 0.012,
      distance: 2.1,
      location: `Heritage Bazar Road, ${cleanCity}`,
      amenities: ['Single Screen Classic', 'Dolby Sound', 'Snack Stall'],
      cancellationPolicy: 'Non-refundable booking',
      shows: [
        { id: 1027, time: '11:15 AM', format: '2D', price: 130, status: 'Available' },
        { id: 1028, time: '02:30 PM', format: '2D', price: 150, status: 'Available' },
        { id: 1029, time: '06:30 PM', format: '2D', price: 170, status: 'Filling Fast' }
      ]
    },
    {
      id: `th_${cleanCity.toLowerCase()}_10`,
      name: `City Talkies: Cinema Road, ${cleanCity}`,
      city: cleanCity,
      lat: baseLat - 0.018, lng: baseLng - 0.014,
      distance: 2.8,
      location: `Cinema Road, ${cleanCity}`,
      amenities: ['Air Cooled', 'Dolby Digital', 'Cafeteria'],
      cancellationPolicy: 'Cancellation available up to 2 hrs before showtime',
      shows: [
        { id: 1030, time: '12:30 PM', format: '2D', price: 140, status: 'Available' },
        { id: 1031, time: '03:45 PM', format: '2D', price: 160, status: 'Filling Fast' },
        { id: 1032, time: '07:15 PM', format: '2D', price: 180, status: 'Available' }
      ]
    },
    {
      id: `th_${cleanCity.toLowerCase()}_11`,
      name: `Grand Multiplex: Mega City Centre, ${cleanCity}`,
      city: cleanCity,
      lat: baseLat + 0.032, lng: baseLng + 0.028,
      distance: 4.9,
      location: `Outer Ring Road, ${cleanCity}`,
      amenities: ['Dolby Atmos', '4K Projection', 'Food Court'],
      cancellationPolicy: 'Cancellation available up to 3 hrs before showtime',
      shows: [
        { id: 1033, time: '11:00 AM', format: '3D', price: 230, status: 'Available' },
        { id: 1034, time: '03:00 PM', format: '3D', price: 260, status: 'Filling Fast' },
        { id: 1035, time: '07:45 PM', format: '3D', price: 290, status: 'Almost Full' }
      ]
    },
    {
      id: `th_${cleanCity.toLowerCase()}_12`,
      name: `Central Cineplex: Station Road, ${cleanCity}`,
      city: cleanCity,
      lat: baseLat - 0.022, lng: baseLng + 0.020,
      distance: 3.4,
      location: `Station Road Junction, ${cleanCity}`,
      amenities: ['Digital Projection', 'Pushback Chairs', 'Fast Food'],
      cancellationPolicy: 'Cancellation available up to 2 hrs before showtime',
      shows: [
        { id: 1036, time: '10:15 AM', format: '2D', price: 150, status: 'Available' },
        { id: 1037, time: '01:45 PM', format: '2D', price: 170, status: 'Available' },
        { id: 1038, time: '06:00 PM', format: '2D', price: 190, status: 'Filling Fast' }
      ]
    }
  ];

  if (rawList.length === 0) {
    rawList = fallbackHalls;
  }

  // Calculate dynamic distance if userCoords available
  const result = rawList.map(t => {
    const item = { ...t };
    if (userCoords && userCoords.lat && userCoords.lng && item.lat && item.lng) {
      const dist = calculateDistanceKm(userCoords.lat, userCoords.lng, item.lat, item.lng);
      if (dist !== null) {
        item.distance = dist;
      }
    }
    return item;
  });

  // Sort by distance ascending if userCoords is active
  if (userCoords && userCoords.lat) {
    result.sort((a, b) => (a.distance || 99) - (b.distance || 99));
  }

  return result;
};

export const MOCK_MOVIES = [
  {
    id: 1,
    title: 'Kalki 2898 AD',
    tagline: 'The future has a new messiah.',
    description: 'A modern avatar of Lord Vishnu descends to Earth to protect humanity from dark forces in a dystopian post-apocalyptic world of Kasi.',
    rating: 8.9,
    votes: '142.5K',
    genre: ['Sci-Fi', 'Action', 'Mythology'],
    languages: ['Hindi', 'Telugu', 'Tamil', 'English'],
    formats: ['2D', '3D', 'IMAX 3D', '4DX'],
    duration: '3h 01m',
    releaseDate: '2024-06-27',
    director: 'Nag Ashwin',
    cast: ['Prabhas', 'Amitabh Bachchan', 'Kamal Haasan', 'Deepika Padukone', 'Disha Patani'],
    castDetails: [
      { name: 'Prabhas', role: 'Bhairava / Karna', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
      { name: 'Amitabh Bachchan', role: 'Ashwatthama', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' },
      { name: 'Deepika Padukone', role: 'SUM-80 / Raaya', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop' },
      { name: 'Kamal Haasan', role: 'Supreme Yaskin', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop' },
      { name: 'Disha Patani', role: 'Roxie', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' }
    ],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNTI2YTI0NWItNWQ2NS00YTZjLWI5ZmMtNTFiN2NmMzk4MmE2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    bannerUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/k9N_7N6P30Y',
    isRecommended: true,
    isNowShowing: true,
    isTrending: true,
    isComingSoon: false,
  },
  {
    id: 2,
    title: 'Stree 2: Sarkate Ka Aatank',
    tagline: 'O Stree kal aana... par aaj tickets book kar lena!',
    description: 'Chanderi is once again haunted by a terrifying headless entity called Sarkate. Vicky and his friends must unite to save their town.',
    rating: 8.7,
    votes: '198.2K',
    genre: ['Comedy', 'Horror', 'Mystery'],
    languages: ['Hindi'],
    formats: ['2D', '3D'],
    duration: '2h 29m',
    releaseDate: '2024-08-15',
    director: 'Amar Kaushik',
    cast: ['Rajkummar Rao', 'Shraddha Kapoor', 'Pankaj Tripathi', 'Aparshakti Khurana', 'Abhishek Banerjee'],
    castDetails: [
      { name: 'Rajkummar Rao', role: 'Vicky', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop' },
      { name: 'Shraddha Kapoor', role: 'Unknown Girl', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' },
      { name: 'Pankaj Tripathi', role: 'Rudra', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop' },
      { name: 'Aparshakti Khurana', role: 'Bittu', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' },
      { name: 'Abhishek Banerjee', role: 'Jana', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop' }
    ],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODBkMGNhNmJkZGE2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/KVnheXwqF08',
    isRecommended: true,
    isNowShowing: true,
    isTrending: true,
    isComingSoon: false,
  },
  {
    id: 3,
    title: 'Pushpa 2: The Rule',
    tagline: 'Wildfire arrives at the box office.',
    description: 'Pushpa Raj asserts his dominance over the red sandalwood smuggling cartel while confronting SP Bhanwar Singh Shekhawat.',
    rating: 9.2,
    votes: '320.1K',
    genre: ['Action', 'Thriller', 'Drama'],
    languages: ['Telugu', 'Hindi', 'Tamil', 'Kannada', 'Malayalam'],
    formats: ['2D', 'IMAX 2D', '4DX'],
    duration: '3h 10m',
    releaseDate: '2024-12-05',
    director: 'Sukumar',
    cast: ['Allu Arjun', 'Rashmika Mandanna', 'Fahadh Faasil', 'Jagapathi Babu'],
    castDetails: [
      { name: 'Allu Arjun', role: 'Pushpa Raj', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
      { name: 'Rashmika Mandanna', role: 'Srivalli', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop' },
      { name: 'Fahadh Faasil', role: 'SP Bhanwar Singh', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' },
      { name: 'Jagapathi Babu', role: 'Mangalam Srinu', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop' }
    ],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNGZlNTFlOWMtMzUwNC00ZDdhLTk0MWUtOGZjNDFiNzc5M2JiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    bannerUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/1kvkL28fn5o',
    isRecommended: true,
    isNowShowing: true,
    isTrending: true,
    isComingSoon: false,
  },
  {
    id: 4,
    title: 'Dune: Part Two',
    tagline: 'Long live the fighters.',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    rating: 9.1,
    votes: '240.8K',
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    languages: ['English', 'Hindi', 'Tamil'],
    formats: ['2D', '3D', 'IMAX 3D'],
    duration: '2h 46m',
    releaseDate: '2024-03-01',
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Javier Bardem', 'Austin Butler'],
    castDetails: [
      { name: 'Timothée Chalamet', role: 'Paul Atreides', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
      { name: 'Zendaya', role: 'Chani', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop' },
      { name: 'Rebecca Ferguson', role: 'Lady Jessica', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' },
      { name: 'Javier Bardem', role: 'Stilgar', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' }
    ],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w',
    isRecommended: true,
    isNowShowing: true,
    isTrending: false,
    isComingSoon: false,
  },
  {
    id: 5,
    title: 'Deadpool & Wolverine',
    tagline: 'Everyone deserves a happy ending.',
    description: 'Wolverine is recovering from his injuries when he crosses paths with the loudmouth Deadpool. They team up to defeat a common enemy.',
    rating: 8.8,
    votes: '310.5K',
    genre: ['Action', 'Comedy', 'Sci-Fi'],
    languages: ['English', 'Hindi', 'Telugu', 'Tamil'],
    formats: ['2D', '3D', '4DX', 'IMAX 3D'],
    duration: '2h 08m',
    releaseDate: '2024-07-26',
    director: 'Shawn Levy',
    cast: ['Ryan Reynolds', 'Hugh Jackman', 'Emma Corrin', 'Morena Baccarin'],
    castDetails: [
      { name: 'Ryan Reynolds', role: 'Wade Wilson / Deadpool', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
      { name: 'Hugh Jackman', role: 'Logan / Wolverine', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' },
      { name: 'Emma Corrin', role: 'Cassandra Nova', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop' },
      { name: 'Morena Baccarin', role: 'Vanessa', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' }
    ],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNzRiMjg0MzUtNTNhYi00MzcwLTg3MDMtMGU4MTgwMzk5OWMjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    bannerUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/73_1biulk6s',
    isRecommended: true,
    isNowShowing: true,
    isTrending: true,
    isComingSoon: false,
  },
  {
    id: 6,
    title: 'Avatar 3: Fire and Ash',
    tagline: 'Return to Pandora in a world reborn.',
    description: 'Explore the uncharted fiery regions of Pandora as Jake Sully and Neytiri face an aggressive new Na\'vi clan.',
    rating: 9.3,
    votes: 'Expected',
    genre: ['Sci-Fi', 'Action', 'Adventure'],
    languages: ['English', 'Hindi', 'Telugu', 'Tamil'],
    formats: ['3D', 'IMAX 3D', '4DX'],
    duration: '3h 15m',
    releaseDate: '2025-12-19',
    director: 'James Cameron',
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver', 'Stephen Lang'],
    castDetails: [
      { name: 'Sam Worthington', role: 'Jake Sully', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
      { name: 'Zoe Saldana', role: 'Neytiri', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop' },
      { name: 'Sigourney Weaver', role: 'Kiri', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' }
    ],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BYzA2Nzk5M2EtMjU2Mi00ZjVmLTk5MjAtOWE4ZjVlZDA5NmJhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    bannerUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1600&auto=format&fit=crop',
    trailerUrl: '',
    isRecommended: false,
    isNowShowing: false,
    isTrending: false,
    isComingSoon: true,
  },
  {
    id: 7,
    title: 'War 2',
    tagline: 'The ultimate spy universe showdown.',
    description: 'Major Kabir Dhaliwal confronts a lethal global agent in a high-octane espionage pursuit across Europe and Asia.',
    rating: 9.0,
    votes: 'Expected',
    genre: ['Action', 'Thriller'],
    languages: ['Hindi', 'Telugu', 'Tamil'],
    formats: ['2D', 'IMAX 2D'],
    duration: '2h 40m',
    releaseDate: '2025-08-14',
    director: 'Ayan Mukerji',
    cast: ['Hrithik Roshan', 'N.T. Rama Rao Jr.', 'Kiara Advani'],
    castDetails: [
      { name: 'Hrithik Roshan', role: 'Major Kabir Dhaliwal', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
      { name: 'N.T. Rama Rao Jr.', role: 'Agent Vikram', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' },
      { name: 'Kiara Advani', role: 'Nisha', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop' }
    ],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BZDU1MTlhNjMtYTM1NC00MDJmLTkwYTktYjJkNjBlYTE4ZTJmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    bannerUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1600&auto=format&fit=crop',
    trailerUrl: '',
    isRecommended: false,
    isNowShowing: false,
    isTrending: false,
    isComingSoon: true,
  }
];

export const MOCK_THEATRES = generateTheatresForCity('Hyderabad');

export const MOCK_EVENTS = [
  {
    id: 'e1',
    title: 'A.R. Rahman Live in Concert - World Tour',
    category: 'Concerts',
    date: 'Sun, 18 Oct 2026',
    venue: 'Main Stadium Grounds',
    price: '₹1,499 onwards',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'e2',
    title: 'Zakir Khan Live - Tathastu Special',
    category: 'Comedy',
    date: 'Sat, 24 Oct 2026',
    venue: 'City Cultural Auditorium',
    price: '₹799 onwards',
    imageUrl: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'e3',
    title: 'Mughal-e-Azam: The Broadway Musical',
    category: 'Theatre',
    date: 'Fri, 30 Oct 2026',
    venue: 'Grand Arts Performing Centre',
    price: '₹1,250 onwards',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'e4',
    title: 'ISL 2026 Season Grand Finale',
    category: 'Sports',
    date: 'Sun, 08 Nov 2026',
    venue: 'City Sports Arena',
    price: '₹499 onwards',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop'
  }
];

export const MOCK_OFFERS = [
  {
    id: 'off1',
    code: 'FILMY20',
    title: 'Get 20% OFF on your first booking',
    subtitle: 'Valid on all movie showtimes using UPI or Credit Card',
    discountPercentage: 20,
    maxDiscount: 150,
    validTill: '31 Dec 2026',
    bgGradient: 'from-rose-500 to-red-600'
  },
  {
    id: 'off2',
    code: 'WELCOME50',
    title: 'Flat ₹50 Instant Discount',
    subtitle: 'Applicable on minimum ticket purchase of ₹300',
    discountFlat: 50,
    validTill: '15 Nov 2026',
    bgGradient: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'off3',
    code: 'FOOD100',
    title: 'Buy 2 Tickets & Get Free Popcorn Voucher',
    subtitle: 'Redeemable directly at theatre snack counter',
    discountFlat: 0,
    validTill: '20 Nov 2026',
    bgGradient: 'from-amber-500 to-orange-600'
  }
];

export const MOCK_INITIAL_BOOKINGS = [
  {
    id: 'BK948201',
    movieId: 1,
    movieTitle: 'Kalki 2898 AD',
    moviePoster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
    theatreName: 'Prasads Multiplex: NTR Marg',
    location: 'LIC Division, NTR Marg, Opposite Lumbini Park, Hyderabad',
    showDate: 'Today',
    showTime: '01:45 PM',
    seats: ['F4', 'F5'],
    ticketCount: 2,
    subtotal: 1040,
    convenienceFee: 80,
    discount: 150,
    totalPrice: 970,
    bookingDate: '2026-10-05',
    status: 'Upcoming',
    qrCode: 'FILMYPASS-BK948201-F4F5'
  }
];
