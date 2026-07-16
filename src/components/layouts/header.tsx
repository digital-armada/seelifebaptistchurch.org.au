'use client';
import React, { Fragment, useState } from 'react';
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    Transition,
} from '@headlessui/react';
import navigation from '@/src/config/menuConstants';
import Container from '@/src/components/container';
import {
    Bars3Icon,
    ChevronDownIcon,
    XMarkIcon,
} from '@heroicons/react/16/solid';

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
}
export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className='bg-white '>
            <Container>
                <nav
                    className='flex items-center justify-between'
                    aria-label='Global'>
                    {/* LOGO */}
                    <div className='flex lg:flex-1'>
                        <a href='/' className='-m-1.5 p-1.5 cursor-pointer'>
                            <img
                                className='w-auto h-14'
                                src='/images/logo.png'
                                alt='see life logo'
                            />
                        </a>
                    </div>

                    <div className='flex lg:hidden'>
                        <button
                            type='button'
                            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
                            onClick={() => setMobileMenuOpen(true)}>
                            <span className='sr-only'>Open main menu</span>
                            <Bars3Icon className='w-6 h-6' aria-hidden='true' />
                        </button>
                    </div>

                    <PopoverGroup className='hidden lg:flex lg:gap-x-12'>
                        {navigation.map(item => (
                            <Popover key={item.name} className='relative'>
                                {item.subItems ? (
                                    <PopoverButton className='flex items-center text-sm font-semibold leading-6 text-gray-900 gap-x-1'>
                                        {item.name}
                                        <ChevronDownIcon
                                            className='flex-none w-5 h-5 text-gray-400'
                                            aria-hidden='true'
                                        />
                                    </PopoverButton>
                                ) : (
                                    <a
                                        href={item.href || '#'}
                                        className='text-sm font-semibold leading-6 text-gray-900'>
                                        {item.name}
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
                                        <Popover.Panel className='absolute z-10 mt-3 overflow-hidden bg-white shadow-lg -left-40 top-full w-60 rounded-3xl ring-1 ring-gray-900/5'>
                                            <div className='p-4'>
                                                {item.subItems.map(subItem => (
                                                    <a
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className='relative flex items-center p-4 text-sm leading-6 rounded-lg group gap-x-6 hover:bg-gray-50'>
                                                        {subItem.name}{' '}
                                                    </a>
                                                ))}
                                            </div>
                                            {/* Other content for calls to action */}
                                        </Popover.Panel>
                                    </Transition>
                                )}
                            </Popover>
                        ))}

                        {/* Calls to action */}
                    </PopoverGroup>
                </nav>

                <Dialog
                    as='div'
                    className='lg:hidden'
                    open={mobileMenuOpen}
                    onClose={setMobileMenuOpen}>
                    <div className='fixed inset-0 z-10' />
                    <DialogPanel className='fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
                        <div className='flex items-center justify-between'>
                            <a href='#' className='-m-1.5 p-1.5'>
                                <img
                                    className='w-auto h-16'
                                    src='/images/logo.png'
                                    alt=''
                                />
                            </a>
                            <button
                                type='button'
                                className='-m-2.5 rounded-md p-2.5 text-gray-700'
                                onClick={() => setMobileMenuOpen(false)}>
                                <span className='sr-only'>Close menu</span>
                                <XMarkIcon
                                    className='w-6 h-6'
                                    aria-hidden='true'
                                />
                            </button>
                        </div>
                        <div className='flow-root mt-6'>
                            <div className='-my-6 divide-y divide-gray-500/10'>
                                <div className='py-6 space-y-2'>
                                    {navigation.map(item => (
                                        <React.Fragment key={item.name}>
                                            {item.subItems ? (
                                                <Disclosure>
                                                    {({ open }) => (
                                                        <>
                                                            <DisclosureButton className='flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                                                                {item.name}
                                                                <ChevronDownIcon
                                                                    className={classNames(
                                                                        open
                                                                            ? 'rotate-180'
                                                                            : '',
                                                                        'h-5 w-5 flex-none'
                                                                    )}
                                                                    aria-hidden='true'
                                                                />
                                                            </DisclosureButton>
                                                            <DisclosurePanel className='mt-2 space-y-2'>
                                                                {item.subItems.map(
                                                                    subItem => (
                                                                        <a
                                                                            key={
                                                                                subItem.name
                                                                            }
                                                                            href={
                                                                                subItem.href
                                                                            }
                                                                            className='block py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50'>
                                                                            {
                                                                                subItem.name
                                                                            }
                                                                        </a>
                                                                    )
                                                                )}
                                                            </DisclosurePanel>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            ) : (
                                                <a
                                                    href={item.href}
                                                    className='block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50'>
                                                    {item.name}
                                                </a>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </Container>
        </div>
    );
}
