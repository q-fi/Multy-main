import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Star } from './entities/star.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StarService extends DatabaseService<Star> {
    constructor(
        @InjectRepository(Star)
        protected readonly repository: Repository<Star>,
      ) {
        super(repository);
      }
}
