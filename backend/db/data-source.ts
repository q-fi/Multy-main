import { ConfigService } from '@nestjs/config';
import { Director } from 'src/director/entities/director.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import { Star } from 'src/star/entities/star.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();


const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Movie, Star, User, Director],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
});

export default AppDataSource;