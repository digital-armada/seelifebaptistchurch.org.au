import Link from 'next/link';
import HeadingHome from '@/src/components/heading.home';

export default function StatementOfFaithSection() {
    return (
        <section className='relative py-20 overflow-hidden bg-mystic-50 isolate px-4'>
            <div className='max-w-4xl mx-auto space-y-8 text-center'>
                <HeadingHome title='What We Believe' />
                <p className='text-dark-600 leading-relaxed max-w-2xl mx-auto'>
                    Sound doctrine is essential for a life which pleases the Lord
                    Jesus Christ. Our Statement of Faith is an accurate statement
                    of essential Christian doctrines, with the Bible remaining
                    our final authority.
                </p>
                <Link
                    href='/what-we-believe'
                    className='inline-block px-8 py-3 bg-cerulean-600 text-white font-medium rounded-lg hover:bg-cerulean-700 transition-colors'>
                    Explore Our Beliefs
                </Link>
            </div>
        </section>
    );
}
