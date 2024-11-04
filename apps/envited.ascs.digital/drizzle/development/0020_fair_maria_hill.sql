CREATE TABLE IF NOT EXISTS "tokenAttributes" (
	"token_id" uuid,
	"name" text NOT NULL,
	"value" text NOT NULL,
	CONSTRAINT "tokenAttributes_token_id_name_pk" PRIMARY KEY("token_id","name")
);
