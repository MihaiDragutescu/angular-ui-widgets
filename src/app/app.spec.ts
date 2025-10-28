import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Direction } from './components/t-grid/t-grid.consts';
import { MOCK_DATA } from './app.consts';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should sort data ascending and descending correctly', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    const originalData = [...MOCK_DATA];

    app.onSortChange({ columnName: 'firstName', direction: Direction.Asc });
    expect(app.myData[0].firstName <= app.myData[1].firstName).toBeTrue();

    app.onSortChange({ columnName: 'firstName', direction: Direction.Desc });
    expect(app.myData[0].firstName >= app.myData[1].firstName).toBeTrue();

    app.onSortChange({ columnName: 'firstName', direction: Direction.None });
    expect(app.myData).toEqual(originalData);
  });
});
