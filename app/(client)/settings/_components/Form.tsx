"use client";

import useSWR from "swr";
import axios from "@/lib/axios";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function Form() {
    const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user', fetcher);
    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading user data...</div>;

    return (
        <div>
            <h1>This is the form</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}