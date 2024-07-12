import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './services/auth.guard';
import { AppointmentBookingComponent } from './components/appointment-booking/appointment-booking.component';
import { PatientregisterComponent } from './components/patientregister/patientregister.component';
import { PatientsComponent } from './components/patients/patients.component';
import { SetDoctorAvailabilityComponent } from './components/set-doctor-availability/set-doctor-availability.component';
import { BookSlotComponent } from './components/book-slot/book-slot.component';
import { ViewAppliedPatientsComponent } from './components/view-applied-patients/view-applied-patients.component';
import { PatientHealthRecordsComponent } from './components/patient-health-records/patient-health-records.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ViewPaymentsComponent } from './components/view-payments/view-payments.component';

export const routes: Routes = [

    {
        path:'',
        component:HomeComponent,
        pathMatch: 'full'
    },
    {
        path:"login",
        component:LoginComponent,
        pathMatch: 'full'
    },
    {
        path:"register",
        component:RegisterComponent,
        pathMatch: 'full'
    },
    {
        path:"dashboard",
        component:DashboardComponent,
        pathMatch: 'full',
        canActivate:[authGuard]

    },
    
    {
        path:"book",
        component:AppointmentBookingComponent,
        pathMatch: 'full',
        canActivate:[authGuard]

    },{
        path:"createpatient",
        component:PatientregisterComponent,
        pathMatch: 'full',
        canActivate:[authGuard]
    },{
        path:"patients",
        component:PatientsComponent,
        pathMatch: 'full',
        canActivate:[authGuard]
    },{
        path:"docavail",
        component:SetDoctorAvailabilityComponent,
        pathMatch: 'full',
        canActivate:[authGuard]
    },{
        path:"bookslot",
        component:BookSlotComponent,
        pathMatch: 'full',
        canActivate:[authGuard]
    }
    ,{
        path:"appliedPatients",
        component:ViewAppliedPatientsComponent,
        pathMatch: 'full',
        canActivate:[authGuard]
    },{
        path:"healthrecords",
        component:PatientHealthRecordsComponent,
        pathMatch: 'full',
        canActivate:[authGuard]
    }
    ,{
        path:"stats",
        component:StatisticsComponent,
        pathMatch: 'full',
        canActivate:[authGuard]
    }
    ,{
        path:"viewPayments",
        component:ViewPaymentsComponent,
        pathMatch: 'full',
        canActivate:[authGuard]
    }
];
