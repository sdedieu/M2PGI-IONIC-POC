import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddOwnerPage } from './add-owner.page';

describe('AddOwnerPage', () => {
  let component: AddOwnerPage;
  let fixture: ComponentFixture<AddOwnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOwnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddOwnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
