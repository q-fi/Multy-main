import { MigrationInterface, QueryRunner } from 'typeorm';

export class Mig1715274275028 implements MigrationInterface {
  name = 'Mig1715274275028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.startTransaction();
      await queryRunner.query(`
      CREATE OR REPLACE PROCEDURE get_movie_count()
      LANGUAGE plpgsql
      AS $$
      DECLARE
        total_count INT;
      BEGIN
        SELECT COUNT(*) INTO total_count FROM "movie";
        RAISE NOTICE 'Total movies: %', total_count;
      END;
      $$;
    `);
      await queryRunner.query(`
    CREATE OR REPLACE FUNCTION movie_procedure()
    RETURNS VOID AS $$
    DECLARE
      mov_cur CURSOR FOR
      SELECT id, name
      FROM "movie";
    BEGIN
      OPEN mov_cur;
      CLOSE mov_cur;
    END;
    $$ LANGUAGE plpgsql;
  `);
      await queryRunner.query(`
    CREATE OR REPLACE FUNCTION movie_trigger_function()
    RETURNS TRIGGER AS $$
    BEGIN

      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER movie_trigger
    BEFORE INSERT OR UPDATE ON "movie"
    FOR EACH ROW
    EXECUTE FUNCTION movie_trigger_function();
  `);
      await queryRunner.query(`
  CREATE INDEX "IDX_MovTitleRating" ON "movie" ("title","rating");
  CLUSTER "movie" USING "IDX_MovTitleRating";
`);
      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP PROCEDURE IF EXISTS get_movie_count`);
    await queryRunner.query(`
    DROP TRIGGER IF EXISTS movie_trigger ON "movie";
    DROP FUNCTION IF EXISTS movie_trigger_function;
  `);
    await queryRunner.query(`DROP FUNCTION IF EXISTS movie_procedure();`);
    await queryRunner.query(`
        DROP INDEX "IDX_MovTitleRating";
      `);
  }
}
