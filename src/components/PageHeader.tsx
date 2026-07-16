export default function PageHeader({
    title,
    sub,
}: {
    title: string;
    sub: string;
}) {
    return (
        <div className='bg-gradient-to-b from-mystic-50 to-mystic-100 min-h-52 px-4 pt-10 pb-10'>
            <div className='max-w-6xl  mx-auto text-center'>
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-mystic-900'>
                    {title}
                </h1>
                <div className='mx-auto mt-3 h-0.5 w-16 rounded-full bg-cerulean-400' />
                {sub && (
                    <p className='mt-5 italic text-sm md:text-base lg:text-lg text-mystic-600 max-w-6xl mx-auto leading-relaxed'>
                        {sub}
                    </p>
                )}
            </div>
        </div>
    );
}
