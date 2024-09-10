import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1715346464381 implements MigrationInterface {
    name = 'Mig1715273865183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "star" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fullname" character varying NOT NULL, "hasOscar" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_776e4e36c65e3bd4f0aa5317c5f" UNIQUE ("fullname"), CONSTRAINT "PK_e0a31656542918b9e028c3b9f5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_roles_enum" AS ENUM('sudo', 'admin', 'user', 'moderator')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, "hashedPassword" character varying NOT NULL, "isActivated" boolean NOT NULL DEFAULT false, "isBanned" boolean NOT NULL DEFAULT false, "roles" "public"."user_roles_enum" array NOT NULL DEFAULT '{user}', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."movie_genres_enum" AS ENUM('Action', 'Drama', 'Crime', 'Comedy', 'Horror', 'Romance', 'Science Fiction', 'Thriller', 'Fantasy', 'Adventure', 'Animation', 'Documentary', 'Sci-Fi')`);
        await queryRunner.query(`CREATE TYPE "public"."movie_pegi_enum" AS ENUM('3', '7', '12', '13', '16', '18')`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "genres" "public"."movie_genres_enum" array NOT NULL, "description" character varying, "rating" integer NOT NULL, "pegi" "public"."movie_pegi_enum" NOT NULL DEFAULT '18', "duration" TIME, "year" integer, "imageUrl" character varying NOT NULL, "hasOscar" boolean NOT NULL DEFAULT false, "directorId" uuid, CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title"), CONSTRAINT "CHK_c7aedeccc47939e904ca1a8669" CHECK ("rating" >= 0 and rating <= 100), CONSTRAINT "CHK_46d855c586f1d7ba9339dbc5ca" CHECK (duration >= '00:00:00' AND duration <= '24:00:00'), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "director" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fullname" character varying NOT NULL, CONSTRAINT "UQ_d69ac5ccc7960605cbcbefe5f95" UNIQUE ("fullname"), CONSTRAINT "PK_b85b179882f31c43324ef124fea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_star" ("star_id" uuid NOT NULL, "movie_id" uuid NOT NULL, CONSTRAINT "PK_944f26e81ff9129d95995f6a1b8" PRIMARY KEY ("star_id", "movie_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1837cc2c58de268861093ccf48" ON "movie_star" ("star_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d10b520eed560658628d9b3852" ON "movie_star" ("movie_id") `);
        await queryRunner.query(`CREATE TABLE "user_favourite_movie" ("user_id" uuid NOT NULL, "movie_id" uuid NOT NULL, CONSTRAINT "PK_eb9a54f013e674b1e78f1a45d42" PRIMARY KEY ("user_id", "movie_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e105ca9647960a4b71fdf35989" ON "user_favourite_movie" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7e3eb59020a773b22b8790c5c9" ON "user_favourite_movie" ("movie_id") `);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_a32a80a88aff67851cf5b75d1cb" FOREIGN KEY ("directorId") REFERENCES "director"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_star" ADD CONSTRAINT "FK_1837cc2c58de268861093ccf48b" FOREIGN KEY ("star_id") REFERENCES "star"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_star" ADD CONSTRAINT "FK_d10b520eed560658628d9b38526" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_favourite_movie" ADD CONSTRAINT "FK_e105ca9647960a4b71fdf359894" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_favourite_movie" ADD CONSTRAINT "FK_7e3eb59020a773b22b8790c5c94" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_favourite_movie" DROP CONSTRAINT "FK_7e3eb59020a773b22b8790c5c94"`);
        await queryRunner.query(`ALTER TABLE "user_favourite_movie" DROP CONSTRAINT "FK_e105ca9647960a4b71fdf359894"`);
        await queryRunner.query(`ALTER TABLE "movie_star" DROP CONSTRAINT "FK_d10b520eed560658628d9b38526"`);
        await queryRunner.query(`ALTER TABLE "movie_star" DROP CONSTRAINT "FK_1837cc2c58de268861093ccf48b"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_a32a80a88aff67851cf5b75d1cb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7e3eb59020a773b22b8790c5c9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e105ca9647960a4b71fdf35989"`);
        await queryRunner.query(`DROP TABLE "user_favourite_movie"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d10b520eed560658628d9b3852"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1837cc2c58de268861093ccf48"`);
        await queryRunner.query(`DROP TABLE "movie_star"`);
        await queryRunner.query(`DROP TABLE "director"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TYPE "public"."movie_pegi_enum"`);
        await queryRunner.query(`DROP TYPE "public"."movie_genres_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_roles_enum"`);
        await queryRunner.query(`DROP TABLE "star"`);
    }

}
