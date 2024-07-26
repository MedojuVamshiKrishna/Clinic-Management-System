import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatsService } from '../../services/stats.service';
import {Chart,registerables} from '../../../../node_modules/chart.js'
import { app } from '../../../../server';

Chart.register(...registerables)
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

  lineGraph :any[] | undefined;

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
        const dates= this.getCurrentWeekDates();
        console.log('dddddddddd',dates)
    
        this.stats.linegraph1(dates).subscribe(
          (resp:any)=>{
            console.log("line graph", resp)
            this.lineGraph=resp
            this.processBookings();

        this.renderChart();
            
          },err=>{
            console.log(err)
          }
        )
        

        console.log('dsssdsdsdsdsds',this.doctorNames,this.appointmentCounts)
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

  ngOnInit(): void {

    
    
    
  }

  getCurrentWeekDates() {
    const weekDates: string[] = [];
    
    const today = new Date();
    const dayOfWeek = today.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
    
    // Calculate the start of the week (Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0);
    
    // Generate dates for the entire week (Sunday to Saturday)
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(this.formatDateToSQL(date));
    }
    // console.log(weekDates)
    return weekDates;
    
    
  }

  private formatDateToSQL(date: Date): string {
    // Format date to 'YYYY-MM-DD' for SQL
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  renderChart(){

    console.log('herooooo',this.doctorNames,this.appointmentCounts)

    const gg = this.lineGraph

   
    new Chart("barchart", {
      type: 'bar',
      data: {
        labels: this.doctorNames,
        datasets: [{
          label: 'no of patients consulted',
          data: this.appointmentCounts,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart("doughnutchart", {
      type: 'pie',
      data: {
        labels: this.doctorNames,
        datasets: [{
          label: 'no of patients consulted',
          data: this.appointmentCounts,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });


    new Chart("linechart", {
      type: 'line',
      data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'],
        datasets: [{
          label: 'no of Bookings',
          data: gg,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });


  }
}
