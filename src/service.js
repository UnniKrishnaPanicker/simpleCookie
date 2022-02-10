const Header = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    "auth-cookie": "1",
    realm: "Express_Scripts",
  };
};

async function FetchConfig({ anonymous, query }) {
  return await new Promise((resolve, reject) => {
    const url = anonymous
      ? "http://sandbox.dcp.infra.ra.com/graphql"
      : "http://sandbox.dcp.infra.ra.com/shield/graphql";
    fetch(url, {
      method: "POST",
      credentials: "same-origin",
      withCredentials: "true",
      headers: Header(),
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve({ status: 200, data: data.data, error: data.errors || [] });
      })
      .catch((error) => {
        reject({ status: 400, error });
      });
  });
}

export default FetchConfig;
