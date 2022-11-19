import cloneDeep from "lodash.clonedeep";
import { StoreDefinition } from "pinia";

interface resetType {
  store: StoreDefinition;
}

export default function resetStore({ store }: resetType) {
  const initialState = cloneDeep(store.$state);
  store.$reset = () => store.$patch(cloneDeep(initialState));
}
