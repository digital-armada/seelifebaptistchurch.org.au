import { Metadata } from 'next';
import PageHeader from '@/src/components/PageHeader';

export const metadata: Metadata = {
    title: 'Our Position | See Life Baptist Church',
    description:
        "Learn about See Life Baptist Church's doctrinal positions as an independent, fundamental, Bible-believing church with traditional worship and Biblical ordinances.",
};

export default function OurPositionPage() {
    return (
        <div className='min-h-screen bg-gray-50'>
            <PageHeader title='Our Position' sub='' />
            {/* Main Content */}
            <div className='container mx-auto px-4 py-12'>
                <div className='max-w-6xl mx-auto'>
                    {/* Position Cards Grid */}
                    <div className='grid md:grid-cols-2 gap-8 mb-12'>
                        {/* Independent */}
                        <div className=' p-8'>
                            <h3 className='text-2xl font-bold text-cerulean-700 mb-4'>
                                Independent
                            </h3>
                            <p className='text-gray-700 leading-relaxed'>
                                See Life, is an independent Baptist Church
                                meaning we are not a member of any union or
                                fellowship. This does not mean that we are
                                isolated or consider ourselves better than other
                                Baptist Churches. We are merely one "local
                                branch" of the body of Christ and we share
                                fellowship with other churches of like faith and
                                practice.
                            </p>
                        </div>

                        {/* Fundamental */}
                        <div className=' p-8'>
                            <h3 className='text-2xl font-bold text-cerulean-700 mb-4'>
                                Fundamental
                            </h3>
                            <p className='text-gray-700 leading-relaxed'>
                                Believe the entire Bible literally, which will
                                cause you to love people and live like Jesus
                                Christ lived.
                            </p>
                        </div>

                        {/* Bible-Believing */}
                        <div className=' p-8'>
                            <h3 className='text-2xl font-bold text-cerulean-700 mb-4'>
                                Bible-Believing
                            </h3>
                            <p className='text-gray-700 leading-relaxed'>
                                The King James Bible is the inspired,
                                infallible, inerrant preserved Word of God for
                                the English speaking people and the bible we use
                                at See Life Baptist Church.
                            </p>
                        </div>

                        {/* Non-Charismatic */}
                        <div className=' p-8'>
                            <h3 className='text-2xl font-bold text-cerulean-700 mb-4'>
                                Non-Charismatic
                            </h3>
                            <p className='text-gray-700 leading-relaxed'>
                                We do not believe in nor practice the modern
                                signs and wonders teachings.
                            </p>
                        </div>

                        {/* Music */}
                        <div className=' p-8'>
                            <h3 className='text-2xl font-bold text-cerulean-700 mb-4'>
                                Music
                            </h3>
                            <p className='text-gray-700 leading-relaxed'>
                                Our Worship Music is the act of loving and
                                praising God! Through the heart warming,
                                conservative music and the clear, Bible teaching
                                and preaching in our services, your heart will
                                be inspired to love and to respond to God. Each
                                week, people are strengthened, encouraged, and
                                drawn closer to Him through these special times
                                together. Each service is carefully planned and
                                prayed over so that God may work in your life.
                            </p>
                        </div>

                        {/* Two Ordinances */}
                        <div className=' p-8'>
                            <h3 className='text-2xl font-bold text-cerulean-700 mb-4'>
                                Two Ordinances
                            </h3>
                            <p className='text-gray-700 leading-relaxed mb-4'>
                                We practice two ordinances at See Life Baptist
                                Church:
                            </p>
                            <ul className='text-gray-700 space-y-2 mb-4'>
                                <li>• Believers Baptism</li>
                                <li>• Communion (Lords Supper)</li>
                            </ul>
                            <p className='text-gray-700 leading-relaxed'>
                                These are ordinances – not sacraments. They have
                                no part in salvation and only serve as pictures
                                of what Christ did for us.
                                <br />
                                <em className='text-sm'>
                                    1 Corinthians 11:2, 23-28
                                </em>
                            </p>
                        </div>
                    </div>

                    {/* Security of the Believer - Full Width */}
                    <div className=' p-8 mb-12'>
                        <h3 className='text-2xl font-bold text-cerulean-700 mb-4'>
                            Security of the Believer
                        </h3>
                        <p className='text-gray-700 leading-relaxed'>
                            All who receive Christ as Saviour, by faith are born
                            again and are eternally secure in Christ. Kept by
                            the power of God{' '}
                            <em className='text-sm'>1 Peter 1:5</em>
                        </p>
                    </div>

                    {/* Historical Baptist Doctrines */}
                    <div className=' p-8 mb-12'>
                        <div className='text-center mb-8'>
                            <h3 className='text-2xl font-bold text-cerulean-700 mb-2'>
                                We Stand on the Historical Baptist Doctrines
                                Since the Early Church
                            </h3>
                        </div>

                        <div className='grid gap-6'>
                            {/* Bible is the Final Authority */}
                            <div className='flex items-start space-x-4 p-4 '>
                                <div className='bg-cerulean-600 text-white rounded-lg w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0 mt-1'>
                                    B
                                </div>
                                <div>
                                    <h4 className='font-bold text-gray-900 mb-1'>
                                        Bible is the Final Authority
                                    </h4>
                                    <p className='text-gray-600 text-sm'>
                                        <em>2 Timothy 3:15-17</em>
                                    </p>
                                </div>
                            </div>

                            {/* Autonomy of the Local Church */}
                            <div className='flex items-start space-x-4 p-4 '>
                                <div className='bg-cerulean-600 text-white rounded-lg w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0 mt-1'>
                                    A
                                </div>
                                <div>
                                    <h4 className='font-bold text-gray-900 mb-1'>
                                        Autonomy of the Local Church
                                    </h4>
                                    <p className='text-gray-600 text-sm'>
                                        <em>2 Corinthians 8:1-5, 19, 23</em>
                                    </p>
                                </div>
                            </div>

                            {/* Priesthood of the Believer */}
                            <div className='flex items-start space-x-4 p-4 '>
                                <div className='bg-cerulean-600 text-white rounded-lg w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0 mt-1'>
                                    P
                                </div>
                                <div>
                                    <h4 className='font-bold text-gray-900 mb-1'>
                                        Priesthood of the Believer
                                    </h4>
                                    <p className='text-gray-600 text-sm'>
                                        <em>1 Peter 2:5, 9</em>
                                    </p>
                                </div>
                            </div>

                            {/* Two Offices */}
                            <div className='flex items-start space-x-4 p-4 '>
                                <div className='bg-cerulean-600 text-white rounded-lg w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0 mt-1'>
                                    T
                                </div>
                                <div>
                                    <h4 className='font-bold text-gray-900 mb-1'>
                                        Two Offices
                                    </h4>
                                    <p className='text-gray-600 text-sm'>
                                        Pastor and Deacon –{' '}
                                        <em>1 Timothy 3:1-13</em>
                                    </p>
                                </div>
                            </div>

                            {/* Individual Soul Liberty */}
                            <div className='flex items-start space-x-4 p-4 '>
                                <div className='bg-cerulean-600 text-white rounded-lg w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0 mt-1'>
                                    I
                                </div>
                                <div>
                                    <h4 className='font-bold text-gray-900 mb-1'>
                                        Individual Soul Liberty
                                    </h4>
                                    <p className='text-gray-600 text-sm'>
                                        <em>Romans 14:5, 12-14</em>
                                    </p>
                                </div>
                            </div>

                            {/* Separation of Church and State */}
                            <div className='flex items-start space-x-4 p-4 '>
                                <div className='bg-cerulean-600 text-white rounded-lg w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0 mt-1'>
                                    S
                                </div>
                                <div>
                                    <h4 className='font-bold text-gray-900 mb-1'>
                                        Separation of Church and State
                                    </h4>
                                    <p className='text-gray-600 text-sm'>
                                        <em>Romans 13:1, 2</em>
                                    </p>
                                </div>
                            </div>

                            {/* Two Ordinances */}
                            <div className='flex items-start space-x-4 p-4 '>
                                <div className='bg-cerulean-600 text-white rounded-lg w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0 mt-1'>
                                    T
                                </div>
                                <div>
                                    <h4 className='font-bold text-gray-900 mb-1'>
                                        Two Ordinances
                                    </h4>
                                    <p className='text-gray-600 text-sm'>
                                        <em>
                                            1 Corinthians 11:2, 20-34; Matthew
                                            28:19-20
                                        </em>
                                    </p>
                                </div>
                            </div>

                            {/* Security of the Believer */}
                            <div className='flex items-start space-x-4 p-4 '>
                                <div className='bg-cerulean-600 text-white rounded-lg w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0 mt-1'>
                                    S
                                </div>
                                <div>
                                    <h4 className='font-bold text-gray-900 mb-1'>
                                        Security of the Believer
                                    </h4>
                                    <p className='text-gray-600 text-sm'>
                                        <em>2 Timothy 1:12</em>
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
