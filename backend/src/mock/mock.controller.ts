import { Controller, Post, UseGuards } from '@nestjs/common';
import { MockService } from './mock.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Role } from 'src/auth/role.decorator';
import { RoleName } from 'src/user/entities/user.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
@ApiTags('mock')
@Controller('mock')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  @Role(RoleName.ADMIN)
  @Post()
  create() {
    return this.mockService.createMockupData();
  }
}
