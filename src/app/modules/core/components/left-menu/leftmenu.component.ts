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

  NumberMenuList: any = [
    {
      name: "Masters",
      controlId: "collapseBasicMaster",
      isCollapsed: true,
      isHeading: false,
      iconClass: "icon-rocket",
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
      name: "Evaluation Criteria",
      controlId: "collapseBasicProduct",
      isCollapsed: true,
      isHeading: false,
      iconClass: "icon-rocket",
      dynamicMenuOpen: false,
      translationKey: "product_main_menu_title",
      submenu: [
        {
          name: "Key Performance Areas",
          routerLink: ["/crm/crm/product-templates"]
        },
        {
          name: "Key Performance Areas EmployeeGrades",
          routerLink: ["/crm/crm/product-templates"]
        },
        {
          name: "Goals Key Performance Areas Roles",
          routerLink: ["/crm/crm/product-templates"]
        },
        {
          name: "Performance Review Type",
          routerLink: ["/crm/crm/product-templates"]
        },
        {
          name: "Performance Review Phases",
          routerLink: ["/crm/crm/product-templates"]
        },
        {
          name: "Performance Review Grades",
          routerLink: ["/crm/crm/product-templates"]
        },
        {
          name: "Performance Review Cycle Schedule",
          routerLink: ["/crm/crm/product-templates"]
        },
      ],
    },
    {
      name: "Employee Master",
      isHeading: false,
      iconClass: "icon-rocket",
      isCollapsed: true,
      controlId: "collaspedEmployee",
      isGheading: false,
      dynamicMenuOpen: false,
      submenu: [
        {
          name: "Employee",
          routerLink: ["/performance/performance/employee-table"]
        },
        {
          name: "Employee Type",
          routerLink: ["/performance/performance/employee-type"]
        },
      ]
    },
  ];
}
