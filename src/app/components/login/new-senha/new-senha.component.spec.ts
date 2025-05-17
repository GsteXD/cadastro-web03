import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSenhaComponent } from './new-senha.component';

describe('NewSenhaComponent', () => {
  let component: NewSenhaComponent;
  let fixture: ComponentFixture<NewSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSenhaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
