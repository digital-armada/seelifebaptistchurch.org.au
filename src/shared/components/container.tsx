export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full max-w-6xl px-10 py-8 mx-auto '>{children}</div>
    );
}
