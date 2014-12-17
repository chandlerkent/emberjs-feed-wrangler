export function initialize(container, application) {
  application.inject('route', 'cookieService', 'service:cookie');
}

export default {
  name: 'cookie-service',
  initialize: initialize
};
