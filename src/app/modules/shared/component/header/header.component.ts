import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProductManagementService } from 'src/app/modules/product-management/services/product-management.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isFullScreen: boolean;
  contactTab: boolean;
  groupTab: boolean;
  chatTab: boolean = true;
  title: any;
  switchLang!:string;
  browserLang!:string;
  constructor(private route: Router,public translate: TranslateService, private service: ProductManagementService) {

    //Translate Code
    this.service.languageService.subscribe((res)=>{
      this.switchLang = res;
    })
    translate.addLangs(['en','de']);
      translate.setDefaultLang('en');
      translate.use(sessionStorage.getItem("activeLanguage"));

      this.browserLang = translate.getDefaultLang();
      this.languageChanged();
      this.service.languageService.next(this.browserLang);
    //Translate code ends
    this.title = route.url;
    // 
    this.title = this.title.replace(/\//g, '');
    this.title = this.title.toUpperCase();
  }

  ngOnInit(): void {}
    languageSelected(lang){
      this.switchLang = lang;
      this.translate.use(lang);
      sessionStorage.setItem('activeLanguage',lang);
     
    }
  
    languageChanged(){
      this.translate.use(this.browserLang.match(/de | en/)? this.browserLang: 'en')
    }
  // Translate lang
  logout(){
    if(sessionStorage.getItem('userisAdmin') == 'admin'){
      this.route.navigate(['/auth/admin'])
    }
    else{
      this.route.navigate(['/auth/login'])
    }
    sessionStorage.clear();
   
  }
  mToggoleMenu() {
    document.getElementsByTagName('body')[0].classList.toggle("offcanvas-active");
    document.getElementsByClassName('overlay')[0].classList.toggle("open");

  }
  noteToggle() {
    document.getElementsByClassName('sticky-note')[0].classList.toggle("open");
    document.getElementsByClassName('overlay')[0].classList.toggle("open");
  }
  openRightMenu() {
    document.getElementById('rightbar').classList.toggle("open");
    document.getElementsByClassName('overlay')[0].classList.toggle("open");

  }
  openfullScreen() {

    let elem = document.documentElement;
    let methodToBeInvoked = elem.requestFullscreen ||
      elem.requestFullscreen || elem['mozRequestFullscreen'] || elem['msRequestFullscreen'];
    if (methodToBeInvoked) {
      methodToBeInvoked.call(elem)
    }
    this.isFullScreen = true;
  }

  closeFullScreen() {
    const docWithBrowsersExitFunctions = document as Document & {
      mozCancelFullScreen(): Promise<void>;
      webkitExitFullscreen(): Promise<void>;
      msExitFullscreen(): Promise<void>;
    };
    if (docWithBrowsersExitFunctions.exitFullscreen) {
      docWithBrowsersExitFunctions.exitFullscreen();
    } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
      docWithBrowsersExitFunctions.mozCancelFullScreen();
    } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      docWithBrowsersExitFunctions.webkitExitFullscreen();
    } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
      docWithBrowsersExitFunctions.msExitFullscreen();
    }
    this.isFullScreen = false;
  }

  onTab(number) {
    this.chatTab = false;
    this.groupTab = false;
    this.contactTab = false;
    if (number == '1') {
      this.chatTab = true;
    }
    else if (number == '2') {
      this.groupTab = true;
    }
    else if (number == '3') {
      this.contactTab = true;
    }
  }

}
