import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../../services/login.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 
  chatTab: boolean = true;
  title: any;
  switchLang!:string;
  browserLang!:string;
  constructor(private route: Router) {

    //Translate Code
    // this.service.languageService.subscribe((res)=>{
    //   this.switchLang = res;
    // })
    // translate.addLangs(['en','de']);
    //   translate.setDefaultLang('en');
    //   translate.use(sessionStorage.getItem("activeLanguage"));

    //   this.browserLang = translate.getDefaultLang();
    //   this.languageChanged();
    //   this.service.languageService.next(this.browserLang);
    //Translate code ends
    this.title = route.url;
    this.title = this.title.replace(/\//g, '');
    this.title = this.title.toUpperCase();
  }

  ngOnInit(): void {}
    
  
    
  logout(){
    if(sessionStorage.getItem('userisAdmin') == 'admin'){
      this.route.navigate(['/auth/admin'])
    }
    else{
      this.route.navigate(['/auth/login'])
    }
    sessionStorage.clear();
   
  }
  

}
