import { Body, Controller, Inject, Post } from '@nestjs/common';
import SuperAdminService from './superAdmin.service';
// import superAdminDTO from './dto/superAdmin.dto';

@Controller('/super-admin')
export default class SuperAdminController {
  constructor(
    @Inject(SuperAdminService)
    private readonly superAdminService: SuperAdminService,
  ) {}
}
