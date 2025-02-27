import { Body, Controller, Get, Headers, Inject, Post } from '@nestjs/common';
import AppointmentsService from './appointments.service';
import AppointmentDTO from './dto/appointmnets.dto';

@Controller('api/appointments')
export default class AppointmentsController {
  constructor(
    @Inject(AppointmentsService)
    private readonly appointmentsService: AppointmentsService,
  ) {}

  @Get('get')
  getAppointments(@Headers('id') id: number) {
    return this.appointmentsService.getAppointments(Number(id));
  }
  @Post('create')
  createAppointment(@Body() formData: any) {
    const appointmentData = {
      patientName: formData.patientName,
      patientEmail: formData.patientEmail,
      disease_id: formData.disease_id,
      hospital_id: formData.hospital_id,
      doctor_id: formData.doctor_id,
      appointment_date: formData.appointment_date,
      appointment_time: formData.appointment_time,
    };
    return this.appointmentsService.createAppointment(
      appointmentData,
      formData.fees,
      formData.paymentMethod,
    );
  }
}
