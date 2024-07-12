import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  doctors: any;
  patients: any;
  bookings: any;
  staff: any;
  allBookings: any;

  // Data for the bar chart
  doctorNames: string[] = [];
  appointmentCounts: number[] = [];

  constructor(private stats: StatsService) {
    this.stats.getBookingCount().subscribe(
      (resp: any) => {
        this.bookings = resp;
        console.log('bookings', this.bookings);
      },
      err => {
        console.log(err);
      }
    );

    this.stats.getDoctorsCount().subscribe(
      (resp: any) => {
        this.doctors = resp;
        console.log('doctors', this.doctors);
      },
      err => {
        console.log(err);
      }
    );

    this.stats.getPatientCount().subscribe(
      (resp: any) => {
        this.patients = resp;
        console.log('patients', this.patients);
      },
      err => {
        console.log(err);
      }
    );

    this.stats.getStaffCount().subscribe(
      (resp: any) => {
        this.staff = resp;
        console.log('staff', this.staff);
      },
      err => {
        console.log(err);
      }
    );

    this.stats.getAllbookings().subscribe(
      (resp: any) => {
        this.allBookings = resp;
        console.log('All bookings', this.allBookings);
        this.processBookings();
      },
      err => {
        console.log(err);
      }
    );
  }

  processBookings() {
    const doctorAppointments: { [key: string]: number } = {};

    this.allBookings.forEach((booking: any) => {
      if (booking.appointed) {
        if (!doctorAppointments[booking.doctor]) {
          doctorAppointments[booking.doctor] = 0;
        }
        doctorAppointments[booking.doctor]++;
      }
    });

    this.doctorNames = Object.keys(doctorAppointments);
    this.appointmentCounts = Object.values(doctorAppointments);
  }
}
