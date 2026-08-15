import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from '../constants/api.constants';
import { ProfileDto } from '../models/profile-dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly http = inject(HttpClient);

  getUserProfile(): Observable<ProfileDto> {
    return this.http.get<ProfileDto>(
      `${ApiConstants.BaseUrl}${ApiConstants.GetUserProfile}`
    );
  }
}
