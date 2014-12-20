export function initialize(container, application) {
  application.inject('service:session', 'cookie', 'service:cookie');
}

export default {
  name: 'cookie-service',
  initialize: initialize
};
