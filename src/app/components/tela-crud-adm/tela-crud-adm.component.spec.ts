import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaCrudAdmComponent } from './tela-crud-adm.component';

describe('TelaCrudAdmComponent', () => {
  let component: TelaCrudAdmComponent;
  let fixture: ComponentFixture<TelaCrudAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaCrudAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaCrudAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
