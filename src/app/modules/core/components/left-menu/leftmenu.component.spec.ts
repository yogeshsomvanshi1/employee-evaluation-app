import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductManagementService } from 'src/app/modules/product-management/services/product-management.service';


import { LeftmenuComponent } from './leftmenu.component';

describe('LeftmenuComponent', () => {
  let component: LeftmenuComponent;
  let fixture: ComponentFixture<LeftmenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftmenuComponent ],
      providers:[ProductManagementService],
      imports:[HttpClientTestingModule,RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
