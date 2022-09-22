import reactLogo from "./assets/react.svg";
import "./App.css";
import { useQuery } from "@tanstack/react-query";

function App() {
  const fetchAPI = () => {
    return fetch(`https://reqres.in/api/products`)
      .then((response) => response.json())
      .then((responseData) => {
        return responseData;
      })
      .catch((error) => console.warn(error));
  };

  const getProducts = useQuery(["product-list"], fetchAPI, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: 10000,
  });

  const { data, isLoading, isFetching, refetch } = getProducts;

  return (
    <div className="App">
      {isFetching ? (
        "Loading"
      ) : (
        <>
          <div>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>

          <div className="card">
            {data?.data?.map((x: any) => (
              <p
                style={{
                  color: x.color,
                }}
              >
                {x.name}
              </p>
            ))}
          </div>
          <button onClick={() => refetch()}>refetch</button>
        </>
      )}
    </div>
  );
}

export default App;
