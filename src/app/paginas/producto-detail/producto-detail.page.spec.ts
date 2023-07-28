import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoDetailPage } from './producto-detail.page';

describe('ProductoDetailPage', () => {
  let component: ProductoDetailPage;
  let fixture: ComponentFixture<ProductoDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProductoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
