'use client';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VerifyPage() {

    const [infoMessage, setInfoMessage] = useState('');
    const [infoColor, setInfoColor] = useState('');
    const params = useSearchParams();

    const router = useRouter();

    const handleConfirmation = async () => {
        const uuid = params.get("token");
        const email = params.get("email");
        const response = await axios.put(`/api/user/activate`, { uuid, email });

        if (response.data.success) {
            setInfoMessage(response.data.message);
            setInfoColor("text-green-600")

            setTimeout(() => {
                router.push('/explore');
            }, 5000);

        } else {
            setInfoMessage(response.data.message);
            setInfoColor("text-red-600")
        }
    }

    return (
        <div className='bg-neutral-900 h-full flex justify-center items-center flex-col'>
            <h1 className='font-bold text-white'>ACTIVATE YOUR ACCOUNT</h1>
            <h2 className='font-bold text-white pb-5'>Email: {params.get("email")} </h2>
            <Button variant="success" onClick={handleConfirmation}>Confirm Email</Button>

            {infoMessage && <p className={`${infoColor} mt-4 -mb-4 font-bold`}>{infoMessage}</p>}
        </div>
    );
}
