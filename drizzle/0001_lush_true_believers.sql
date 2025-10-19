CREATE TABLE `affiliatePartners` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`category` varchar(100) NOT NULL,
	`affiliateUrl` varchar(500) NOT NULL,
	`commissionRate` int NOT NULL,
	`description` text,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `affiliatePartners_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `analytics` (
	`id` varchar(64) NOT NULL,
	`eventType` varchar(50) NOT NULL,
	`propertyId` varchar(64),
	`userId` varchar(64),
	`source` varchar(100),
	`metadata` text,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `analytics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`interestedIn` enum('buy','sell','rent') NOT NULL,
	`borough` varchar(100),
	`budget` int,
	`message` text,
	`source` varchar(100),
	`status` enum('new','contacted','qualified','converted') DEFAULT 'new',
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `premiumListings` (
	`id` varchar(64) NOT NULL,
	`propertyId` varchar(64) NOT NULL,
	`agentId` varchar(64) NOT NULL,
	`packageType` enum('basic','featured','premium') NOT NULL,
	`price` int NOT NULL,
	`durationDays` int NOT NULL,
	`startDate` timestamp DEFAULT (now()),
	`endDate` timestamp,
	`status` enum('active','expired','cancelled') DEFAULT 'active',
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `premiumListings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `properties` (
	`id` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`borough` varchar(100) NOT NULL,
	`address` varchar(255) NOT NULL,
	`propertyType` enum('studio','1bed','2bed','3bed','4bed','5bed+') NOT NULL,
	`rentPrice` int NOT NULL,
	`bedrooms` int,
	`bathrooms` int,
	`squareFeet` int,
	`imageUrl` varchar(500),
	`agentId` varchar(64),
	`agentName` varchar(255),
	`agentEmail` varchar(320),
	`agentPhone` varchar(20),
	`isPremiumListing` boolean DEFAULT false,
	`premiumExpiresAt` timestamp,
	`status` enum('active','rented','expired') DEFAULT 'active',
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `properties_id` PRIMARY KEY(`id`)
);
