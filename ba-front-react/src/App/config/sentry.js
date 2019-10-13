import Raven from 'raven-js';

const sentry_key = '7260b8aa028a4e17864f12c46b1e9b55';
const sentry_app = '1226640';

export const sentry_url = `https://${sentry_key}@app.getsentry.com/${sentry_app}`;

export function logException (ex, context) {
    // Raven.captureException(ex,{
    //     extra:context
    // });
    window && window.console && console.error && console.error(ex);
}
