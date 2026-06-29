/// <reference types="vite/client" />

interface Window {
  netlifyIdentity?: {
    init: () => void;
    open: () => void;
    close: () => void;
    currentUser: () => NetlifyIdentityUser | null;
    on: (event: string, cb: (user?: NetlifyIdentityUser) => void) => void;
    off: (event: string, cb: (user?: NetlifyIdentityUser) => void) => void;
    logout: () => void;
  };
}

type NetlifyIdentityUser = {
  email?: string;
  token?: {
    access_token?: string;
  };
};
