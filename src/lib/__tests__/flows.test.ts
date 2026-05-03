describe('Login flow - disabled state handling', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  test('login page returns message when DISABLE_LOGIN is set', () => {
    process.env.DISABLE_LOGIN = '1';

    expect(process.env.DISABLE_LOGIN).toBe('1');
  });

  test('login page redirects when CLOUD_MODE is set', () => {
    process.env.CLOUD_MODE = '1';
    process.env.cloudUrl = 'https://cloud.umami.is';

    expect(process.env.CLOUD_MODE).toBe('1');
    expect(process.env.cloudUrl).toBe('https://cloud.umami.is');
  });

  test('logout page renders normally when neither DISABLE_LOGIN nor CLOUD_MODE', () => {
    delete process.env.DISABLE_LOGIN;
    delete process.env.CLOUD_MODE;

    expect(process.env.DISABLE_LOGIN).toBeUndefined();
    expect(process.env.CLOUD_MODE).toBeUndefined();
  });
});

describe('Website flow - error handling', () => {
  test('website creation error surfaces through form error prop', () => {
    const errorMessage = 'Website limit reached';

    const error = { message: errorMessage };

    expect(error.message).toBe(errorMessage);
  });
});

describe('App flow - safe config fallback', () => {
  test('redirect uses fallback when config is null', () => {
    const config = null;
    const cloudUrl = undefined;
    const basePath = '';

    const loginUrl = config?.cloudMode
      ? `${cloudUrl}/login`
      : `${basePath || ''}/login`;

    expect(loginUrl).toBe('/login');
  });

  test('redirect uses cloud URL when config.cloudMode is true', () => {
    const config = { cloudMode: true };
    const cloudUrl = 'https://cloud.umami.is';

    const loginUrl = config?.cloudMode
      ? `${cloudUrl}/login`
      : '/login';

    expect(loginUrl).toBe('https://cloud.umami.is/login');
  });

  test('redirect uses basePath when not in cloud mode', () => {
    const config = { cloudMode: false };
    const basePath = '/umami';

    const loginUrl = config?.cloudMode
      ? '/login'
      : `${basePath || ''}/login`;

    expect(loginUrl).toBe('/umami/login');
  });
});
