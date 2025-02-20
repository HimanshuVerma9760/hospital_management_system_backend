import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './Models/user.model';
import Role from './Models/role.model';
import { State } from './Models/state.model';
import Permission from './Models/permission.model';
import { Modules } from './Models/module.model';
import Hospital from './Models/hospital.model';
import City from './Models/city.model';
import Doctor from './Models/doctor.model';
import Patient from './Models/patient.model';
import { ConfigModule } from '@nestjs/config';
import RoleHasPermission from './Models/rolesHasPermissions.model';
import RoleHasModule from './Models/roleHasModules.model';
import { DoctorController } from './doctor/doctor.controller';
import { DoctorService } from './doctor/doctor.service';
import { HospitalController } from './hospital/hospital.controller';
import { HospitalService } from './hospital/hospital.service';
import SuperAdminController from './super-admin/superAdmin.controller';
import SuperAdminService from './super-admin/superAdmin.service';
import AdminController from './admin/admin.controller';
import AdminService from './admin/admin.service';
import PatientController from './patients/patient.controller';
import PatientService from './patients/patient.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      // port: 3306,
      username: 'Himanshu9760',
      password: 'Himanshu2512@35412879',
      database: 'hospital_management_system',
      models: [
        User,
        Role,
        State,
        City,
        Permission,
        Modules,
        Hospital,
        Doctor,
        Patient,
        RoleHasPermission,
        RoleHasModule,
      ],
      autoLoadModels: true,
      synchronize: false,
    }),
    SequelizeModule.forFeature([
      User,
      Role,
      State,
      City,
      Permission,
      Modules,
      Hospital,
      Doctor,
      Patient,
      RoleHasPermission,
      RoleHasModule,
    ]),
  ],
  controllers: [
    AppController,
    DoctorController,
    HospitalController,
    SuperAdminController,
    AdminController,
    PatientController,
  ],
  providers: [
    AppService,
    DoctorService,
    HospitalService,
    SuperAdminService,
    AdminService,
    PatientService,
  ],
})
export class AppModule {}
