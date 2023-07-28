import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabPedidosPage } from './tab-pedidos.page';

describe('TabPedidosPage', () => {
  let component: TabPedidosPage;
  let fixture: ComponentFixture<TabPedidosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabPedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
