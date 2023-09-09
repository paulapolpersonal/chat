import apiFactory from "@/repositories/index";

export default ({ $axios }, inject) => {
  $axios.defaults.timeout = 30000;

  const api = apiFactory($axios);

  inject("api", api);
};
