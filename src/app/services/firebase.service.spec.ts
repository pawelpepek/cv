import { FirebaseService } from './firebase.service';

// Stubs the protected Firestore round-trip so the tests never initialize a
// real app, App Check or a network connection.
function stubFetchPhone(service: FirebaseService) {
  return vi.spyOn(service as unknown as { fetchPhone(key: string): Promise<string | undefined> }, 'fetchPhone');
}

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

  it('stores and exposes the phone returned for the key', async () => {
    const service = new FirebaseService();
    stubFetchPhone(service).mockResolvedValue('111 222 333');

    await service.loadPhone('some-key');

    expect(service.displayedPhone()).toBe('111 222 333');
    expect(localStorage.getItem('phone')).toBe('111 222 333');
  });

  it('replaces a cached phone when the key returns a different number', async () => {
    localStorage.setItem('phone', '123 456 789');
    const service = new FirebaseService();
    stubFetchPhone(service).mockResolvedValue('999 888 777');

    await service.loadPhone('some-key');

    expect(service.displayedPhone()).toBe('999 888 777');
    expect(localStorage.getItem('phone')).toBe('999 888 777');
  });

  it('keeps the cached phone when the lookup fails or finds nothing', async () => {
    localStorage.setItem('phone', '123 456 789');
    const service = new FirebaseService();
    const fetchPhone = stubFetchPhone(service);

    fetchPhone.mockRejectedValue(new Error('offline'));
    await service.loadPhone('some-key');
    expect(service.displayedPhone()).toBe('123 456 789');

    fetchPhone.mockResolvedValue(undefined);
    await service.loadPhone('wrong-key');
    expect(service.displayedPhone()).toBe('123 456 789');
  });
});
