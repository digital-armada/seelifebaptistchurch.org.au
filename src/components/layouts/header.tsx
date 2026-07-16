'use client';
import React, { Fragment, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
    Popover,
    PopoverButton,
    PopoverGroup,
    Transition,
} from '@headlessui/react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/src/components/ui/collapsible';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/src/components/ui/sheet';
import { cn } from '@/src/lib/utils';
import navigation from '@/src/config/menuConstants';
import { ChevronDown, Menu, X } from 'lucide-react';

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
}

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isActive = (item: (typeof navigation)[number]) => {
        if (item.href && pathname === item.href) return true;
        if (item.subItems) {
            return item.subItems.some(sub => pathname === sub.href);
        }
        return false;
    };

    return (
        <div className='bg-white/80 backdrop-blur-sm'>
            <div className='w-full max-w-6xl px-10 py-4 mx-auto'>
                <nav
                    className='flex items-center justify-between py-1'
                    aria-label='Global'>
                    {/* LOGO */}
                    <div className='flex lg:flex-1'>
                        <a href='/' className='-m-1 p-1 transition-transform duration-200 hover:scale-105'>
                            <img
                                className='w-auto h-9'
                                src='/images/logo.png'
                                alt='see life logo'
                            />
                        </a>
                    </div>

                    <div className='flex lg:hidden'>
                        <button
                            type='button'
                            className='-m-2 inline-flex cursor-pointer items-center justify-center rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100'
                            onClick={() => setMobileMenuOpen(true)}>
                            <span className='sr-only'>Open main menu</span>
                            <Menu className='w-5 h-5' aria-hidden='true' />
                        </button>
                    </div>

                    <PopoverGroup className='hidden lg:flex lg:gap-x-2'>
                        {navigation.map(item => {
                            const navLinkClass =
                                'relative flex cursor-pointer items-center text-[13px] font-medium tracking-wide leading-6 gap-x-1 rounded-lg px-3 py-1.5 outline-hidden transition-all duration-200 ' +
                                (isActive(item)
                                    ? 'text-blue-600 bg-blue-50/60'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50');
                            return (
                                <Popover key={item.name} className='relative'>
                                    {item.subItems ? (
                                        <PopoverButton className={navLinkClass}>
                                            <span>{item.name}</span>
                                            <ChevronDown
                                                className='flex-none w-3.5 h-3.5 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180'
                                                aria-hidden='true'
                                            />
                                        </PopoverButton>
                                    ) : (
                                        <a href={item.href || '#'} className={navLinkClass}>
                                            <span>{item.name}</span>
                                        </a>
                                    )}

                                    {item.subItems && (
                                        <Transition
                                            as={React.Fragment}
                                            enter='transition ease-out duration-200'
                                            enterFrom='opacity-0 translate-y-1'
                                            enterTo='opacity-100 translate-y-0'
                                            leave='transition ease-in duration-150'
                                            leaveFrom='opacity-100 translate-y-0'
                                            leaveTo='opacity-0 translate-y-1'>
                                            <Popover.Panel className='absolute z-10 mt-2 overflow-hidden bg-white shadow-xl ring-1 ring-gray-900/5 rounded-xl -left-20 top-full w-52'>
                                                <div className='p-1.5'>
                                                {item.subItems.map(subItem => (
                                                    <a
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className={'relative flex cursor-pointer items-center px-3 py-1.5 text-[13px] font-medium tracking-wide leading-5 rounded-lg transition-colors duration-150 gap-x-3 hover:bg-gray-50 ' + (pathname === subItem.href ? 'text-blue-600 bg-blue-50/60' : 'text-gray-700 hover:text-gray-900')}>
                                                        {subItem.name}
                                                    </a>
                                                ))}
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    )}
                                </Popover>
                            );
                        })}
                    </PopoverGroup>
                </nav>

                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetContent
                        side='right'
                        className='w-[85%] max-w-sm gap-0 p-0'>
                        <SheetHeader className='flex flex-row items-center justify-between border-b border-gray-100 p-3'>
                            <SheetTitle className='sr-only'>Navigation</SheetTitle>
                            <a
                                href='/'
                                className='-m-1 cursor-pointer p-1'
                                onClick={() => setMobileMenuOpen(false)}>
                                <img
                                    className='w-auto h-9'
                                    src='/images/logo.png'
                                    alt='see life logo'
                                />
                            </a>
                        </SheetHeader>

                        <nav className='flex-1 overflow-y-auto px-3 py-2'>
                            <div className='space-y-1'>
                                {navigation.map(item => (
                                    <React.Fragment key={item.name}>
                                        {item.subItems ? (
                                            <Collapsible className='group/collapsible'>
                                                <CollapsibleTrigger
                                                    className={cn(
                                                        'flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-2.5 text-[15px] font-medium tracking-wide leading-6 transition-colors duration-200 hover:bg-gray-50',
                                                        isActive(item)
                                                            ? 'text-blue-600'
                                                            : 'text-gray-900'
                                                    )}>
                                                    {item.name}
                                                    <ChevronDown
                                                        className='h-4 w-4 flex-none text-gray-400 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180'
                                                        aria-hidden='true'
                                                    />
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className='overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
                                                    <div className='mt-1 mb-2 space-y-1'>
                                                        {item.subItems.map(
                                                            subItem => (
                                                                <a
                                                                    key={
                                                                        subItem.name
                                                                    }
                                                                    href={
                                                                        subItem.href
                                                                    }
                                                                    onClick={() =>
                                                                        setMobileMenuOpen(
                                                                            false
                                                                        )
                                                                    }
                                                                    className={cn(
                                                                        'block cursor-pointer py-1.5 pl-8 pr-4 text-[13px] font-medium leading-6 rounded-lg transition-colors duration-150 hover:bg-gray-50',
                                                                        pathname ===
                                                                            subItem.href
                                                                            ? 'text-blue-600 bg-blue-50/60'
                                                                            : 'text-gray-600'
                                                                    )}>
                                                                    {
                                                                        subItem.name
                                                                    }
                                                                </a>
                                                            )
                                                        )}
                                                    </div>
                                                </CollapsibleContent>
                                            </Collapsible>
                                        ) : (
                                            <SheetClose asChild>
                                                <a
                                                    href={item.href}
                                                    className={cn(
                                                        'block cursor-pointer px-4 py-2.5 text-[15px] font-medium tracking-wide leading-6 rounded-xl transition-colors duration-200 hover:bg-gray-50',
                                                        isActive(item)
                                                            ? 'text-blue-600'
                                                            : 'text-gray-900'
                                                    )}>
                                                    {item.name}
                                                </a>
                                            </SheetClose>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}
