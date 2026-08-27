/* ============================================================
 *  CENTRAL BUSINESS CONFIGURATION
 * ============================================================
 *  Replace the PLACEHOLDER values below with the real
 *  Mapetit Lusaniya business information when it becomes
 *  available. Everything across the site reads from here.
 * ============================================================ */
const business = {
  name: 'Mapetit Lusaniya',
  tagline: 'Food, Juices & Event Catering',
  shortDescription:
    'Freshly prepared food, natural juices and full event catering for every occasion.',

  // PLACEHOLDER: Replace with the real business WhatsApp number
  // Use international format without "+" or spaces (e.g. 2567XXXXXXXX for Uganda)
  whatsapp: '256754705365',

  // PLACEHOLDER: Replace with the real phone number
  phone: '+256 754 705 365',

  // PLACEHOLDER: Replace with the real email address
  email: 'mjuma725@gmail.com',

  // PLACEHOLDER: Replace with the real location/area
  location: 'Jinja, Uganda',
  locationNote: 'Jinja City',

  // PLACEHOLDER: Replace with the real opening hours
  hours: [
    { day: 'Monday – Friday', time: '8:00 AM – 8:00 PM' },
    { day: 'Saturday', time: '9:00 AM – 9:00 PM' },
    { day: 'Sunday', time: '10:00 AM – 6:00 PM' },
  ],

  social: {
    tiktok: 'https://www.tiktok.com/@mariamrashid975',
    facebook: 'https://www.facebook.com',
    instagram: 'https://www.instagram.com',
  },
};

/* Nav links shared by navbar + footer */
const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Catering', href: '#catering' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

/* ============================================================
 *  PLACEHOLDER categories — edit these names, descriptions and
 *  images to match the real Mapetit Lusaniya offerings.
 * ============================================================ */
const featuredCategories = [
  {
    id: 'food',
    name: 'Food',
    description: 'Hearty meals cooked fresh, from local classics to grilled favourites.',
    icon: 'fa-utensils',
    image: 'https://images.pexels.com/photos/22735421/pexels-photo-22735421.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'juices',
    name: 'Juices',
    description: 'Natural, freshly squeezed fruit juices and smoothies.',
    icon: 'fa-glass-water',
    image: 'https://images.pexels.com/photos/2479242/pexels-photo-2479242.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'fruits',
    name: 'Fruits',
    description: 'Fresh, seasonal fruit platters and healthy options.',
    icon: 'fa-apple-whole',
    image: 'https://images.pexels.com/photos/36499384/pexels-photo-36499384.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'tea-drinks',
    name: 'Tea & Drinks',
    description: 'Warm teas, coffee and refreshing beverages.',
    icon: 'fa-mug-hot',
    image: 'https://images.pexels.com/photos/30756925/pexels-photo-30756925.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'catering',
    name: 'Catering',
    description: 'Full buffet and catering services for any gathering.',
    icon: 'fa-users',
    image: 'https://images.pexels.com/photos/4005229/pexels-photo-4005229.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'events',
    name: 'Event Packages',
    description: 'Tailored packages for weddings, parties and corporate events.',
    icon: 'fa-champagne-glasses',
    image: 'https://images.pexels.com/photos/29040997/pexels-photo-29040997.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

/* Menu filter categories — must match the `category` field on products. */
const menuCategories = [
  'All',
  'Meals',
  'Chicken',
  'Local Food',
  'Snacks',
  'Juices',
  'Fruits',
  'Tea & Drinks',
];

/* ============================================================
 *  PLACEHOLDER PRODUCTS
 * ============================================================
 *  These are sample/demo items. Replace names, descriptions,
 *  prices and images with the real Mapetit Lusaniya menu.
 *  Prices are in Ugandan Shillings (UGX).
 * ============================================================ */
const products = [
  // Meals
  { id: 1, name: 'Kids Platter', description: 'Grilled chicken served with golden fries and a fresh side salad.', price: 15000, category: 'Meals', image: 'images/kid.jpeg', available: true, featured: true },
  { id: 2, name: 'Double Platter', description: 'Roasted chicken with seasonal vegetables and rich gravy.', price: 45000, category: 'Meals', image: 'images/double.jpeg', available: true },
  { id: 3, name: 'Single Platter', description: 'Grilled chicken breast with steamed rice, fries and fresh veg.', price: 25000, category: 'Meals', image: 'images/single.jpeg', available: true, featured: true },

  // Chicken
  { id: 4, name: 'Grilled Chicken Wings', description: 'Smoky grilled chicken wings with tortillas and fries.', price: 16000, category: 'Chicken', image: 'https://images.pexels.com/photos/37322776/pexels-photo-37322776.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', available: true },
  { id: 5, name: 'Chicken Skewers & Noodles', description: 'Tender chicken skewers served with noodles and dipping sauce.', price: 17000, category: 'Chicken', image: 'https://images.pexels.com/photos/37338385/pexels-photo-37338385.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', available: true },
  { id: 6, name: 'Whole Roast Chicken', description: 'A perfectly roasted whole chicken with garnish — great for sharing.', price: 35000, category: 'Chicken', image: 'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', available: true },

  // Local Food
  { id: 7, name: 'Double Platter', description: 'Rice, stew, fresh greens and chapati — a taste of home.', price: 45000, category: 'Local Food', image: 'images/double.jpeg', available: true, featured: true },
  { id: 8, name: 'Chapati & Beans', description: 'Warm homemade chapati served with beans and vegetable sauce.', price: 8000, category: 'Local Food', image: 'https://images.pexels.com/photos/5589943/pexels-photo-5589943.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', available: true },
  { id: 9, name: 'Ugali & Stew Combo', description: 'Traditional ugali with beans, greens and a rich vegetable sauce.', price: 10000, category: 'Local Food', image: 'https://images.pexels.com/photos/37100094/pexels-photo-37100094.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', available: true },

  // Snacks
  { id: 10, name: 'Crispy Samosas', description: 'Golden fried samosas with a savoury filling — a perfect snack.', price: 5000, category: 'Snacks', image: 'images/samosa.jpeg', available: true, featured: true },
  { id: 11, name: 'Spring Rolls', description: 'Crispy spring rolls served with fresh lettuce and dipping sauce.', price: 6000, category: 'Snacks', image: 'https://images.pexels.com/photos/4001867/pexels-photo-4001867.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', available: true },
  { id: 12, name: 'Samosa Combo Plate', description: 'Four crispy samosas with onion rings and green chili.', price: 8000, category: 'Snacks', image: 'https://images.pexels.com/photos/36170557/pexels-photo-36170557.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', available: true },

  // Juices
  { id: 13, name: 'Berry Fresh Juice', description: 'Refreshing mixed berry juice with fresh fruit garnish.', price: 8000, category: 'Juices', image: 'images/juice.jpeg', available: true, featured: true },
  { id: 14, name: 'Tropical Fruit Punch', description: 'A colourful blend of seasonal tropical fruits and juices.', price: 9000, category: 'Juices', image: 'https://images.pexels.com/photos/8215113/pexels-photo-8215113.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', available: true },
  { id: 15, name: 'Mango Smoothie', description: 'Thick, creamy mango smoothie — naturally sweet and refreshing.', price: 9000, category: 'Juices', image: 'https://images.pexels.com/photos/17612822/pexels-photo-17612822.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', available: true },
  { id: 16, name: 'Mango & Strawberry Blend', description: 'A vibrant mango and strawberry smoothie with fresh fruit.', price: 10000, category: 'Juices', image: 'https://images.pexels.com/photos/14930480/pexels-photo-14930480.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', available: true },

  // Fruits
  { id: 17, name: 'Seasonal Fruit Platter', description: 'A colourful arrangement of fresh, seasonal fruits.', price: 4000, category: 'Fruits', image: 'images/fruits.jpeg', available: true, featured: true },
  { id: 18, name: 'Citrus Fruit Bowl', description: 'Grapefruit, orange, lemon and lime slices — fresh and zesty.', price: 10000, category: 'Fruits', image: 'https://images.pexels.com/photos/12007736/pexels-photo-12007736.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', available: true },
  { id: 19, name: 'Mixed Fruit Selection', description: 'Bananas, grapes and plums — a healthy, ready-to-eat mix.', price: 8000, category: 'Fruits', image: 'https://images.pexels.com/photos/29994023/pexels-photo-29994023.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', available: true },

  // Tea & Drinks
  { id: 20, name: 'African Spiced Tea', description: 'Warm, aromatic traditional tea — freshly brewed.', price: 4000, category: 'Tea & Drinks', image: 'https://images.pexels.com/photos/30756925/pexels-photo-30756925.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', available: true },
  { id: 21, name: 'Cappuccino', description: 'Creamy cappuccino with beautiful latte art.', price: 6000, category: 'Tea & Drinks', image: 'https://images.pexels.com/photos/111159/pexels-photo-111159.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', available: true },
  { id: 22, name: 'Café Latte', description: 'Smooth espresso with steamed milk and heart-shaped art.', price: 6000, category: 'Tea & Drinks', image: 'https://images.pexels.com/photos/459489/pexels-photo-459489.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', available: true },
];

function getFeaturedProducts() {
  return products.filter((p) => p.featured && p.available);
}

/* ============================================================
 *  PLACEHOLDER EVENT TYPES
 * ============================================================ */
const eventTypes = [
  { id: 'weddings', name: 'Weddings', description: 'Elegant catering and setup for your special day.', image: 'https://images.pexels.com/photos/29040997/pexels-photo-29040997.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'birthdays', name: 'Birthdays', description: 'Fun, colourful food and drinks for birthday celebrations.', image: 'https://images.pexels.com/photos/19976278/pexels-photo-19976278.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'corporate', name: 'Corporate Events', description: 'Professional catering for meetings, conferences and launches.', image: 'https://images.pexels.com/photos/18749086/pexels-photo-18749086.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'family', name: 'Family Functions', description: 'Warm, home-style catering for family gatherings.', image: 'https://images.pexels.com/photos/18541972/pexels-photo-18541972.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'graduations', name: 'Graduations', description: 'Celebrate achievements with great food and drinks.', image: 'https://images.pexels.com/photos/28736727/pexels-photo-28736727.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'parties', name: 'Parties', description: 'Lively catering and setup for all kinds of parties.', image: 'https://images.pexels.com/photos/11282245/pexels-photo-11282245.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
];

/* ============================================================
 *  SAMPLE / DEMO CATERING PACKAGES
 * ============================================================ */
const packages = [
  {
    id: 'pkg-a', name: 'Sample Package A', tagline: 'Small Event Package',
    description: 'Perfect for intimate gatherings — a curated selection of food and drinks for smaller groups.',
    priceLabel: 'From UGX 500,000',
    image: 'https://images.pexels.com/photos/34279947/pexels-photo-34279947.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    includes: ['Food for up to 30 guests', '2 juice options', 'Basic table setup', 'Serving staff (2)'],
  },
  {
    id: 'pkg-b', name: 'Sample Package B', tagline: 'Family Celebration Package',
    description: 'A well-rounded package for family celebrations with a variety of meals, drinks and fruit.',
    priceLabel: 'From UGX 1,200,000',
    image: 'https://images.pexels.com/photos/18541972/pexels-photo-18541972.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    includes: ['Food for up to 60 guests', '3 juice options + fruit platter', 'Full buffet setup', 'Serving staff (4)'],
    popular: true,
  },
  {
    id: 'pkg-c', name: 'Sample Package C', tagline: 'Corporate Catering Package',
    description: 'Professional catering designed for corporate events, meetings and conferences.',
    priceLabel: 'From UGX 2,000,000',
    image: 'https://images.pexels.com/photos/18749086/pexels-photo-18749086.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    includes: ['Food for up to 100 guests', 'Tea, coffee & juice station', 'Snacks & dessert table', 'Serving staff (6)'],
  },
  {
    id: 'pkg-d', name: 'Sample Package D', tagline: 'Premium Event Package',
    description: 'Our most comprehensive package — full catering, setup and service for large events.',
    priceLabel: 'Request Quote',
    image: 'https://images.pexels.com/photos/29040997/pexels-photo-29040997.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    includes: ['Food for 150+ guests', 'Full juice & fruit bar', 'Premium buffet & event setup', 'Dedicated event coordinator'],
  },
];

/* Services offered on the enquiry form */
const serviceOptions = ['Food', 'Buffet', 'Juice', 'Fruits', 'Tea', 'Event setup'];

/* ============================================================
 *  PLACEHOLDER gallery images — replace with real Mapetit
 *  Lusaniya photos when they become available.
 * ============================================================ */
const galleryImages = [
  { src: 'https://images.pexels.com/photos/4005229/pexels-photo-4005229.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Elegant buffet spread with meats, cheeses and appetizers', category: 'Events' },
  { src: 'https://images.pexels.com/photos/2479242/pexels-photo-2479242.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Refreshing glass of berry juice with fresh fruit', category: 'Drinks' },
  { src: 'https://images.pexels.com/photos/19938618/pexels-photo-19938618.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Grilled chicken with rice and fresh vegetables', category: 'Food' },
  { src: 'https://images.pexels.com/photos/36499384/pexels-photo-36499384.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Colourful display of fresh fruit baskets', category: 'Fruits' },
  { src: 'https://images.pexels.com/photos/29040997/pexels-photo-29040997.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Beautifully arranged wedding reception tables', category: 'Events' },
  { src: 'https://images.pexels.com/photos/23286188/pexels-photo-23286188.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Crispy samosas with dipping sauce', category: 'Food' },
  { src: 'https://images.pexels.com/photos/8215113/pexels-photo-8215113.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Colourful assortment of fresh fruit juices', category: 'Drinks' },
  { src: 'https://images.pexels.com/photos/22735421/pexels-photo-22735421.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Traditional Ugandan meal with rice, stew and chapati', category: 'Food' },
  { src: 'https://images.pexels.com/photos/12007736/pexels-photo-12007736.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Stack of fresh citrus slices', category: 'Fruits' },
  { src: 'https://images.pexels.com/photos/18749086/pexels-photo-18749086.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Corporate event buffet with diverse food options', category: 'Events' },
  { src: 'https://images.pexels.com/photos/14930534/pexels-photo-14930534.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Vibrant smoothies with fresh fruit garnish', category: 'Drinks' },
  { src: 'https://images.pexels.com/photos/28736727/pexels-photo-28736727.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Chef serving traditional dishes at an elegant buffet', category: 'Events' },
];

const galleryFilterOptions = ['All', 'Food', 'Drinks', 'Events', 'Fruits'];
