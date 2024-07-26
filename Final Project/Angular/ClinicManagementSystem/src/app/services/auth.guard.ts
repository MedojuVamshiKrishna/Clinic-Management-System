import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginServiceService } from './login-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  if(inject(LoginServiceService).isLoggedIn())
    {
      const role = route.data["roles"] as Array<String>;

      if(role){
        if (inject(LoginServiceService).isValidUSer(role)) {
          return true;
          
        }else{
          inject(Router).navigate(['/forbidden']);
          return false;

        }
      }
      return true;
    }else{
      inject(Router).navigate(['']);
      return false;
    }
  
  return true;
};
