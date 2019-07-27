import { Logger } from 'common/Logger';

/**
 * A small fetch abstraction to reduce repetitive code.
 */
export namespace FetchBase {

  const baseUrl = '/api';

  export const get = async <T = any>(url: string): Promise<FetchResponse<T>> => {
    const response = await fetch(`${baseUrl}/${url}`);
    return await parse<T>(response);
  };

  export const post = async <T = any>(url: string, body: any): Promise<FetchResponse<T>> => {
    const response = await fetch(`${baseUrl}/${url}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return await parse<T>(response);
  };

  export const put = async <T = any>(url: string, body: any): Promise<FetchResponse<T>> => {
    const response = await fetch(`${baseUrl}/${url}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return await parse<T>(response);
  };

  export const del = async (url: string): Promise<boolean> => {
    const response = await fetch(`${baseUrl}/${url}`, {
      method: 'DELETE'
    });

    return response.ok;
  };

  const parse = async <T>(response: Response): Promise<FetchResponse<T>> => {
    if (!response.ok) {
      Logger.warn('api request faliure', response.statusText);

      if (response.status === 500) {
        throw new Error('An unexpected error has occurred. Please refresh and try again.');
      }
    }

    let responseJson = null;
    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        responseJson = await response.json();
      }
    } catch (error) {
      console.error('Error parsing json response', error);
    }

    return {
      ok: response.ok,
      data: response.ok ? responseJson as T : null,
      error: !response.ok ? {
        code: response.status,
        status: response.statusText,
      } : null
    };
  };
}

export type FetchResponse<T = any> = {
  data: T;
  ok: boolean;
  error: {
    code: number;
    status: string;
  };
};
