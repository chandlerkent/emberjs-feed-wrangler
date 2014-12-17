export function initialize(container, application) {
  application.inject('route', 'api', 'service:api');
}

export default {
  name: 'api-service',
  initialize: initialize
};
