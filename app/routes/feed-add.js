import AuthenticatedRoute from './authenticated';
import ScrollWindowToTopRoute from '../mixins/scroll-window-to-top-route';

export default AuthenticatedRoute.extend(ScrollWindowToTopRoute, {});