CREATE TABLE `npm_packages` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(30) NOT NULL,
	`description` varchar(100),
	`version` int,
	`lastUpdated` date,
	`repo_url` varchar(100),
	`project_part_id` int
);
--> statement-breakpoint
CREATE TABLE `project_parts` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(30) NOT NULL,
	`project_id` int
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(30) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`username` varchar(20) NOT NULL,
	`password` varchar(20) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users_to_projects` (
	`user_id` int NOT NULL,
	`project_id` int NOT NULL,
	CONSTRAINT `users_to_projects_project_id_user_id` PRIMARY KEY(`project_id`,`user_id`)
);
--> statement-breakpoint
ALTER TABLE `users_to_projects` ADD CONSTRAINT `users_to_projects_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users_to_projects` ADD CONSTRAINT `users_to_projects_project_id_projects_id_fk` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE no action ON UPDATE no action;