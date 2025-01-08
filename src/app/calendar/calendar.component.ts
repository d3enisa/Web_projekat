import { Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  today: Signal<DateTime> = signal(DateTime.local());
  firstDayOfMonth: WritableSignal<DateTime> = signal(this.today().startOf('month'));
  activeDay: WritableSignal<DateTime | null> = signal(null);
  weekDays: Signal<string[]> = signal(Info.weekdays('short'));
  DATE_MED = DateTime.DATE_MED;

  daysOfMonth: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(
      this.firstDayOfMonth().startOf('week'),
      this.firstDayOfMonth().endOf('month').endOf('week')
    )
      .splitBy({ days: 1 })
      .map((interval) => interval.start as DateTime);
  });

  cineStarEvents: Signal<Record<string, string[]>> = signal(this.generateCineStarEvents());

  activeDayEvents: Signal<string[]> = computed(() => {
    const activeDay = this.activeDay();
    const dayKey = activeDay?.toISODate();
    if (!dayKey) return []; //
    return this.cineStarEvents()[dayKey] ?? [];
  });

  goToPreviousMonth() {
    this.firstDayOfMonth.set(this.firstDayOfMonth().minus({ months: 1 }));
  }

  goToNextMonth() {
    this.firstDayOfMonth.set(this.firstDayOfMonth().plus({ months: 1 }));
  }

  goToToday() {
    this.firstDayOfMonth.set(this.today().startOf('month'));
  }

  private generateCineStarEvents(): Record<string, string[]> {
    const events: Record<string, string[]> = {};
    const start = this.today().startOf('year');
    const end = this.today().endOf('year');

    let current = start;
    while (current <= end) {
      if ([1, 3, 5].includes(current.weekday)) {
        events[current.toISODate()!] = [
          `CineStar Premiere: ${current.toLocaleString(DateTime.DATE_MED)}`,
          'Discount on tickets!',
        ];
      }
      current = current.plus({ days: 1 });
    }
    return events;
  }
}
