import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarChatListComponent } from './sidebar-chat-list.component';

describe('SidebarChatListComponent', () => {
  let component: SidebarChatListComponent;
  let fixture: ComponentFixture<SidebarChatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarChatListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
