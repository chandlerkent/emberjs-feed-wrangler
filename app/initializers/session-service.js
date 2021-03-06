export function initialize(container, application) {
  application.inject('route', 'session', 'service:session');
  application.inject('controller', 'session', 'service:session');
  application.inject('service:api', 'session', 'service:session');
}

export default {
  name: 'session-service',
  initialize: initialize
};
