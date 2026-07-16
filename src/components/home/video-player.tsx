export default function VideoPlayer() {
    return (
        <video
            className='max-w-screen-xl w-full h-auto shadow-md xl:rounded-xl mx-auto'
            autoPlay
            muted
            loop
            playsInline>
            <source src='/hero.mp4' type='video/mp4' />
            Your browser does not support the video tag.
        </video>
    );
}
