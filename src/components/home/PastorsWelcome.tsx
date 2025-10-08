import HeadingHome from '@/src/components/heading.home';

export default function PastorsWelcome() {
    return (
        <>
            <section className='relative py-20 overflow-hidden bg-white isolate sm:py-24 px-4'>
                <div className='max-w-5xl mx-auto space-y-8'>
                    <HeadingHome title='Pastor of See Life Baptist Church' />

                    <div className='text-center'>
                        {`“Welcome! That’s the first thing you will notice
                            about See Life Baptist Church. We are a loving
                            welcoming body of believers in the Lord Jesus
                            Christ! John 13:36 By this shall all men know that
                            ye are my disciples, if ye have love one to another.
                            In a rapidly changing world, many individuals are
                            seeking the constants. At See Life Baptist Church we
                            have charted our course and remain steadfast in our
                            direction. We provide assurance that our direction,
                            and adherence to Bible standards and doctrines will
                            remain unchanged once you become part of our
                            community. We are here to glorify God and make Him
                            known to our community.`}
                    </div>

                    <div className='grid grid-cols-10 pt-10'>
                        <div className='flex items-center col-span-10 gap-4 mx-auto sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-4'>
                            <img
                                className='object-cover w-20 h-20 rounded-full '
                                src={'/avatar.png'}
                                alt=''
                            />
                            <div className=''>
                                <img src='/images/sig.png' className='h-10' />

                                <div className='text-xs text-mako-600 font-extralight'>
                                    Pastor of See Life Baptist Church
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </figure> */}
                </div>
            </section>
        </>
    );
}
