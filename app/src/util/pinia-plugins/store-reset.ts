import cloneDeep from "lodash.clonedeep";

// todo: pinia store type

export default function resetStore({ store }) {
  const initialState = cloneDeep(store.$state);
  store.$reset = () => store.$patch(cloneDeep(initialState));
}
