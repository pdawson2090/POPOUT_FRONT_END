import { TestBed, inject } from '@angular/core/testing';

import { ToastMessagesService } from './toast-messages.service';

describe('ToastMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastMessagesService]
    });
  });

  it('should be created', inject([ToastMessagesService], (service: ToastMessagesService) => {
    expect(service).toBeTruthy();
  }));
});
