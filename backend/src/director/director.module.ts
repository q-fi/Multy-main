import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { Director } from './entities/director.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [DirectorController],
  exports: [DirectorService],
  providers: [DirectorService],
  imports: [
    TypeOrmModule.forFeature([Director]),
    AuthModule,
  ],
})
export class DirectorModule {
}
