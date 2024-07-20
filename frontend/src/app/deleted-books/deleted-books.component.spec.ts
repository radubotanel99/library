import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedBooksComponent } from './deleted-books.component';

describe('DeletedBooksComponent', () => {
  let component: DeletedBooksComponent;
  let fixture: ComponentFixture<DeletedBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletedBooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
