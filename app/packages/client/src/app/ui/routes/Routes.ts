import * as H from 'history';

export namespace RouterHistory {
  let hh: H.History = null;

  export const get = (): H.History => hh;

  export const set = (history: H.History): void => {
    hh = history;
  };
}

/**
 * This is a utility to allow strongly typed navigation to any route.
 * NB: This must be maintained alongside the actual route definitions in App.tsx
 */
export namespace Routes {
  export const goBack = (): void => {
    RouterHistory.get().goBack();
  };

  export const goHome = (): void => {
    pushRoute('/home');
  };

  export const goTo = {
    /**
     * Example:
     *
     * organizations: {
     *   index: (): void => RouterHistory.get().push('/organizations'),
     *   view: (orgId: string): void => RouterHistory.get().push(`/organizations/${orgId}`),
     * }
     */
    home: (): void => pushRoute('/home'),
    manageConnections: (): void => pushRoute('/connections'),
    connection: (name: string, db: string): void => pushRoute(`/connections/${name}/${db}`),
  };

  export const generateHrefTo = {
    /**
     * Example:
     *
     * organizations: {
     *   index: (): string => RouterHistory.get().createHref({ pathname: '/organizations' }),
     *   view: (orgId: string): string => RouterHistory.get().createHref({ pathname: `/organizations/${orgId}` }),
     * }
     */
    home: (): string => createHref('/home'),
  };

  const createHref = (path: string): string => RouterHistory.get().createHref({ pathname: path });

  const pushRoute = (route: string): void => {
    if (RouterHistory.get().location.pathname === route) {
      return;
    }

    RouterHistory.get().push(route);
  };
}

export default Routes;
