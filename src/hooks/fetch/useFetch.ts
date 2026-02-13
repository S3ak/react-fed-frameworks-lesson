import { useState, useEffect } from "react";

interface CustomError {
  code: number;
  message: string;
}

// Type guard function
function isCustomError(error: unknown): error is CustomError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error
  );
}

const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, { ...options, signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        // Ignore AbortError - this is expected when cleanup aborts the request
        if (err instanceof Error && err.name === "AbortError") {
          console.log("Request was cancelled");
          return;
        }

        if (isCustomError(err)) {
          console.log(err.code); // TypeScript knows error is CustomError
        }

        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, options]);

  return { data, isLoading, error };
};

export default useFetch;
