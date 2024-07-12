import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginServiceService } from './login-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  if(inject(LoginServiceService).isLoggedIn())
    {
      return true;
    }else{
      inject(Router).navigate(['']);
      return false;
    }
  
  return true;
};
