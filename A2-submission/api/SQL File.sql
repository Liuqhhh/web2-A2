-- =============================================
-- PROG2002 A2: Charity Events Database Setup
-- =============================================

DROP DATABASE IF EXISTS charityevents_db;
CREATE DATABASE charityevents_db;
USE charityevents_db;


CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE organizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mission TEXT,
    contact_email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_description VARCHAR(500),
    full_description TEXT,
    date DATETIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    venue_details TEXT,
    ticket_price DECIMAL(10, 2) DEFAULT 0,
    goal_amount DECIMAL(10, 2),
    current_amount DECIMAL(10, 2) DEFAULT 0,
    category_id INT,
    organization_id INT,
    image_url VARCHAR(500),
    status ENUM('active', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
);


INSERT INTO categories (name) VALUES
('Gala Dinner'),
('Fun Run'),
('Silent Auction'),
('Concert'),
('Art Exhibition'),
('Charity Sports'),
('Community Fair'),
('Workshop');


INSERT INTO organizations (name, mission, contact_email, phone, address) VALUES
('Ocean Cleanup Initiative', 'To rid the world''s oceans of plastic through advanced technologies and community engagement.', 'contact@oceancleanup.org', '+61 2 1234 5678', '123 Coastal Drive, Sydney NSW 2000'),
('Future Readers Foundation', 'Promoting literacy and education for underprivileged children across Australia.', 'info@futurereaders.org', '+61 3 9876 5432', '456 Education Lane, Melbourne VIC 3000'),
('Wildlife Rescue Australia', 'Dedicated to the rescue, rehabilitation, and release of native Australian wildlife.', 'rescue@wildlifeau.org', '+61 7 5555 1234', '789 Bushland Road, Brisbane QLD 4000'),
('Community Health Alliance', 'Providing accessible healthcare services to remote and underserved communities.', 'admin@communityhealth.org', '+61 8 4444 5678', '321 Outback Way, Perth WA 6000');


INSERT INTO events (name, short_description, full_description, date, location, venue_details, ticket_price, goal_amount, current_amount, category_id, organization_id, image_url, status) VALUES
('Sunset Gala for the Oceans', 'An elegant evening to raise funds for ocean conservation efforts.', 'Join us for a magical evening under the stars at the Grand City Hall. This black-tie event features a gourmet dinner, live auction, and presentations from leading marine biologists. All proceeds support our ongoing efforts to remove plastic pollution from the Great Barrier Reef and other critical marine ecosystems.', '2025-10-15 19:00:00', 'Sydney', 'Grand City Hall, 123 Harbour Street', 150.00, 50000.00, 32500.00, 1, 1, '/images/gala-ocean.jpg', 'active'),

('City Fun Run 2025', 'A 5km fun run through the beautiful city park for all fitness levels.', 'Get ready to lace up your running shoes! Our annual City Fun Run returns with 5km and 10km options through scenic parklands. This family-friendly event includes entertainment, refreshments, and prizes for various categories. Perfect for serious runners and casual walkers alike - every step helps promote children''s literacy!', '2025-09-20 08:00:00', 'Melbourne', 'City Central Park, Federation Square', 25.00, 10000.00, 7500.00, 2, 2, '/images/fun-run.jpg', 'active'),

('Art for Hope Silent Auction', 'Bid on stunning artworks from renowned local artists.', 'Discover and acquire beautiful pieces while supporting a great cause. Our silent auction features paintings, sculptures, and photographs donated by Australia''s most talented artists. The event includes wine tasting, canapés, and the opportunity to meet the artists. No ticket required - just come and bid!', '2025-11-05 18:30:00', 'Brisbane', 'Downtown Art Gallery, 456 Gallery Lane', 0.00, 15000.00, 2000.00, 3, 2, '/images/art-auction.jpg', 'active'),

('Rock for a Cause Concert', 'An unforgettable night featuring top Australian bands supporting wildlife rescue.', 'Experience the best of Australian music while helping our native animals! This outdoor concert features 6 incredible bands across multiple genres. Bring your picnic blankets and enjoy food trucks, beverage stations, and amazing music. All profits go directly to wildlife rescue and rehabilitation centers across Queensland.', '2024-08-10 20:00:00', 'Gold Coast', 'The River Stage, Broadwater Parklands', 40.00, 20000.00, 22000.00, 4, 3, '/images/rock-concert.jpg', 'active'),

('Beach Cleanup Challenge', 'Join our community effort to clean up South Beach and protect marine life.', 'Roll up your sleeves and make a visible difference! We provide all the equipment - you bring the enthusiasm. This family-friendly event includes educational talks about marine conservation, free lunch for volunteers, and prizes for the most unusual finds. Together we can keep our beaches pristine for wildlife and future generations.', '2025-08-30 09:00:00', 'Perth', 'South Beach, Fremantle', 0.00, 5000.00, 3000.00, 2, 1, '/images/beach-cleanup.jpg', 'active'),

('Classical Music Night', 'An enchanting evening of classical music in support of community health services.', 'Let the timeless beauty of classical music transport you while supporting accessible healthcare. The Melbourne Symphony Orchestra presents a special program featuring works by Australian composers. This elegant evening at the City Concert Hall includes pre-concert drinks and a post-performance reception with the musicians.', '2025-12-12 19:30:00', 'Melbourne', 'City Concert Hall, 789 Arts Precinct', 60.00, 12000.00, 0.00, 4, 4, '/images/classical-night.jpg', 'active'),

('Winter Gala Dinner', 'A formal winter celebration raising funds for ocean research equipment.', 'Embrace the winter season at our spectacular gala dinner featuring celebrity chefs, live entertainment, and a luxury auction. This exclusive event at The Royal Hotel includes a 5-course degustation menu with wine pairing. Dress code: black tie. Limited to 150 guests for an intimate experience.', '2025-06-25 20:00:00', 'Sydney', 'The Royal Hotel, 55 Luxury Boulevard', 200.00, 30000.00, 15000.00, 1, 1, '/images/winter-gala.jpg', 'suspended'),

('Charity Golf Tournament', 'Swing for a cause at our annual golf tournament supporting children''s education.', 'Perfect your swing while making a difference! Our tournament welcomes golfers of all skill levels with individual and team competitions. The day includes green fees, golf cart, lunch, awards ceremony, and plenty of networking opportunities. Corporate sponsorship packages available.', '2025-11-18 07:00:00', 'Adelaide', 'Pebble Creek Golf Club, 321 Fairway Drive', 120.00, 25000.00, 5000.00, 6, 2, '/images/golf-tournament.jpg', 'active'),

('Wildlife Photography Workshop', 'Learn wildlife photography from experts while supporting animal rescue.', 'Join award-winning wildlife photographers for a full-day immersive workshop. Learn composition, lighting, and ethical wildlife photography practices. Includes field sessions with rescued wildlife (under supervision), lunch, and digital take-home materials. All camera skill levels welcome!', '2025-07-22 09:00:00', 'Brisbane', 'Wildlife Sanctuary, 234 Bushland Road', 85.00, 8000.00, 2500.00, 8, 3, '/images/photography-workshop.jpg', 'active'),

('Community Health Fair', 'Free health screenings and wellness activities for the whole family.', 'Our annual health fair brings together healthcare providers, wellness experts, and community organizations. Enjoy free health checks, fitness demonstrations, healthy cooking classes, and children''s activities. Learn about local health resources while having fun! Completely free to attend.', '2025-08-08 10:00:00', 'Perth', 'Community Center, 567 Health Avenue', 0.00, 7000.00, 1000.00, 7, 4, '/images/health-fair.jpg', 'active'),

('Indigenous Art Exhibition', 'Celebrating First Nations artists and supporting cultural preservation.', 'Experience the rich cultural heritage of Australia''s First Peoples through this extraordinary exhibition. Featuring works from emerging and established Indigenous artists, with proceeds supporting indigenous arts education programs. Includes cultural performances and artist talks throughout the week.', '2025-09-30 10:00:00', 'Sydney', 'Cultural Centre, 890 Heritage Way', 15.00, 18000.00, 3000.00, 5, 2, '/images/indigenous-art.jpg', 'active'),

('Coastal Marathon 2025', 'Challenge yourself in this scenic coastal marathon supporting marine conservation.', 'Experience one of Australia''s most breathtaking coastal courses! Choose from full marathon, half marathon, or 10km options. The route features stunning ocean views, coastal trails, and professional timing. All participants receive technical t-shirt, finisher''s medal, and post-race celebration.', '2025-10-25 06:30:00', 'Byron Bay', 'Byron Bay Coastal Path, Lighthouse Road', 75.00, 35000.00, 12000.00, 2, 1, '/images/coastal-marathon.jpg', 'active');


SELECT 'Categories' as Table_Name, COUNT(*) as Count FROM categories
UNION ALL
SELECT 'Organizations', COUNT(*) FROM organizations
UNION ALL
SELECT 'Events', COUNT(*) FROM events;


SELECT 
    e.id,
    e.name as event_name,
    c.name as category,
    o.name as organization,
    e.date,
    e.location,
    e.ticket_price,
    e.status
FROM events e
LEFT JOIN categories c ON e.category_id = c.id
LEFT JOIN organizations o ON e.organization_id = o.id
ORDER BY e.date;