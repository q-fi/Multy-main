import { Module } from '@nestjs/common';
import { StarService } from './star.service';
import { StarController } from './star.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Star } from './entities/star.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [StarController],
  providers: [StarService],
  imports: [TypeOrmModule.forFeature([Star]), AuthModule],
  exports: [StarService],
})
export class StarModule {
}
