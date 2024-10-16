"use client";

import useSWR from "swr";
import axios from "@/lib/axios";
import useFormSubmit from "@/app/lib/useFormSubmit";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function Form() {
    const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user', fetcher);
    const { handleSubmit, isLoading: isSubmitting, error: submitError, success } = useFormSubmit();
    if (isLoading || !data) return <div>Loading user data...</div>;
    if (error) return <div>Failed to load user</div>;

    return (
        <form className="flex flex-col space-y-4 max-w-md mx-auto mt-8" onSubmit={(e) => handleSubmit(e, 'POST', '/api/profile/update')}>
            {/* Form fields */}
            <input type="text" name="first_name" placeholder="First Name" defaultValue={data.first_name} className="px-4 py-2 border rounded-md"/>
            <input type="text" name="last_name" placeholder="Last Name" defaultValue={data.last_name} className="px-4 py-2 border rounded-md"/>
            <input type="email" name="email" placeholder="Email" defaultValue={data.email} className="px-4 py-2 border rounded-md"/>
            <input type="text" name="phone" placeholder="Phone" defaultValue={data.phone} className="px-4 py-2 border rounded-md"/>
            <input type="password" name="password" placeholder="Password" className="px-4 py-2 border rounded-md"/>
    
            {/* Display submission error if any */}
            {submitError && <div className="text-red-500">{submitError}</div>}

            {/* Display success message */}
            {success && <div className="text-green-500">Form submitted successfully!</div>}
    
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    )

}