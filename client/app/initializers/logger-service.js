export function initialize(container, application) {
  application.inject('route', 'logger', 'service:logger');
  application.inject('controller', 'logger', 'service:logger');
}

export default {
  name: 'logger-service',
  initialize: initialize
};
