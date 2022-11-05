BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "tags_list" (
	"id"	INTEGER,
	"tag"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "locations" (
	"id"	INTEGER,
	"longitude"	REAL NOT NULL,
	"latitude"	REAL NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "visibility" (
	"id"	INTEGER,
	"type"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "pin_colors" (
	"id"	INTEGER,
	"color"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "events" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"description"	TEXT,
	"date"	INTEGER NOT NULL,
	"location_id"	INTEGER NOT NULL,
	"pin_color_id"	INTEGER NOT NULL,
	"visibility"	INTEGER NOT NULL,
	FOREIGN KEY("visibility") REFERENCES "visibility"("id"),
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("pin_color_id") REFERENCES "pin_colors"("id"),
	FOREIGN KEY("location_id") REFERENCES "locations"("id")
);
CREATE TABLE IF NOT EXISTS "tags" (
	"event_id"	INTEGER NOT NULL,
	"tag_id"	INTEGER NOT NULL,
	FOREIGN KEY("event_id") REFERENCES "events"("id"),
	FOREIGN KEY("tag_id") REFERENCES "tags_list"("id")
);
CREATE TABLE IF NOT EXISTS "participations" (
	"user_id"	INTEGER NOT NULL,
	"event_id"	INTEGER NOT NULL,
	FOREIGN KEY("event_id") REFERENCES "events"("id"),
	FOREIGN KEY("user_id") REFERENCES "users"("id")
);
CREATE TABLE IF NOT EXISTS "users" (
	"id"	INTEGER,
	"username"	TEXT NOT NULL,
	"password"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "locations" VALUES (1,16.9251681,52.406374);
INSERT INTO "visibility" VALUES (1,'public');
INSERT INTO "pin_colors" VALUES (1,'255,0,255');
INSERT INTO "events" VALUES (1,'First pin!',NULL,1667614351,1,1,1);
COMMIT;
