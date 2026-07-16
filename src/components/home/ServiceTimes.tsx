'use client';

import { useServices } from '@/src/features/service-times/queries';
import { Calendar } from 'lucide-react';

export default function ServiceTimes() {
    const { data: services, isLoading, error } = useServices();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading services</div>;

    return (
        <div className='px-4 max-w-5xl mx-auto'>
            <div className='flex justify-center gap-4 py-20'>
                <div className='flex items-center gap-4'>
                    <Calendar />
                    <span>|</span>
                </div>
                <div>
                    <p className='text-2xl italic font-light'>Services</p>
                </div>
            </div>
            <ul role='list' className='divide-y-[0.4px] divide-gray-600 pb-10'>
                {services?.map(service => (
                    <li
                        key={service.id}
                        className='flex justify-between py-5 gap-x-6'>
                        <div className='flex min-w-0 gap-x-4'>
                            <div className='flex-auto min-w-0'>
                                <p className=' font-semibold leading-6 text-gray-900'>
                                    {service.name}
                                </p>
                                <p className='mt-1 text-sm leading-5 text-gray-500 truncate'>
                                    {service.description}
                                </p>
                            </div>
                        </div>
                        <div className='block shrink-0 sm:flex sm:flex-col sm:items-end'>
                            <p className='mt-1 text-sm leading-5 text-gray-500'>
                                {service.time}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
