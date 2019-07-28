import { StaffModule } from './staff.module';

describe('StaffModule', () => {
  let StaffModule: StaffModule;

  beforeEach(() => {
      StaffModule = new StaffModule();
  });

  it('should create an instance', () => {
    expect(staffModule).toBeTruthy();
  });
});
