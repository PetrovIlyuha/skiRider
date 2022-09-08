import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredProductListComponent } from './filtered-product-list.component';

describe('FilteredProductListComponent', () => {
  let component: FilteredProductListComponent;
  let fixture: ComponentFixture<FilteredProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteredProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
