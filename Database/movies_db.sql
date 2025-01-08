-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2025 at 04:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movies_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(350) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `image`) VALUES
(1, 'Joker 2025', 'Psychological thriller and musical directed by Todd Phillips, following Arthur Fleck’s transformation into the infamous Joker.', 'https://upload.wikimedia.org/wikipedia/ro/f/f9/Manwholaughs.jpg'),
(2, 'The Nightmare Before Christmas', 'Jack Skellington discovers Christmas Town and brings the holiday to Halloween Town in this charming stop-motion animation.', 'https://brantleybanner.com/wp-content/uploads/2020/11/The-Nightmare-Before-Christmas-900x600.jpg'),
(3, 'Howls Moving Castle', 'A young woman, transformed into an old woman, finds refuge in a magical moving castle in this enchanting fantasy.', 'https://www.mediaplaynews.com/wp-content/uploads/2020/02/Howls-Moving-Castle-action-shot.jpg'),
(4, 'Rick and Morty new season', 'An eccentric scientist and his anxious grandson travel through dimensions in this animated sci-fi series filled with absurd adventures.', 'https://m.media-amazon.com/images/S/pv-target-images/3f8ae4a13de932bc679af5272ce983693d773818ff67a774dfcf0592bcd3beb7._SX1080_FMjpg_.jpg'),
(5, 'My Neighbor Totoro', 'Two sisters befriend a magical creature named Totoro in rural Japan in this heartwarming tale of childhood wonder.', 'https://m.media-amazon.com/images/M/MV5BMTUyODI0ODA1NV5BMl5BanBnXkFtZTgwNTA2MDIyMDE@._V1_.jpg'),
(6, 'Spirited Away', 'A young girl navigates a strange world full of spirits and mythical creatures in this mesmerizing tale.', 'https://images.squarespace-cdn.com/content/v1/5aadc5f989c172c908ab3864/bd83924e-ae77-462e-b91e-38af86920975/Sprited+Away+2.png'),
(7, 'The Dark Knight', 'Batman faces the Joker, who seeks to plunge Gotham into chaos in this gritty crime thriller.', 'https://i.ytimg.com/vi/pw5qO0TbhUw/maxresdefault.jpg'),
(8, 'The Matrix', 'A hacker uncovers the shocking truth that the world is an illusion created by machines in this groundbreaking sci-fi thriller.', 'https://images.bauerhosting.com/legacy/empire-tmdb/films/603/images/7u3pxc0K1wx32IleAkLv78MKgrw.jpg?ar=16%3A9&fit=crop&crop=top&auto=format&w=1440&q=80'),
(9, 'Pulp Fiction', 'A series of interconnected crime stories told in a non-linear narrative, blending dark humor and violence.', 'https://c4.wallpaperflare.com/wallpaper/977/390/342/movie-pulp-fiction-wallpaper-preview.jpg'),
(10, 'The Shawshank Redemption', 'A man struggles to survive in prison, forming a life-changing bond with a fellow inmate in this powerful tale of hope and friendship.', 'https://m.media-amazon.com/images/M/MV5BNTYxOTYyMzE3NV5BMl5BanBnXkFtZTcwOTMxNDY3Mw@@._V1_.jpg'),
(11, 'Fight Club', 'An underground fight club sparks a rebellion against consumerism in this provocative exploration of identity and societal discontent.', 'https://panthernow.com/wp-content/uploads/IMG_2005-777x437.jpeg'),
(12, 'The Grinch', 'The story of the mischievous Grinch who plans to ruin Christmas for the Whos in Whoville, only to learn about the true spirit of the holiday.', 'https://canonjjohn.com/wp-content/uploads/2022/12/ChristmasMovie_Grinch_Blog.jpg'),
(13, 'Blade Runner 2049', 'In a dystopian future, a blade runner uncovers a secret that could change society in this visually stunning sequel.', 'https://cdn.arstechnica.net/wp-content/uploads/2017/10/bladerunner2049-poster.jpg'),
(14, 'The Lion King', 'Simba must reclaim his place as king of the jungle in this heartwarming and iconic tale of courage and redemption.', 'https://www.dca.org.uk/images/uploads/bf671cf830623792bb6eac13d2522698.jpeg'),
(15, 'Gladiator', 'A betrayed general seeks vengeance in the gladiatorial arenas of ancient Rome in this epic story of honor and justice.', 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/07/gladiator-2-russell.jpg'),
(16, 'Star Wars: A New Hope', 'Luke Skywalker joins the fight against the Empire in this iconic beginning of the Star Wars saga.', 'https://ew.com/thmb/qeJjQEgbFJCsTYR4KaaHUB6fgnc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/EW_StarWars_100-1-3e44e87aa604405eac533ba3b8cc85c2.jpg'),
(17, 'Galactic Alliance Updates', 'Stay informed on the latest political changes and updates from the Galactic Alliance.', 'https://images.tbs.com/tbs/$dyna_params/https%3A%2F%2Fi.cdn.tbs.com%2Fassets%2Fimages%2F2021%2F11%2FStarWarsIX-1600x900.jpg'),
(18, 'New Starfighter Designs', 'Explore the cutting-edge technology behind the latest starfighter designs in this detailed look at future interstellar combat.', 'https://www.lego.com/cdn/cs/set/assets/blt61f41323e3712d9c/02_StarWars-About_Hero-Tall_Desktop.jpg?fit=crop&format=jpg&quality=80&width=1600&height=700&dpr=1'),
(19, 'Jedi Academy Openings', 'Aspiring Jedi can now apply for training at the Jedi Academy, learning the ways of the Force from the masters.', 'https://outsmarted.com/cdn/shop/files/Star_wars.jpg?v=1723497533'),
(20, 'New Star Wars Celebration Japan 2025 Badge Art', 'Preview exclusive badge art for the 2025 Star Wars Celebration in Japan, featuring iconic characters like Darth Vader, Yoda, and more.', 'https://lumiere-a.akamaihd.net/v1/images/image_766ab73a.jpeg?region=193%2C0%2C1080%2C1080');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `ime` varchar(50) NOT NULL,
  `prezime` varchar(50) NOT NULL,
  `korisnicko_ime` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `sifra` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `ime`, `prezime`, `korisnicko_ime`, `email`, `sifra`, `is_admin`) VALUES
(3, 'Danira', 'Dedic', 'Danira', 'daniradedic@hotmail.com', '$2y$10$UCHmlsWhibqj5/meMwN8Be2gqGPs/gzt/V/D3Q0KuGCtfx0fbPeve', 0),
(7, 'Denisa', 'Dedic', 'Denisa_Dedic', 'denisadedic@hotmail.com', '$2y$10$.lOLWNhuFAt81Znr8kYruOEL8AyIX3pqdExFY/QwgebS9716HwQty', 0),
(16, 'Minela', 'Dedic', 'Minela', 'mineladedic@hotmail.com', '123456', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `korisnicko_ime` (`korisnicko_ime`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
