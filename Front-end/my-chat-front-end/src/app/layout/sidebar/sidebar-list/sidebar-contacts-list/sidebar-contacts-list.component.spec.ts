import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarContactsListComponent } from './sidebar-contacts-list.component';

describe('SidebarContactsListComponent', () => {
  let component: SidebarContactsListComponent;
  let fixture: ComponentFixture<SidebarContactsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarContactsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarContactsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
