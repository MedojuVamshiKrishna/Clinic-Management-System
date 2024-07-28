import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailServiceService {

  url='http://localhost:5483/mail/send/mvamshikrishna17@gmail.com'

  constructor(private http:HttpClient) { }

  sendMail(mail: string, mailstructure: any): Observable<string> {
    // Set responseType to 'text' to handle plain text responses
    return this.http.post<string>(`http://localhost:5483/mail/send/${mail}`, mailstructure, { responseType: 'text' as 'json' });
  }
}
