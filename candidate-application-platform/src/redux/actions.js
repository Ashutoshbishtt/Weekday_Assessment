import { FETCH_JOBS_SUCCESS, FETCH_JOBS_FAILURE } from "./types";

export const fetchJobs = (limit, offset) => {
  return async dispatch => {
    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            limit: limit,
            offset: offset,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      const jobs = data.jdList;
      dispatch({ type: FETCH_JOBS_SUCCESS, payload: jobs });
    } catch (error) {
      dispatch({ type: FETCH_JOBS_FAILURE, payload: error.message });
    }
  };
};
