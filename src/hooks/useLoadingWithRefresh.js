import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/slice​/authSlice';
import { fetchSettings } from '../redux/slice​/settingsSlice';

export function useLoadingWithRefresh() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API_URL}/auth/refresh`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "refreshtoken": `${localStorage.getItem('refreshToken')}`
                        }
                    }
                );
                dispatch(setAuth(data));
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        })();
        dispatch(fetchSettings());
    }, []);

    return { loading };
}