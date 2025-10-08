export default function PageHeader({
    title,
    sub,
}: {
    title: string;
    sub: string;
}) {
    return (
        <div className='pt-10 bg-neutral-300 min-h-52 px-4 pb-10'>
            <div className='max-w-6xl pt-10 md:pt-16 mx-auto text-center'>
                <h1 className='text-3xl md:text-4xl lg:text-5xl text-neutral-600'>
                    {' '}
                    {title}
                </h1>
                {sub && (
                    <p className='mt-4 italic text-sm md:text-md lg:text-lg'>
                        {sub}
                    </p>
                )}
            </div>
        </div>
    );
}
