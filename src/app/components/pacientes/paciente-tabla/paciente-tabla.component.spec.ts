import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteTablaComponent } from './paciente-tabla.component';

describe('PacienteTablaComponent', () => {
  let component: PacienteTablaComponent;
  let fixture: ComponentFixture<PacienteTablaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteTablaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
