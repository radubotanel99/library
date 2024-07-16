import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyTableComponent } from './dummy-table.component';

describe('DummyTableComponent', () => {
  let component: DummyTableComponent;
  let fixture: ComponentFixture<DummyTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
