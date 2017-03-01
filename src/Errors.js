export const RATE_LIMIT = 'Request rate limited. Free for non-commercial use for up to 10 requests per minute! To increase your rate limit, please contact api@superevilmegacorp.com';
export const UNAUTHORIZED = 'Unauthorized Access. invalid API key provided.';
export const UNKNOWN = 'Unknown error, please check your request and try again.';
export const INTERNAL = 'Internal Server Error.';
export const NO_BODY = 'No body returned from response.';
export const NOT_FOUND = 'The specified object could not be found.';
export const OFFLINE = 'API is currently offline, try again later.';
export const NOT_ACCEPTABLE = 'You requested a format that is\'t JSON';
export const NETWORK_ERROR = 'Network error, check host name.';

export function normalizeError(messages = 'Unknown Client error', attachments = {}) {
  return {
    errors: true,
    messages,
    ...attachments,
  }
}
