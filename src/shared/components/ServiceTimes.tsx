import services from '@/src/shared/data/services.json';

export default async function ServiceTimes() {
    return (
        <ul
            role='list'
            className='divide-y-[0.4px] divide-gray-600 max-w-screen-sm mx-auto'>
            {services?.map((service, idx) => (
                <li key={idx} className='flex justify-between py-5 gap-x-6'>
                    <div className='flex min-w-0 gap-x-4'>
                        <div className='flex-auto min-w-0'>
                            <p className='text-sm font-semibold leading-6 text-gray-900'>
                                {service?.serviceName && service?.serviceName}
                            </p>
                            <p className='mt-1 text-xs leading-5 text-gray-500 truncate'>
                                {service?.description && service?.description}
                            </p>
                        </div>
                    </div>
                    <div className='block shrink-0 sm:flex sm:flex-col sm:items-end'>
                        <p className='mt-1 text-xs leading-5 text-gray-500'>
                            {service.time && service.time}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
}
