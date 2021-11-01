BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "students" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	"code"	text,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "registrations" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	"user_id"	integer,
	PRIMARY KEY("id"),
	CONSTRAINT "fk_students_registration" FOREIGN KEY("user_id") REFERENCES "students"("id")
);
CREATE TABLE IF NOT EXISTS "places" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	"user_id"	integer,
	PRIMARY KEY("id"),
	CONSTRAINT "fk_students_place" FOREIGN KEY("user_id") REFERENCES "students"("id")
);
CREATE TABLE IF NOT EXISTS "payments" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "bills" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"watched_time"	datetime,
	"payment_id"	integer,
	"registration_id"	integer,
	"place_id"	integer,
	PRIMARY KEY("id"),
	CONSTRAINT "fk_payments_bill" FOREIGN KEY("payment_id") REFERENCES "payments"("id"),
	CONSTRAINT "fk_registrations_bill" FOREIGN KEY("registration_id") REFERENCES "registrations"("id"),
	CONSTRAINT "fk_places_bill" FOREIGN KEY("place_id") REFERENCES "places"("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "idx_students_code" ON "students" (
	"code"
);
CREATE INDEX IF NOT EXISTS "idx_students_deleted_at" ON "students" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_registrations_deleted_at" ON "registrations" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_places_deleted_at" ON "places" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_payments_deleted_at" ON "payments" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_bills_deleted_at" ON "bills" (
	"deleted_at"
);
COMMIT;
