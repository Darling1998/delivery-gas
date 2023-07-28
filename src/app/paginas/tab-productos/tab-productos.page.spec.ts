import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabProductosPage } from './tab-productos.page';

describe('TabProductosPage', () => {
  let component: TabProductosPage;
  let fixture: ComponentFixture<TabProductosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
