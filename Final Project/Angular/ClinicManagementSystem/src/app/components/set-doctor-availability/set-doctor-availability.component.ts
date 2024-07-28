import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginServiceService } from '../../services/login-service.service';
import { GetdoctorbyemailService } from '../../services/getdoctorbyemail.service';
import { SetavailabilityService } from '../../services/setavailability.service';
import { GetavailabilitiesService } from '../../services/getavailabilities.service';

@Component({
  selector: 'app-set-doctor-availability',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './set-doctor-availability.component.html',
  styleUrls: ['./set-doctor-availability.component.css']
})
export class SetDoctorAvailabilityComponent {
  days: (Date | null)[] = [];
  dateStatus: { [key: string]: boolean } = {};
  selectedDates: string[] = [];
  currentMonth: number;
  currentYear: number;
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  email: any;
  id: any;
  name: any;
  specialisation: any;
  data: {
    date: string;
    reportingTime: string;
    departureTime: string;
    doctor: {
      id: string;
      email: string;
      name: string;
      specialisation: string;
    };
  }[] = [];

  availability: string[] = [];

  constructor(
    private loginservice: LoginServiceService,
    private getdoctorbyemail: GetdoctorbyemailService,
    private setavailability: SetavailabilityService,
    private getavailability: GetavailabilitiesService
  ) {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    if (this.loginservice.isLoggedIn()) {
      this.email = this.loginservice.getUser();
    }
    this.getdoctorbyemail.getDoctorByEmail(this.email).subscribe(
      (resp: any) => {
        console.log(resp);
        this.id = resp.id;
        this.name = resp.name;
        this.specialisation = resp.specialisation;
        this.getavailability.getAvailabilities(resp.id).subscribe(
          (respp: any) => {
            console.log('heroooooooooo avails', respp);
            this.availability = respp.map((avail: any) => avail.date); // Store dates as yyyy-mm-dd
          },
          errr => {
            console.log(errr);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.generateDays(this.currentMonth, this.currentYear);
  }

  generateDays(month: number, year: number): void {
    this.days = [];
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);

    // Fill the days array with null for empty slots before the first day of the month
    for (let i = 0; i < start.getDay(); i++) {
      this.days.push(null);
    }

    // Fill the days array with actual dates for the current month
    for (let day = start.getDate(); day <= end.getDate(); day++) {
      this.days.push(new Date(year, month, day));
    }

    // Fill the rest of the days array with null for empty slots after the last day of the month
    const remainingSlots = 7 - (this.days.length % 7);
    if (remainingSlots < 7) {
      for (let i = 0; i < remainingSlots; i++) {
        this.days.push(null);
      }
    }
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateDays(this.currentMonth, this.currentYear);
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateDays(this.currentMonth, this.currentYear);
  }

  toggleDate(date: Date): void {
    const today = new Date();
    if (date.getTime() < today.setHours(0, 0, 0, 0) || this.isAvailabilityDate(date)) {
      return; // Prevent toggling past dates or availability dates
    }

    const dateString = date.toDateString();
    if (this.dateStatus[dateString]) {
      delete this.dateStatus[dateString];
      this.selectedDates = this.selectedDates.filter(d => d !== dateString);
    } else {
      this.dateStatus[dateString] = true;
      this.selectedDates.push(dateString);
    }
  }

  isSelected(date: Date): boolean {
    // const adjustedDate = new Date(date);
    // adjustedDate.setDate(adjustedDate.getDate() - 1);
    // return !!this.dateStatus[adjustedDate.toDateString()];
    return !!this.dateStatus[date.toDateString()];
  }

  isPastDate(date: Date): boolean {
    const today = new Date();
    return date.getTime() < today.setHours(0, 0, 0, 0);
  }

  isAvailabilityDate(date: Date): boolean {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() +1);
    const formattedDate = newDate.toISOString().split('T')[0];
    return this.availability.includes(formattedDate);
  }
  

  submit(): void {
    const selectedDatesObject = this.selectedDates.reduce((acc, date) => {
      const formattedDate = new Date(date);
      formattedDate.setDate(formattedDate.getDate()); // Correct the day without incrementing
      acc[formattedDate.toISOString().split('T')[0]] = this.dateStatus[date];
      return acc;
    }, {} as { [key: string]: boolean });

    console.log('Selected Dates:', selectedDatesObject);

    this.data = this.selectedDates.map(date => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate()+1); // Correct the day without incrementing
      return {
        date: newDate.toISOString().split('T')[0], // Format as yyyy-mm-dd
        reportingTime: '09:00:00',
        departureTime: '18:00:00',
        doctor: {
          id: this.id,
          email: this.email,
          name: this.name,
          specialisation: this.specialisation
        }
      };
    });

    this.setavailability.setavailability(this.data).subscribe(
      (resp: any) => {
        console.log(resp);
      },
      err => {
        console.log(err);
      }
    );

    location.reload()
  }
}
