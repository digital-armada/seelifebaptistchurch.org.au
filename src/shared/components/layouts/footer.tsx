import Link from 'next/link';
import navigation from '@/src/shared/config/menuContants';
import Container from '@/src/shared/components/container';
import services from '@/src/shared/data/services.json';
export default async function Footer() {
    return (
        <div className='bg-mako-900 text-mako-200 '>
            <Container>
                <div className='grid grid-cols-1 gap-8 lg:grid-cols-6 sm:grid-cols-4 '>
                    <div className='w-2/3 col-span-1 mx-auto mb-10 sm:col-start-2 sm:col-span-2 lg:col-span-2'>
                        <img src='/images/logofooter.png' />
                    </div>

                    <ul role='list' className='col-span-1 sm:col-span-3 '>
                        <h3 className='mb-4 text-2xl font-bold'>
                            Service Times{' '}
                        </h3>
                        {services.map((service, idx) => (
                            <li
                                key={idx}
                                className='flex justify-between text-sm font-light gap-x-6'>
                                <div className='flex min-w-0 gap-x-4'>
                                    <div className='flex-auto min-w-0'>
                                        <p className='leading-6 '>
                                            {service?.serviceName &&
                                                service?.serviceName}
                                        </p>
                                    </div>
                                </div>
                                <div className='block shrink-0 sm:flex sm:flex-col sm:items-end'>
                                    <p className='leading-5'>
                                        {service.time && service.time}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {navigation[0] && (
                        <div key={0} className='col-span-1'>
                            <h3 className='mb-4 text-2xl font-bold'>
                                {navigation[0].name}
                            </h3>
                            <ul className='text-sm font-light'>
                                {navigation[0].subItems?.map(
                                    (subItem, subIdx) => (
                                        <li key={subIdx}>
                                            <Link href={subItem.href}>
                                                {subItem.name}
                                            </Link>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </Container>

            {/* BOTTOM FOOTER */}
            <div className='h-10 divide-x-2'>
                <div className='max-w-6xl px-4 mx-auto text-xs font-light text-center'>
                    <hr className='pt-2 border-1 border-mako-400 opacity-40' />
                    See Life Baptist Church
                </div>
            </div>
            {/* BOTTOM FOOTER */}
        </div>
    );
}
