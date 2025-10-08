export default function HeadingHome({ title }: { title: string }) {
    return (
        <div className='flex flex-col items-center justify-center gap-4  text-cerulean-500'>
            <h2 className='text-2xl font-bold'>{title}</h2>
        </div>
    );
}
