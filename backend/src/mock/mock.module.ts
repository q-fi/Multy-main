import { Module } from '@nestjs/common';
import { MockService } from './mock.service';
import { MockController } from './mock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/movie/entities/movie.entity';
import { Director } from 'src/director/entities/director.entity';
import { Star } from 'src/star/entities/star.entity';
import { User } from 'src/user/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [MockController],
  providers: [MockService],
  imports: [
    TypeOrmModule.forFeature([Movie, Director, Star, User]),
    AuthModule,
  ],
})
export class MockModule {}
