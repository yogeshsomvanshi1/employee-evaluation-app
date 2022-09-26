import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AppComponent } from "src/app/app.component";
// import { ProductManagementService } from 'src/app/modules/product-management/services/product-management.service';
import { LoginService } from "../../services/login.service";

@Component({
  selector: "app-leftmenu",
  templateUrl: "./leftmenu.component.html",
  styleUrls: ["./leftmenu.component.scss"],
})
export class LeftmenuComponent implements OnInit {
  isCollapsed = false;
  isProjectCollapsed = false;
  isJobportalCollapsed = true;
  isAuthCollapsed = true;
  isStaticticsCollapsed = true;
  isFriendsCollapsed = true;

  fontSelect: any;
  menuIconSelect: any;
  staticscard: boolean = true;
  friendscard: boolean = true;

  performance: string[] = ["Department", "Division", "Grade"];
  performanceLi: string[] = ["Department_ID", "Department_Name"];
  constructor(
    private router: Router,
    @Inject(AppComponent) private app: AppComponent
  ) {
    if (this.router.url.includes("hr")) {
      this.isCollapsed = false;
    }

    if (this.router.url.includes("project")) {
      this.isProjectCollapsed = false;
    }
    if (this.router.url.includes("jobportal")) {
      this.isJobportalCollapsed = false;
    }
    if (this.router.url.includes("auth")) {
      this.isAuthCollapsed = false;
    }
  }

  ngOnInit(): void {}

  // NumberMenuList:any =[
  //      {
  //     name:"Department",
  //     isHeading:false,
  //     iconClass:"icon-rocket",
  //     dynamicMenuOpen:false,
  //     routerLink: ['/performance/performance/department-table']
  //       },
  //       {
  //         name:"Division",
  //         isHeading:false,
  //         iconClass:"icon-rocket",
  //         dynamicMenuOpen:false,
  //         routerLink: ['/performance/performance/division-table']
  //       },
  //       {
  //         name:"Grade",
  //         isHeading:false,
  //         iconClass:"icon-rocket",
  //         dynamicMenuOpen:false,
  //         routerLink: ['/performance/performance/grades-table']
  //       },
  //       {
  //         name:"Role",
  //         isCollapsed: true,
  //         isHeading:false,
  //         iconClass:"icon-rocket",
  //         dynamicMenuOpen:false,
  //         routerLink: ['/performance/performance/role-table'],
  //       },
  //       {
  //         name:"Designation",
  //         isCollapsed: true,
  //         isHeading:false,
  //         iconClass:"icon-rocket",
  //         dynamicMenuOpen:false,
  //         routerLink: ['/performance/performance/designation-table'],
  //       },
  //       {
  //         name:"Performance",
  //         isCollapsed: false,
  //         isHeading:false,
  //         iconClass:"icon-rocket",
  //         dynamicMenuOpen:false,

  //         submenu:[
  //           {
  //             name:"Key_Performance_Areas",
  //             routerLink:[''],
  //           },
  //           {
  //             name:"Key_Performance_Areas_EmployeeGrades",
  //             routerLink:[''],
  //           },
  //           {
  //             name:"Key_Performance_Areas_EmployeeGrades",
  //             routerLink:[''],
  //           },
  //           {
  //             name:"Goals_Key_Performance_Areas_Roles",
  //             routerLink:[''],
  //           },
  //           {
  //             name:"Performance_Review_Type",
  //             routerLink:[''],
  //           },
  //           {
  //             name:"Performance_Review_Phases",
  //             routerLink:[''],
  //           },
  //           {
  //             name:"Performance_Review_Grades",
  //             routerLink:[''],
  //           },
  //           {
  //             name:"Performance_Review_Cycle_Schedule",
  //             routerLink:[''],
  //           },
  //         ]
  //       }

  //     ]
  NumberMenuList: any = [
    {
      name: "Masters",
      controlId: "collapseBasicMaster",
      isCollapsed: true,
      isHeading: false,
      iconClass: "icon-rocket",
      // dynamicMenuOpen: false,
      submenu: [
        {
          name: "Department",
          routerLink: ["/performance/performance/department-table"],
        },
        {
          name: "Division",
          routerLink: ["/performance/performance/division-table"],
        },
        {
          name: "Grade",
          routerLink: ["/performance/performance/grades-table"],
        },
        {
          name: "Role",
          routerLink: ["/performance/performance/role-table"],
        },
        {
          name: "Designation",
          routerLink: ["/performance/performance/designation-table"],
        },
      ],
    },
    {
      name: "Performance",
      controlId: "collapseBasicProduct",
      isCollapsed: true,
      isHeading: false,
      iconClass: "icon-rocket",
      dynamicMenuOpen: false,
      translationKey: "product_main_menu_title",
      submenu: [
        {
          name: "Key_Performance_Areas",
          routerLink: ["/crm/crm/product-templates"]
        },
        {
          name: "Key_Performance_Areas_EmployeeGrades",
          routerLink: ["/crm/crm/product-templates"]
        },
        {
          name: "Goals_Key_Performance_Areas_Roles",
          routerLink: ["/crm/crm/product-templates"]
        },
        {
          name: "Performance_Review_Type",
          routerLink: ["/crm/crm/product-templates"]
        },
        {
          name: "Performance_Review_Phases",
          routerLink: ["/crm/crm/product-templates"]
        },
        {
          name: "Performance_Review_Grades",
          routerLink: ["/crm/crm/product-templates"]
        },
        {
          name: "Performance_Review_Cycle_Schedule",
          routerLink: ["/crm/crm/product-templates"]
        },
      ],
    },
    {
      name: "Employees",
      isHeading: true,
      iconClass: "icon-rocket",
      isGheading: false,
      routerLink: ["/crm/crm/product-configuration"],
      dynamicMenuOpen: false,
    },
  ];
}
