import VideoPlayer from '@/src/components/home/video-player';
import ServiceTimes from '@/src/components/home/ServiceTimes';
import { FAQ } from '@/src/components/home/FAQ';

import { getServices } from '@/src/features/service-times/actions';
import { getFAQs } from '@/src/features/faq/actions';
import { queryKeys } from '@/src/lib/queryKeys';
import { getQueryClient } from '@/src/lib/queryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import PastorsWelcome from '@/src/components/home/PastorsWelcome';

export default async function HomePage() {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: queryKeys.serviceTimes.lists(),
        queryFn: async () => {
            const result = await getServices();
            if (!result.success) throw new Error(result.error);
            return result.data;
        },
    });

    await queryClient.prefetchQuery({
        queryKey: queryKeys.faqs.lists(),
        queryFn: async () => {
            const result = await getFAQs();
            if (!result.success) throw new Error(result.error);
            return result.data;
        },
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className=' justify-center bg-sirocco-200 '>
                <VideoPlayer />
                <ServiceTimes />
            </div>
            <PastorsWelcome />
            <FAQ />
        </HydrationBoundary>
    );
}
