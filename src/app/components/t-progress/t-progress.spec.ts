import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TProgress } from './t-progress';

describe('TProgress', () => {
  let component: TProgress;
  let fixture: ComponentFixture<TProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TProgress],
    }).compileComponents();

    fixture = TestBed.createComponent(TProgress);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('radius', 50);
    fixture.componentRef.setInput('progress', 33);
    fixture.componentRef.setInput('color', '#4caf50');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should limit the radius to a minimum of 50', () => {
    fixture.componentRef.setInput('radius', 10);
    expect(component.validRadius()).toBe(50);
  });

  it('should restrict the progress to values between 0 and 100', () => {
    fixture.componentRef.setInput('progress', -20);
    expect(component.validProgress()).toBe(0);

    fixture.componentRef.setInput('progress', 120);
    expect(component.validProgress()).toBe(100);
  });

  it('should decrease dashOffset as progress increases', () => {
    fixture.componentRef.setInput('progress', 0);
    const offsetStart = component.dashOffset();

    fixture.componentRef.setInput('progress', 50);
    const offsetEnd = component.dashOffset();

    expect(offsetEnd).toBeLessThan(offsetStart);
  });

  it('should emit complete event when progress reaches 100', () => {
    const spy = spyOn(component.complete, 'emit');

    fixture.componentRef.setInput('progress', 100);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
