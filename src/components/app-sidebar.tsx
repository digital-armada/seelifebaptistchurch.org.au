'use client';

import * as React from 'react';
import { BookOpen, Calendar, Settings2, Users, HelpCircle } from 'lucide-react';

import { NavMain } from '@/src/components/nav-main';
import { NavUser } from '@/src/components/nav-user';
import { TeamSwitcher } from '@/src/components/team-switcher';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/src/components/ui/sidebar';

// Dashboard navigation data
const data = {
    user: {
        name: 'Admin',
        email: 'admin@seelifebaptist.com',
        avatar: '/avatar.png',
    },
    teams: [
        {
            name: 'See Life Baptist',
            logo: BookOpen,
            plan: 'Church',
        },
    ],
    navMain: [
        {
            title: 'Users',
            url: '/dashboard/users',
            icon: Users,
        },
        {
            title: 'Service Times',
            url: '/dashboard/service-times',
            icon: Calendar,
        },
        {
            title: 'Statement of Faith',
            url: '/dashboard/statement-of-faith',
            icon: BookOpen,
        },
        {
            title: 'FAQ',
            url: '/dashboard/faq',
            icon: HelpCircle,
        },
        // {
        //     title: 'Settings',
        //     url: '/dashboard/settings',
        //     icon: Settings2,
        // },
    ],
    projects: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible='icon' {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
