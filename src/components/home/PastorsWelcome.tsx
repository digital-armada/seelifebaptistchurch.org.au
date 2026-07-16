import HeadingHome from '@/src/components/heading.home';

export default function PastorsWelcome() {
    return (
        <section className='relative py-20 overflow-hidden bg-white isolate sm:py-24 px-4'>
            <div className='max-w-5xl mx-auto space-y-10'>
                <HeadingHome title='Pastor of See Life Baptist Church' />

                <blockquote className='text-center text-lg leading-relaxed text-dark-600 max-w-3xl mx-auto'>
                    {`“Welcome! That’s the first thing you will notice about See
                        Life Baptist Church. We are a loving, welcoming body of
                        believers in the Lord Jesus Christ! John 13:36 — “By this
                        shall all men know that ye are my disciples, if ye have
                        love one to another.” In a rapidly changing world, many
                        individuals are seeking the constants. At See Life Baptist
                        Church we have charted our course and remain steadfast in
                        our direction. We provide assurance that our direction,
                        and adherence to Bible standards and doctrines, will
                        remain unchanged once you become part of our community. We
                        are here to glorify God and make Him known to our
                        community.”`}
                </blockquote>

                <figure className='flex items-center gap-5 mx-auto w-max pt-2'>
                    <img
                        className='object-cover w-20 h-20 rounded-full ring-2 ring-cerulean-200'
                        src='/avatar.png'
                        alt='Portrait of the Pastor'
                    />
                    <figcaption className='space-y-1'>
                        <img
                            src='/images/sig.png'
                            className='h-10'
                            alt='Pastor’s signature'
                        />
                        <div className='text-xs text-mako-600 font-extralight'>
                            Pastor of See Life Baptist Church
                        </div>
                    </figcaption>
                </figure>
            </div>
        </section>
    );
}
