import { FirebaseService } from './firebase.service';

describe('FirebaseService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows the placeholder when no phone is known', () => {
    const service = new FirebaseService();

    expect(service.hasPhone()).toBe(false);
    expect(service.displayedPhone()).toBe('000 000 000');
    expect(service.hrefPhone()).toBeUndefined();
  });

  it('hydrates the phone from localStorage on creation', () => {
    localStorage.setItem('phone', '123 456 789');

    const service = new FirebaseService();

    expect(service.hasPhone()).toBe(true);
    expect(service.displayedPhone()).toBe('123 456 789');
  });

  it('builds a tel: href with the +48 prefix and no whitespace', () => {
    localStorage.setItem('phone', '123 456 789');

    const service = new FirebaseService();

    expect(service.hrefPhone()).toBe('tel:+48123456789');
  });

  it('does not overwrite an already known phone in loadPhone', async () => {
    localStorage.setItem('phone', '123 456 789');
    const service = new FirebaseService();

    await service.loadPhone('some-key');

    expect(service.displayedPhone()).toBe('123 456 789');
  });
});
