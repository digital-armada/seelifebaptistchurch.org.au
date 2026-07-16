import Container from '@/src/components/container';

const data = {
    items: [
        {
            icon: (
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='w-6 h-6 text-cerulean-600'>
                    <path d='M14.916 2.404a.75.75 0 01-.32 1.012l-.596.31V17a1 1 0 01-1 1h-2.26a.75.75 0 01-.75-.75v-3.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.5a.75.75 0 01-.75.75h-3.5a.75.75 0 010-1.5H2V9.957a.75.75 0 01-.596-1.372L2 8.275V5.75a.75.75 0 011.5 0v1.745l10.404-5.41a.75.75 0 011.012.32zM15.861 8.57a.75.75 0 01.736-.025l1.999 1.04A.75.75 0 0118 10.957V16.5h.25a.75.75 0 110 1.5h-2a.75.75 0 01-.75-.75V9.21a.75.75 0 01.361-.64z' />
                </svg>
            ),
            name: 'Address',
            info: '40 Braithwaite St, Yeppoon QLD 4703',
        },
        {
            icon: (
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='w-6 h-6 text-cerulean-600'>
                    <path
                        fillRule='evenodd'
                        d='M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z'
                        clipRule='evenodd'
                    />
                </svg>
            ),
            name: 'Email',
            info: 'info@seelifebaptistchurch.org.au',
        },
        {
            icon: (
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='w-6 h-6 text-cerulean-600'>
                    <path
                        fillRule='evenodd'
                        d='M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z'
                        clipRule='evenodd'
                    />
                </svg>
            ),
            name: 'Phone',
            info: '0456 226 725',
        },
    ],
};

export default function Visit() {
    return (
        <div className='bg-mako-200'>
            <Container>
                <div className='grid lg:grid-cols-2 gap-8 py-12'>
                    {/* Left Column - Contact Information */}
                    <div className='text-mako-700'>
                        <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-8'>
                            Get In Touch.
                            <br />
                            Or Come and Visit.
                        </h2>

                        <div className='space-y-6'>
                            <div className='space-y-4 font-light'>
                                {data.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className='flex items-start space-x-4 p-4 bg-white/50 rounded-lg'>
                                        <div className='flex-shrink-0 mt-1'>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className='font-semibold text-mako-800 mb-1 text-xs'>
                                                {item.name}
                                            </div>
                                            <div className='text-mako-700'>
                                                {item.info}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='pt-4'>
                                <a
                                    href='/contact'
                                    className='inline-flex items-center rounded-md bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors'>
                                    We look forward to meeting you
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Map */}
                    <div className='lg:pl-8'>
                        <iframe
                            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.203013264147!2d150.73649087531695!3d-23.12625357910117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6bc2e7b40f824441%3A0x95bd553513c7162f!2sSee%20Life%20Baptist%20Church!5e0!3m2!1sen!2sau!4v1692535596546!5m2!1sen!2sau'
                            className='w-full h-96 lg:h-[500px] rounded-lg shadow-lg'
                            style={{ border: '0' }}
                            allowFullScreen={false}
                            loading='lazy'
                            referrerPolicy='no-referrer-when-downgrade'
                            title='See Life Baptist Church Location'></iframe>
                    </div>
                </div>
            </Container>
        </div>
    );
}
