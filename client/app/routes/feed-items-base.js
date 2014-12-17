import AuthenticatedRoute from './authenticated';
import LoadableRoute from '../mixins/loadable-route';
import ScrollWindowToTopRoute from '../mixins/scroll-window-to-top-route';

export default AuthenticatedRoute.extend(LoadableRoute, ScrollWindowToTopRoute, {});
