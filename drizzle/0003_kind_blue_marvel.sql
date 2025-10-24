CREATE TABLE `guides` (
	`id` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`borough` varchar(100),
	`category` varchar(100) NOT NULL,
	`content` text NOT NULL,
	`excerpt` varchar(500),
	`imageUrl` varchar(500),
	`sections` text,
	`seoTitle` varchar(255),
	`seoDescription` varchar(500),
	`keywords` text,
	`views` int DEFAULT 0,
	`isPublished` boolean DEFAULT false,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `guides_id` PRIMARY KEY(`id`),
	CONSTRAINT `guides_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `investmentAnalysis` (
	`id` varchar(64) NOT NULL,
	`borough` varchar(100) NOT NULL,
	`averageRent` int,
	`averagePropertyPrice` int,
	`rentYield` int,
	`capitalGrowth` int,
	`demandLevel` enum('low','medium','high','very_high'),
	`priceGrowth` int,
	`investmentScore` int,
	`bestFor` text,
	`pros` text,
	`cons` text,
	`futureOutlook` varchar(255),
	`lastUpdated` timestamp DEFAULT (now()),
	CONSTRAINT `investmentAnalysis_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` varchar(64) NOT NULL,
	`propertyId` varchar(64),
	`boroughName` varchar(100),
	`userId` varchar(64),
	`userName` varchar(255) NOT NULL,
	`rating` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`categories` text,
	`helpful` int DEFAULT 0,
	`unhelpful` int DEFAULT 0,
	`isVerified` boolean DEFAULT false,
	`status` enum('pending','approved','rejected') DEFAULT 'pending',
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `searchAlerts` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`borough` varchar(100),
	`minPrice` int,
	`maxPrice` int,
	`bedrooms` int,
	`propertyType` varchar(50),
	`keywords` text,
	`notificationEmail` boolean DEFAULT true,
	`notificationWhatsApp` boolean DEFAULT false,
	`whatsAppNumber` varchar(20),
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `searchAlerts_id` PRIMARY KEY(`id`)
);
