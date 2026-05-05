import { S as SAMPLE_PRODUCTS } from "./api-CWnklUSV.js";
import { m as useActor, n as useQuery, o as createActor } from "./index-Bez7_rsT.js";
function useProducts(category) {
  void useActor(createActor);
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      if (category && category !== "all") {
        return SAMPLE_PRODUCTS.filter((p) => p.category === category);
      }
      return SAMPLE_PRODUCTS;
    },
    staleTime: 1e3 * 60 * 5
  });
}
function useProduct(id) {
  void useActor(createActor);
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      return SAMPLE_PRODUCTS.find((p) => p.id === id) ?? null;
    },
    enabled: !!id,
    staleTime: 1e3 * 60 * 5
  });
}
function useOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return [];
    },
    enabled: !!actor && !isFetching
  });
}
function useOrder(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      if (!actor) return null;
      return null;
    },
    enabled: !!actor && !isFetching && !!id
  });
}
export {
  useProduct as a,
  useOrders as b,
  useOrder as c,
  useProducts as u
};
