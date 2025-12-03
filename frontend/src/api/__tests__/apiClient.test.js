import { vi, expect, describe, beforeEach, afterEach } from 'vitest';
import { apiClient } from '../apiClient';

describe('apiClient', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('it should perform GET request', async () => {
    const mockRes = { success: true, _id: 123 };
    const url = 'https://example.com';

    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockRes),
    });

    const received = await apiClient.get(url);

    expect(received).toEqual(mockRes);
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'GET',
      credentials: 'include',
    });
  });

  it('it should perform POST request', async () => {
    const mockRes = { success: true, message: 'message' };
    const data = [1, 2, 3];
    const url = 'https://example.com';

    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockRes),
    });

    const received = await apiClient.post(url, data);

    expect(received).toEqual(mockRes);
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
      credentials: 'include',
    });
  });

  it('it should perform PUT request', async () => {
    const mockRes = { success: true };
    const data = { name: 'name' };
    const url = 'https://example.com';

    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockRes),
    });

    const received = await apiClient.put(url, data);

    expect(received).toEqual(mockRes);
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
      credentials: 'include',
    });
  });

  it('it should perform DELETE request', async () => {
    const mockRes = { success: true };
    const data = { name: 'name' };
    const url = 'https://example.com';

    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockRes),
    });

    const received = await apiClient.delete(url, data);

    expect(received).toEqual(mockRes);
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
      credentials: 'include',
    });
  });

  it('it should perform PATCH request', async () => {
    const mockRes = { success: true };
    const data = { name: 'name' };
    const url = 'https://example.com';

    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockRes),
    });

    const received = await apiClient.patch(url, data);

    expect(received).toEqual(mockRes);
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
      credentials: 'include',
    });
  });
});
