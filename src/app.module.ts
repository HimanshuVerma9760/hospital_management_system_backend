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
import PatientController from './patients/patient.controller';
import PatientService from './patients/patient.service';
import Specialization from './Models/specialization.model';
import Disease from './Models/disease.model';
import AppointmentsController from './appointments/appointments.controller';
import AppointmentsService from './appointments/appointments.service';
import { Appointment } from './Models/appointment.model';
import { Order } from './Models/order.model';
import OrdersController from './orders/orders.controller';
import OrdersService from './orders/orders.service';
import { PaymentController } from './payments/payment.controller';
import PaymentService from './payments/payment.service';
import { WebHookController } from './payments/Webhook/webhook.controller';
import WebhookService from './payments/Webhook/webhook.service';
import Forms from './Models/forms.model';
import FormInputs from './Models/formInput.model';
import FormController from './forms/form.controller';
import FormService from './forms/form.service';
import { MulterModule } from '@nestjs/platform-express';
import UserController from './user/user.controller';
import UserService from './user/user.service';
import MedicineController from './medicines/medicine.controller';
import MedicineService from './medicines/medicine.service';
import Medicines from './Models/medicine.model';
import Prescriptions from './Models/prescription.model';
import PrescriptionsController from './prescription/prescription.controller';
import PrescriptionsService from './prescription/prescription.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
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
        Specialization,
        RoleHasModule,
        Disease,
        Appointment,
        Order,
        Forms,
        FormInputs,
        Medicines,
        Prescriptions,
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
      Specialization,
      Disease,
      Appointment,
      Order,
      Forms,
      FormInputs,
      Medicines,
      Prescriptions,
    ]),
  ],
  controllers: [
    AppController,
    DoctorController,
    HospitalController,
    PatientController,
    AppointmentsController,
    OrdersController,
    PaymentController,
    WebHookController,
    FormController,
    UserController,
    MedicineController,
    PrescriptionsController,
  ],
  providers: [
    AppService,
    DoctorService,
    HospitalService,
    PatientService,
    AppointmentsService,
    OrdersService,
    PaymentService,
    WebhookService,
    FormService,
    UserService,
    MedicineService,
    PrescriptionsService,
  ],
})
export class AppModule {}
