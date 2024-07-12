import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-view-payments',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './view-payments.component.html',
  styleUrl: './view-payments.component.css'
})
export class ViewPaymentsComponent {

  bookings:any

  constructor(private stats : StatsService){
    

    this.stats.getAllbookings().subscribe(
      (resp:any)=>{
        this.bookings=resp
        console.log(this.bookings)
      },err=>[
          console.log(err)
      ]
    )

  }

}
