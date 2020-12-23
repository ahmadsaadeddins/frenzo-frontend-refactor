export const BASEURL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://www.frynzo.com";

// const BASEURL = "http://127.0.0.1:8000";

export const api = {
  auth: {
    login: `${BASEURL}/dj-rest-auth/login/`,
    register: `${BASEURL}/dj-rest-auth/registration/`,
  },
  orders: {
    list: `${BASEURL}/api/orders/`,
    list_total: `${BASEURL}/api/orders/total/`,
    retrieve: (id) => `${BASEURL}/api/orders/${id}/`,
    create: `${BASEURL}/api/orders/create/`,
    update: (id) => `${BASEURL}/api/orders/${id}/update/`,
    delete: (id) => `${BASEURL}/api/orders/${id}/delete/`,
  },
  players: {
    list: `${BASEURL}/api/players/`,
    create: `${BASEURL}/api/players/create/`,
  },
  games: {
    list: `${BASEURL}/api/games/`,
    create: `${BASEURL}/api/games/create/`,
  },
  devices: {
    list: `${BASEURL}/api/devices/`,
    create: `${BASEURL}/api/devices/create/`,
  },
  market: {
    list: `${BASEURL}/api/market/`,
    orders: `${BASEURL}/api/market/orders/`,
    orders_total: `${BASEURL}/api/market/orders/total`,
    create_item: `${BASEURL}/api/market/create/`,
    create: `${BASEURL}/api/market/orders/create/`,
    delete: (id) => `${BASEURL}/api/market/orders/${id}/delete/`,
    update: (id) => `${BASEURL}/api/market/orders/${id}/update/`,
    retrieve: (id) => `${BASEURL}/api/market/orders/${id}/`,
  },
};
