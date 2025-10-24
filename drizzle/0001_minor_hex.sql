CREATE TABLE `boroughs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`averageRent` int NOT NULL,
	`rating` int NOT NULL DEFAULT 40,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `boroughs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50),
	`interestedIn` enum('Renting','Buying','Selling','Investing') NOT NULL,
	`preferredBoroughId` int,
	`budget` int,
	`message` text,
	`status` enum('new','contacted','converted','closed') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `properties` (
	`id` int AUTO_INCREMENT NOT NULL,
	`boroughId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`bedrooms` int NOT NULL,
	`price` int NOT NULL,
	`imageUrl` text,
	`featured` boolean NOT NULL DEFAULT false,
	`available` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `properties_id` PRIMARY KEY(`id`)
);
