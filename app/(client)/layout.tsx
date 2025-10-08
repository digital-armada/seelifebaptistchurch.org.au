import Footer from '@/src/components/layouts/footer';
import Header from '@/src/components/layouts/header';
import PageDivTop from '@/src/components/pageDivTop';
import Visit from '@/src/components/home/Visit';
export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <PageDivTop />
            <main className='min-h-[70vh]'>{children}</main>
            <Visit />
            <Footer />
        </>
    );
}
