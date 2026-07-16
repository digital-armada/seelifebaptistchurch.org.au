import Link from 'next/link';
import Image from 'next/image';
import { getServices } from '@/src/features/service-times/actions';
import navigation from '@/src/config/menuConstants';
import Container from '@/src/components/container';

export default async function Footer() {
    let services: { id: string; name: string; time: string }[] = [];
    try {
        const result = await getServices();
        if (result.success && result.data) {
            services = result.data;
        } else {
            console.error('Footer: Failed to fetch service times.');
        }
    } catch (error) {
        console.error('Footer: Error fetching service times:', error);
    }

    const allLinks = navigation.flatMap(item =>
        item.subItems ? item.subItems : [item]
    );

    return (
        <div className='bg-mako-900 text-mako-200'>
            <Container>
                <div className='py-6 sm:py-8'>
                    {/* Logo Section - Top, centered */}
                    <div className='flex justify-center mb-8'>
                        <div className='w-32 sm:w-40'>
                            <Image
                                src='/images/logoFooter.png'
                                alt='See Life Baptist Church Logo'
                                width={200}
                                height={100}
                                className='w-full h-auto'
                                priority={false}
                            />
                        </div>
                    </div>

                    {/* Single Column Layout - All centered */}
                    <div className='flex flex-col items-center gap-6 mb-8'>
                        {/* Navigation Items */}
                        <ul className='flex flex-col md:flex-row md:gap-8 gap-2 text-center'>
                            {allLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.href}
                                        className='text-sm font-light hover:text-white transition-colors'>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Facebook Icon */}
                        <div className='text-center'>
                            <a
                                href='https://www.facebook.com/profile.php?id=61552330245258'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors'
                                aria-label='Visit our Facebook page'>
                                <svg
                                    className='w-5 h-5 fill-current'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Bottom Footer - Tighter spacing */}
            <div className='min-h-4'>
                <div className='max-w-6xl px-4 mx-auto text-xs font-light text-center'>
                    <hr className='border-mako-400 opacity-40' />
                    <p className='py-2'>
                        © {new Date().getFullYear()} See Life Baptist Church.
                        All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
