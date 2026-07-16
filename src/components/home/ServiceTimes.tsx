'use client';

import { useServices } from '@/src/features/service-times/queries';
import { dayLabel, type ServiceTime } from '@/src/features/service-times/types';
import { Calendar, MapPin, Clock } from 'lucide-react';

function ServiceCard({ service }: { service: ServiceTime }) {
    return (
        <li className='group flex items-center justify-between gap-4 rounded-lg border border-mako-200 bg-white/70 px-4 py-3 shadow-sm transition-all duration-200 hover:border-cerulean-300 hover:shadow-md'>
            <div className='flex min-w-0 items-center gap-3'>
                <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cerulean-50 text-cerulean-600'>
                    <Clock className='h-4 w-4' />
                </span>
                <div className='min-w-0'>
                    <p className='truncate font-medium leading-5 text-mako-800'>
                        {service.name}
                    </p>
                    <p className='inline-flex items-center gap-1 text-xs font-normal normal-case tracking-normal text-mako-400'>
                        <Calendar className='h-3 w-3' />
                        {dayLabel(service.day)}
                    </p>
                </div>
            </div>
            <div className='shrink-0 text-right'>
                <p className='text-sm font-medium leading-5 text-mako-700'>
                    {service.time}
                </p>
                {service.description && (
                    <p className='mt-0.5 truncate text-xs text-mako-500'>
                        {service.description}
                    </p>
                )}
            </div>
        </li>
    );
}

export default function ServiceTimes() {
    const { data: services, isLoading, error } = useServices();

    return (
        <section
            aria-labelledby='service-times-heading'
            className='px-4 py-16'>
            <div className='mx-auto max-w-5xl'>
                <div className='flex flex-col items-center gap-3 text-center'>
                    <span className='flex h-14 w-14 items-center justify-center rounded-full bg-cerulean-50 text-cerulean-600'>
                        <Calendar className='h-7 w-7' />
                    </span>
                    <h2
                        id='service-times-heading'
                        className='text-3xl font-light italic tracking-tight text-mako-800 sm:text-4xl'>
                        Service Times
                    </h2>
                    <p className='mt-1 max-w-md text-sm text-mako-500'>
                        Join us for worship, prayer, and the preaching of
                        God&apos;s word. We&apos;d love to see you there.
                    </p>
                </div>

                <div className='mt-12'>
                    {isLoading ? (
                        <ul
                            className='space-y-4'
                            aria-busy='true'
                            aria-label='Loading service times'>
                            {[0, 1, 2].map(index => (
                                <li
                                    key={index}
                                    className='h-14 animate-pulse rounded-lg border border-mako-200 bg-white/60'
                                />
                            ))}
                        </ul>
                    ) : error ? (
                        <p
                            role='alert'
                            className='rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-700'>
                            We&apos;re having trouble loading our service times.
                            Please check back shortly.
                        </p>
                    ) : !services?.length ? (
                        <div className='rounded-xl border border-dashed border-mako-300 bg-white/50 px-6 py-12 text-center'>
                            <p className='text-sm text-mako-500'>
                                Our service times are being updated. Please
                                contact the church office for details.
                            </p>
                            <a
                                href='/contact'
                                className='mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cerulean-600 hover:text-cerulean-700'>
                                <MapPin className='h-4 w-4' />
                                Get in touch
                            </a>
                        </div>
                    ) : (
                        <ul className='space-y-4'>
                            {services.map(service => (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
}
