// src/hooks/useGetAllCars.js
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCars } from '../redux/carSlice';
import { CAR_API } from '../utils/constants';

const useGetAllCars = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch(`${CAR_API}/getallcars`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch cars');
        }

        dispatch(setCars(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [dispatch]);

  return { loading, error };
};

export default useGetAllCars;
