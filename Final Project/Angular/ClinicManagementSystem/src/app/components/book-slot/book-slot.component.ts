import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetSlotsService } from '../../services/get-slots.service';
import { ActivatedRoute } from '@angular/router';
import { PatientbookingService } from '../../services/patientbooking.service';
import { ChangeDetectorRef } from '@angular/core';
import { TransactionServiceService } from '../../services/transaction-service.service';

declare var Razorpay: any;

@Component({
  selector: 'app-book-slot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-slot.component.html',
  styleUrls: ['./book-slot.component.css']
})
export class BookSlotComponent {
  weekDays: Date[] = [];
  timeSlots: string[] = [];
  bookings: any = {};
  slotsnotselected = true;
  paymentfailed = false;
  patient: any;
  slots: any[] = [];
  bookedSlots: any[] = [];
  selectedSlot: { day: string, time: string } | null = null;
  patientsBooking = {
    name: "",
    age: "",
    gender: "",
    phone: "",
    weight: "",
    bp: "",
    spo2: "",
    temperature: "",
    symptoms: "",
    doctor: "",
    doctorId: "",
    date: "",
    time: "",
    appointed: false,
    transactionId: "",
    paymentType:""
  };

  constructor(private getslots: GetSlotsService, private route: ActivatedRoute, private setpatientbooking: PatientbookingService, private cdr: ChangeDetectorRef, private transactionServie: TransactionServiceService) {
    this.route.queryParams.subscribe(params => {
      const patientJson = params['formData2'];
      if (patientJson) {
        this.patient = JSON.parse(patientJson);

        this.getslots.getSlots(this.patient.doctorId).subscribe(
          (resp: any) => {
            this.slots = resp;
            this.initializeWeekDays(new Date());
            this.initializeBookings();
          },
          err => {
            console.log(err);
          }
        );

        console.log('retrieved patient data', this.patient);
      }
    });

    this.setpatientbooking.getBookings(this.patient.doctorId).subscribe(
      (resp: any) => {
        this.bookedSlots = resp;
        console.log("selected slots:", this.bookedSlots);
      }, err => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.initializeTimeSlots();
  }

  initializeTimeSlots(): void {
    this.timeSlots = [];
    for (let hour = 9; hour <= 17; hour++) {
      if (hour !== 13) {
        if (hour < 10) {
          this.timeSlots.push(`0${hour}:00`);
        } else {
          this.timeSlots.push(`${hour}:00`);
        }
      }
    }
  }

  initializeWeekDays(startDate: Date): void {
    const startOfWeek = new Date(startDate);
    startOfWeek.setDate(startDate.getDate() - startDate.getDay() + 1); 
    this.weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      this.weekDays.push(day);
    }
  }

  initializeBookings(): void {
    this.bookings = {};
    this.weekDays.forEach(day => {
      const dayKey = this.formatDate(day);
      this.bookings[dayKey] = {};
      this.timeSlots.forEach(slot => {
        const slotAvailable = this.slots.some((s: any) => s.date === dayKey);
        const slotBooked = this.bookedSlots.some((b: any) => b.date === dayKey && this.convertFromSqlTime(b.time) === slot);
        if (slotBooked) {
          console.log(`Slot booked: ${dayKey} ${slot}`);
          this.bookings[dayKey][slot] = 'booked';
        } else {
          this.bookings[dayKey][slot] = slotAvailable ? false : '--';
        }
      });
    });
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  convertFromSqlTime(sqlTime: string): string {
    // Split the SQL time (HH:MM:SS) and return only HH:MM
    const [hours, minutes] = sqlTime.split(':');
    return `${hours}:${minutes}`;
  }

  nextWeek(): void {
    const nextWeekDate = new Date(this.weekDays[0]);
    nextWeekDate.setDate(nextWeekDate.getDate() + 7);
    this.initializeWeekDays(nextWeekDate);
    this.initializeBookings();
  }

  previousWeek(): void {
    const previousWeekDate = new Date(this.weekDays[0]);
    previousWeekDate.setDate(previousWeekDate.getDate() - 7);
    this.initializeWeekDays(previousWeekDate);
    this.initializeBookings();
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  isPastDate(date: Date): boolean {
    const today = new Date();
    return date < today;
  }

  toggleBooking(day: string, time: string): void {
    if (this.bookings[day][time] === 'booked' || this.isPastDate(new Date(day))) return;
  
    if (this.bookings[day][time]) {
      // Uncheck the checkbox
      this.bookings[day][time] = false;
      this.selectedSlot = null;
      this.slotsnotselected = true; // Set to true when unchecked
    } else {
      // Check the checkbox
      if (this.selectedSlot) {
        this.bookings[this.selectedSlot.day][this.selectedSlot.time] = false;
      }
      this.selectedSlot = { day, time };
      this.bookings[day][time] = true;
      this.slotsnotselected = false;
    }
    
    this.cdr.detectChanges(); // Manually trigger change detection
  }
  
  convertToSqlTime(time: string): string {
    const [hours, minutes] = time.split(':');
    const sqlTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
    return sqlTime;
  }

  payandsubmitBookings() {
    const bookedSlots = [];
    for (const day in this.bookings) {
      for (const time in this.bookings[day]) {
        if (this.bookings[day][time] === true) {
          bookedSlots.push({ date: day, time });
        }
      }
    }
    console.log('Booked Slots:', bookedSlots);

    if (bookedSlots.length > 0) {
      alert(JSON.stringify(bookedSlots, null, 2));
      this.patientsBooking.age = this.patient.age;
      this.patientsBooking.bp = this.patient.bp;
      this.patientsBooking.date = bookedSlots[0].date;
      this.patientsBooking.doctor = this.patient.doctor;
      this.patientsBooking.doctorId = this.patient.doctorId;
      this.patientsBooking.gender = this.patient.gender;
      this.patientsBooking.name = this.patient.name;
      this.patientsBooking.phone = this.patient.phone;
      this.patientsBooking.spo2 = this.patient.spo2;
      this.patientsBooking.symptoms = this.patient.symptoms;
      this.patientsBooking.temperature = this.patient.temperature;
      const time = bookedSlots[0].time;
      const sqlTime = this.convertToSqlTime(time);
      this.patientsBooking.time = sqlTime;
      this.patientsBooking.weight = this.patient.weight;

      console.log(this.patientsBooking)
      this.transactionServie.createTrasaction(600).subscribe(
        (resp: any) => {
          console.log(resp)
          this.openTransactionModal(resp)
        }, err => {
          console.log(err)
        }
      )
    } else {
      this.slotsnotselected = true;
    }
  }

  openTransactionModal(respons: any) {
    var options = {
      order_id: respons.order_id,
      key: respons.key,
      amount: respons.amount,
      currency: respons.currency,
      name: 'stranger',
      description: 'payment of slot booking',
      image: 'https://cdn.pixabay.com/photo/2022/07/06/03/41/business-7304257_640.jpg',
      handler: (resp: any) => {
        if (resp != null && resp.razorpay_payment_id != null) {
          this.processResponse(resp)
        } else {
          this.paymentfailed = true
        }
      },
      prefill: {
        name: 'JATAYU Hospitals',
        email: 'jatayu@gmail.com',
        contact: '9640525052'
      },
      notes: {
        address: 'Online Slot Booking'
      },
      theme: {
        color: 'rgb(15, 8, 39)'
      }
    }
    var razorPayObject = new Razorpay(options);
    razorPayObject.open()
  }

  processResponse(resp: any) {
    console.log(resp)
    this.patientsBooking.transactionId = resp.razorpay_payment_id
    this.setpatientbooking.createbooking(this.patientsBooking).subscribe(
      (resp: any) => {
        console.log('patientsBooking data inserted into database successfully', resp)
      }, err => {
        console.log(err)
      }
    )
    location.reload()
  }

  onProceed(){

    const bookedSlots = [];
    for (const day in this.bookings) {
      for (const time in this.bookings[day]) {
        if (this.bookings[day][time] === true) {
          bookedSlots.push({ date: day, time });
        }
      }
    }
    console.log('Booked Slots:', bookedSlots);

    if (bookedSlots.length > 0) {
      alert(JSON.stringify(bookedSlots, null, 2));
      this.patientsBooking.age = this.patient.age;
      this.patientsBooking.bp = this.patient.bp;
      this.patientsBooking.date = bookedSlots[0].date;
      this.patientsBooking.doctor = this.patient.doctor;
      this.patientsBooking.doctorId = this.patient.doctorId;
      this.patientsBooking.gender = this.patient.gender;
      this.patientsBooking.name = this.patient.name;
      this.patientsBooking.phone = this.patient.phone;
      this.patientsBooking.spo2 = this.patient.spo2;
      this.patientsBooking.symptoms = this.patient.symptoms;
      this.patientsBooking.temperature = this.patient.temperature;
      const time = bookedSlots[0].time;
      const sqlTime = this.convertToSqlTime(time);
      this.patientsBooking.time = sqlTime;
      this.patientsBooking.weight = this.patient.weight;

      

      let temp ='_PAY'
      const dateString = this.patientsBooking.date;
      const timeString = this.patientsBooking.time;
      

      const[hours,seconds,mseconds]=timeString.split(':');
      const [year, month, day] = dateString.split('-');


      const yearLastTwoDigits = year.slice(-2);


      const monthTwoDigits = month;


      const dayTwoDigits = day;

      const hourDigits = hours;

      temp=temp+yearLastTwoDigits+monthTwoDigits+dayTwoDigits+hourDigits;

      console.log('transactional id: ',temp)
      this.patientsBooking.transactionId=temp

      console.log(this.patientsBooking)

      this.setpatientbooking.createbooking(this.patientsBooking).subscribe(
        (resp: any) => {
          console.log('patientsBooking data inserted into database successfully', resp)
        }, err => {
          console.log(err)
        }
      )
      location.reload()





    }

  }
}
