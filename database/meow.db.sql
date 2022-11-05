BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "tags_list" (
	"id"	INTEGER,
	"tag"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "visibility" (
	"id"	INTEGER,
	"type"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "tags" (
	"pin_id"	INTEGER NOT NULL,
	"tag_id"	INTEGER NOT NULL,
	FOREIGN KEY("tag_id") REFERENCES "tags_list"("id"),
	FOREIGN KEY("pin_id") REFERENCES "pins"("id")
);
CREATE TABLE IF NOT EXISTS "participations" (
	"user_id"	INTEGER NOT NULL,
	"pin_id"	INTEGER NOT NULL,
	FOREIGN KEY("user_id") REFERENCES "users"("id"),
	FOREIGN KEY("pin_id") REFERENCES "pins"("id")
);
CREATE TABLE IF NOT EXISTS "users" (
	"id"	INTEGER,
	"username"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "friendships" (
	"sender"	INTEGER NOT NULL,
	"receiver"	INTEGER NOT NULL,
	"invited"	INTEGER DEFAULT 0,
	FOREIGN KEY("sender") REFERENCES "users"("id"),
	FOREIGN KEY("receiver") REFERENCES "users"("id")
);
CREATE TABLE IF NOT EXISTS "pins" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"description"	TEXT,
	"longitude"	REAL NOT NULL,
	"latitude"	REAL NOT NULL,
	"date_start"	INTEGER,
	"date_end"	INTEGER,
	"pin_color_id"	INTEGER NOT NULL,
	"visibility"	INTEGER NOT NULL,
	"max_participients"	INTEGER DEFAULT 0,
	FOREIGN KEY("pin_color_id") REFERENCES "pin_colors"("id"),
	FOREIGN KEY("visibility") REFERENCES "visibility"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "pin_colors" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"r"	INTEGER NOT NULL,
	"g"	INTEGER NOT NULL,
	"b"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "tags_list" VALUES (1,'sport');
INSERT INTO "tags_list" VALUES (2,'concert');
INSERT INTO "tags_list" VALUES (3,'education');
INSERT INTO "tags_list" VALUES (4,'programming');
INSERT INTO "tags_list" VALUES (5,'races');
INSERT INTO "tags_list" VALUES (6,'language tandem');
INSERT INTO "tags_list" VALUES (7,'food');
INSERT INTO "tags_list" VALUES (8,'charity');
INSERT INTO "tags_list" VALUES (9,'gaming');
INSERT INTO "tags_list" VALUES (10,'party');
INSERT INTO "tags_list" VALUES (11,'animals');
INSERT INTO "visibility" VALUES (1,'public');
INSERT INTO "visibility" VALUES (2,'friends');
INSERT INTO "visibility" VALUES (3,'private');
INSERT INTO "tags" VALUES (1,3);
INSERT INTO "tags" VALUES (1,7);
INSERT INTO "tags" VALUES (2,1);
INSERT INTO "tags" VALUES (2,5);
INSERT INTO "users" VALUES (1,'Kaczka Basia');
INSERT INTO "users" VALUES (2,'Kaczka Krysia');
INSERT INTO "friendships" VALUES (1,2,0);
INSERT INTO "pins" VALUES (1,'First pin!',NULL,16.9251681,52.406374,1667614351,1667614352,3,1,5);
INSERT INTO "pins" VALUES (2,'Second one omg!',NULL,15.9251681,51.406374,NULL,NULL,5,1,0);
INSERT INTO "pin_colors" VALUES (1,'Lawenderito',165,137,193);
INSERT INTO "pin_colors" VALUES (2,'Sea Breath',111,183,214);
INSERT INTO "pin_colors" VALUES (3,'Pinktido',249,140,182);
INSERT INTO "pin_colors" VALUES (4,'Leaf Power',133,202,93);
INSERT INTO "pin_colors" VALUES (5,'Sunny Day',255,237,81);
INSERT INTO "pin_colors" VALUES (6,'Dirty White',240,232,205);
INSERT INTO "pin_colors" VALUES (7,'Salomon',252,169,133);
COMMIT;
