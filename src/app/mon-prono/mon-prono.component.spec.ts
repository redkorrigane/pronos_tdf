import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonPronoComponent } from './mon-prono.component';

describe('MonPronoComponent', () => {
  let component: MonPronoComponent;
  let fixture: ComponentFixture<MonPronoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonPronoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonPronoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
