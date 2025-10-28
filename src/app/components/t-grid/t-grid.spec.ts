import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TGrid } from './t-grid';
import { Component } from '@angular/core';
import { TColumn } from './t-column/t-column';
import { PaginationChangeEvent, SortChangeEvent } from './t-grid.types';
import { Direction } from './t-grid.consts';
import { MOCK_DATA } from '../../app.consts';

@Component({
  template: `
    <t-grid
      [data]="data"
      [sortable]="true"
      [pageSize]="5"
      (sortChange)="onSortChange($event)"
      (paginationChange)="onPaginationChange($event)"
    >
      <t-column name="First Name" property="firstName" [sortable]="true" />
      <t-column name="Last Name" property="lastName" [sortable]="true" />
      <t-column name="Email" property="email" [sortable]="false" />
    </t-grid>
  `,
  standalone: true,
  imports: [TGrid, TColumn],
})
class HostComponent {
  data = MOCK_DATA;

  sortEvent?: SortChangeEvent;
  paginationEvent?: PaginationChangeEvent;

  onSortChange(event: SortChangeEvent) {
    this.sortEvent = event;
  }

  onPaginationChange(event: PaginationChangeEvent) {
    this.paginationEvent = event;
  }
}

describe('TGrid', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render initial rows based on page size', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(5);
  });

  it('should emit paginationChange when navigating to next page', () => {
    const nextButton = fixture.nativeElement.querySelector('.t-grid__footer button:last-child');
    nextButton.click();
    fixture.detectChanges();

    expect(component.paginationEvent).toBeTruthy();
    expect(component.paginationEvent?.currentPage).toBe(2);
  });

  it('should emit sortChange when clicking sortable header', () => {
    const sortableHeader = fixture.nativeElement.querySelectorAll('th.sortable')[0];
    sortableHeader.click();
    fixture.detectChanges();

    expect(component.sortEvent).toBeTruthy();
    expect(component.sortEvent?.columnName).toBe('firstName');
    expect(component.sortEvent?.direction).toBe(Direction.Asc);
  });

  it('should toggle sort direction on consecutive clicks', () => {
    const sortableHeader = fixture.nativeElement.querySelectorAll('th.sortable')[0];
    sortableHeader.click();
    sortableHeader.click();
    fixture.detectChanges();

    expect(component.sortEvent?.direction).toBe(Direction.Desc);
  });
});
