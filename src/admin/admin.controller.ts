import { Body, Controller, Inject, Post } from '@nestjs/common';
// import AdminLoginDTO from './dto/admin.dto';
import AdminService from './admin.service';

@Controller('/api/admin')
export default class AdminController {
  constructor(
    @Inject(AdminService) private readonly adminService: AdminService,
  ) {}

  @Post('/login')
  login() {
    return this.adminService;
  }
}
