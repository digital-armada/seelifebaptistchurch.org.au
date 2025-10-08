import PageHeader from '@/src/components/PageHeader';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The Pastor | See Life Baptist Church',
    description:
        'Meet Pastor Darren Christie of See Life Baptist Church. Learn about his testimony, ministry experience, and heart for serving the Yeppoon community.',
};

export default function ThePastorPage() {
    return (
        <div className='min-h-screen bg-gray-50'>
            <PageHeader
                title='The Pastor'
                sub='Meet Pastor Darren Christie and learn about his heart for ministry and the Yeppoon community.'
            />

            <div className='container mx-auto px-4 py-12'>
                <div className='max-w-5xl mx-auto'>
                    <div className=' p-8'>
                        {/* Pastor Image - Centered at top */}
                        <div className='flex justify-center mb-8'>
                            <div className='w-40 h-40 rounded-full overflow-hidden shadow-lg'>
                                <Image
                                    src='/avatar.png'
                                    alt='Pastor Darren Christie'
                                    width={160}
                                    height={160}
                                    className='w-full h-full object-cover'
                                    priority
                                />
                            </div>
                        </div>

                        {/* Pastor Content */}
                        <div className='text-center'>
                            <h2 className='text-3xl font-bold text-cerulean-600 mb-6'>
                                Pastor Darren Christie
                            </h2>

                            <div className='prose prose-lg max-w-none text-gray-700'>
                                <p className='mb-6'>
                                    {`Hi, I'm Darren Christie, Pastor of See Life
                                        Baptist Church. My wife Tracy and I have been
                                        here at See Life since January 2021. God has led
                                        us here and given us a heart for the community
                                        of Yeppoon.`}
                                </p>

                                <p className='mb-6'>
                                    {`I have an evangelistic heart and love sharing
                                        the gospel. I'm a simple man, with a simple, but
                                        powerful mission. God has given us gifts and
                                        talents and we need to use them and nurture
                                        others to use theirs for God's glory. A city on
                                        a hill is not hid, our mission is to reflect
                                        Jesus to the community and equip others to live
                                        out the abundant life that God has called them
                                        to live.`}
                                </p>

                                <h3 className='text-2xl font-semibold text-cerulean-600 mb-4'>
                                    My Story
                                </h3>
                                <p className='mb-6'>
                                    {`I was born in Melbourne, and it was there that I
                                        was invited to an AWANA kids club when I was
                                        around 8 years of age and was saved. My life was
                                        a bit dysfunctional, as shortly thereafter my
                                        father passed away and my mother really
                                        struggled; God has taught me so much and given
                                        me so much compassion for others as I know what
                                        it's like to be in the wilderness.`}
                                </p>

                                <p className='mb-6'>
                                    {`I recommitted my life to the Lord and to
                                        ministry in 2004, when I sold my (then) business
                                        and commenced my journey to Know the God of the
                                        Bible intimately and study His Word. This
                                        journey led me to Australian Baptist College
                                        where I completed a Licentiate in Theology.`}
                                </p>

                                <h3 className='text-2xl font-semibold text-cerulean-600 mb-4'>
                                    Ministry Experience
                                </h3>
                                <p className='mb-6'>
                                    {`I would call us a ministry family. If the church
                                        doors were open, we were there. Some of the
                                        ministries I have been involved in is outreach,
                                        Evangelism, Inerrant Preaching, Youth Leader,
                                        Young Adult's Ministry Leader, Sunday School
                                        Teacher, Church Deacon, Kids Club Director,
                                        Prison Chaplaincy, Religious Instruction in the
                                        school system and much more.`}
                                </p>

                                <h3 className='text-2xl font-semibold text-cerulean-600 mb-4'>
                                    Family
                                </h3>
                                <p className='mb-6'>
                                    {`I married Tracy, my childhood sweetheart and
                                        have been happily married for over 30 years. God
                                        has blessed us with 3 wonderful children, and it
                                        has been a privilege and a challenge to raise
                                        them, they are now all independent adults with
                                        families of their own.`}
                                </p>

                                <p className='mb-6'>
                                    {`I'd love to get to know you and your story too
                                        and look forward to spending time with you.`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
