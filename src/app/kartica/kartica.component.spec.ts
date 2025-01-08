mport { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarticaComponent } from './kartica.component';

describe('KarticaComponent', () => {
  let component: KarticaComponent;
  let fixture: ComponentFixture<KarticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KarticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KarticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
