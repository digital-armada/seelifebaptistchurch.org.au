export default function VideoPlayer() {
    return (
        <div className='flex justify-center bg-sirocco-200 '>
            {/* Video element goes here */}
            <video
                className='max-w-screen-xl w-full h-auto shadow-md xl:rounded-xl '
                autoPlay
                muted
                loop
                playsInline>
                <source src='/hero.mp4' type='video/mp4' />
                {/* Add additional source elements for other video formats if needed */}
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
