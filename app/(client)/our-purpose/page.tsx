import PageHeader from '@/src/components/PageHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Purpose | See Life Baptist Church',
    description:
        "Learn about See Life Baptist Church's purpose in fulfilling the Great Commission through worship, evangelism, discipleship, and community outreach.",
};

export default function OurPurposePage() {
    return (
        <div className='min-h-screen bg-gray-50'>
            <PageHeader
                title='Our Purpose'
                sub="See Life Baptist Church is going forth preaching a great message (the Gospel), fulfilling the great commission, and living the great commandment for God's glory."
            />

            <div className='container mx-auto px-4 py-12'>
                <div className='max-w-4xl mx-auto'>
                    <div className='text-center mb-12'>
                        <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                            The Great Commission
                        </h2>
                    </div>

                    <div className='rounded-lg p-8 mb-8'>
                        <div className='prose prose-lg max-w-none text-gray-700'>
                            <p className='mb-8'>
                                See Life Baptist Church is going forth preaching
                                a great message (the Gospel), fulfilling the
                                great commission, and living the great
                                commandment for God's glory.
                            </p>

                            <div className='mb-8'>
                                <blockquote className='text-base italic text-gray-600 mb-4 border-l-4 border-cerulean pl-4'>
                                    "Go ye therefore, and teach all nations,
                                    baptizing them in the name of the Father,
                                    and of the Son, and of the Holy Ghost:
                                    Teaching them to observe all things
                                    whatsoever I have commanded you: and, lo, I
                                    am with you alway, even unto the end of the
                                    world. Amen."
                                    <cite className='text-sm not-italic text-gray-500 block mt-2'>
                                        Matthew 28:19-20
                                    </cite>
                                </blockquote>

                                <blockquote className='text-base italic text-gray-600 border-l-4 border-cerulean pl-4'>
                                    "Master, which is the great commandment in
                                    the law? Jesus said unto him, Thou shalt
                                    love the Lord thy God with all thy heart,
                                    and with all thy soul, and with all thy
                                    mind. This is the first and great
                                    commandment. And the second is like unto it,
                                    Thou shalt love thy neighbour as thyself. On
                                    these two commandments hang all the law and
                                    the prophets."
                                    <cite className='text-sm not-italic text-gray-500 block mt-2'>
                                        Matthew 22:36-40
                                    </cite>
                                </blockquote>
                            </div>

                            <div className='space-y-6'>
                                <div className='border-l-4 border-cerulean-600 pl-6'>
                                    <h4 className=' text-gray-900 mb-2'>
                                        <strong className='font-bold'>
                                            Exalt
                                        </strong>{' '}
                                        the Lord Jesus Christ through
                                        worshipping Jesus Christ as God
                                    </h4>
                                    <p className='text-gray-600 text-sm'>
                                        <em>Colossians 1:18-19</em>
                                    </p>
                                </div>

                                <div className='border-l-4 border-cerulean-600 pl-6'>
                                    <h4 className=' text-gray-900 mb-2'>
                                        <strong className='font-bold'>
                                            Energize
                                        </strong>{' '}
                                        people to love God with all their hearts
                                        through preaching God's Word and
                                        Christ-honouring music
                                    </h4>
                                    <p className='text-gray-600 text-sm'>
                                        <em>Matthew 22:38</em>
                                    </p>
                                </div>

                                <div className='border-l-4 border-cerulean-600 pl-6'>
                                    <h4 className=' text-gray-900 mb-2'>
                                        <strong className='font-bold'>
                                            Embrace
                                        </strong>{' '}
                                        them into our church family through
                                        membership and fellowship
                                    </h4>
                                    <p className='text-gray-600 text-sm'>
                                        <em>Acts 2:41</em>
                                    </p>
                                </div>

                                <div className='border-l-4 border-cerulean-600 pl-6'>
                                    <h4 className=' text-gray-900 mb-2'>
                                        <strong className='font-bold'>
                                            Educate
                                        </strong>{' '}
                                        them in Bible doctrines and Christian
                                        living through Sunday schools and
                                        discipleship
                                    </h4>
                                    <p className='text-gray-600 text-sm'>
                                        <em>2 Timothy 2:15</em>
                                    </p>
                                </div>

                                <div className='border-l-4 border-cerulean-600 pl-6'>
                                    <h4 className=' text-gray-900 mb-2'>
                                        <strong className='font-bold'>
                                            Encourage
                                        </strong>{' '}
                                        them to be involved in ministry through
                                        various ministry opportunities
                                    </h4>
                                    <p className='text-gray-600 text-sm'>
                                        <em>Psalm 100:2</em>
                                    </p>
                                </div>

                                <div className='border-l-4 border-cerulean-600 pl-6'>
                                    <h4 className=' text-gray-900 mb-2'>
                                        <strong className='font-bold'>
                                            Evangelize
                                        </strong>{' '}
                                        Yeppoon and surrounding areas with the
                                        Gospel of Jesus Christ through
                                        evangelistic opportunities
                                    </h4>
                                    <p className='text-gray-600 text-sm'>
                                        <em>Psalms 126:5-6</em>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
