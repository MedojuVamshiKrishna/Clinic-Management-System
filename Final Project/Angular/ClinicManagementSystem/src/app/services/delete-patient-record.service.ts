import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeletePatientRecordService {
  constructor(private http: HttpClient) { }
  
  deleteRecord(itemid:any): Observable<string>{
    return this.http.delete<string>(`http://localhost:5483/staff/deleteRecord?id=${itemid}`, { responseType: 'text' as 'json' })
  }
}
