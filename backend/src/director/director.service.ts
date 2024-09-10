import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseService } from 'src/database/database.service';
import { Director } from './entities/director.entity';

@Injectable()
export class DirectorService extends DatabaseService<Director> {
  constructor(
    @InjectRepository(Director)
    protected readonly repository: Repository<Director>,
  ) {
    super(repository);
  }
}
