import axios from "axios";

export default async id => {
  const resp = await axios.get("/articles/get10Articals", {
    params: {
      id: id || 0
    }
  });

  return resp.data.results;
};
