'use client';
import { useState } from 'react';
import Container from '@/src/components/container';
import { Button } from '@/src/components/ui/button';
import PageHeader from '@/src/components/PageHeader';
import { Building2, Check, Church, Copy, Info, User } from 'lucide-react';

export default function SupportPage() {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div className='min-h-screen bg-background'>
            {/* Hero Section */}

            <PageHeader
                title='Support Our Ministry'
                sub={`Your generous support helps us continue our mission to
                        share God's love and serve our community. Thank you for
                        your partnership in ministry.`}
            />
            {/* Support Options */}
            <div className='py-16 px-4'>
                <div className='max-w-2xl mx-auto space-y-6'>
                    {/* Ministry Offering Card */}
                    <div className='bg-card border border-border rounded-lg p-8 shadow-sm'>
                        <div className='flex items-start gap-4 mb-6'>
                            <div className='p-3 bg-primary/10 rounded-lg'>
                                <Church className='w-6 h-6 text-primary' />
                            </div>
                            <div className='flex-1'>
                                <h2 className='text-2xl font-semibold text-foreground mb-2'>
                                    Ministry Offering
                                </h2>
                                <p className='text-muted-foreground'>
                                    Supporting the ongoing work and mission of
                                    See Life Baptist Church
                                </p>
                            </div>
                        </div>

                        <div className='space-y-3'>
                            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                <Building2 className='w-4 h-4' />
                                <span>National Australia Bank</span>
                            </div>

                            <div className='bg-muted rounded-lg p-4 space-y-3'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <div className='text-xs text-muted-foreground mb-1'>
                                            BSB
                                        </div>
                                        <div className='font-mono text-lg text-foreground'>
                                            084 992
                                        </div>
                                    </div>
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        onClick={() =>
                                            copyToClipboard(
                                                '084992',
                                                'ministry-bsb'
                                            )
                                        }>
                                        {copiedField === 'ministry-bsb' ? (
                                            <Check className='w-4 h-4 text-green-600' />
                                        ) : (
                                            <Copy className='w-4 h-4' />
                                        )}
                                    </Button>
                                </div>

                                <div className='flex items-center justify-between'>
                                    <div>
                                        <div className='text-xs text-muted-foreground mb-1'>
                                            Account Number
                                        </div>
                                        <div className='font-mono text-lg text-foreground'>
                                            936 172 686
                                        </div>
                                    </div>
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        onClick={() =>
                                            copyToClipboard(
                                                '936172686',
                                                'ministry-account'
                                            )
                                        }>
                                        {copiedField === 'ministry-account' ? (
                                            <Check className='w-4 h-4 text-green-600' />
                                        ) : (
                                            <Copy className='w-4 h-4' />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pastoral Offering Card */}
                    <div className='bg-card border border-border rounded-lg p-8 shadow-sm'>
                        <div className='flex items-start gap-4 mb-6'>
                            <div className='p-3 bg-primary/10 rounded-lg'>
                                <User className='w-6 h-6 text-primary' />
                            </div>
                            <div className='flex-1'>
                                <h2 className='text-2xl font-semibold text-foreground mb-2'>
                                    Pastoral Offering
                                </h2>
                                <p className='text-muted-foreground'>
                                    Directly supporting our pastor.
                                </p>
                            </div>
                        </div>

                        <div className='space-y-3'>
                            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                <Building2 className='w-4 h-4' />
                                <span>National Australia Bank</span>
                            </div>

                            <div className='bg-muted rounded-lg p-4 space-y-3'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <div className='text-xs text-muted-foreground mb-1'>
                                            BSB
                                        </div>
                                        <div className='font-mono text-lg text-foreground'>
                                            084-034
                                        </div>
                                    </div>
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        onClick={() =>
                                            copyToClipboard(
                                                '084034',
                                                'pastoral-bsb'
                                            )
                                        }>
                                        {copiedField === 'pastoral-bsb' ? (
                                            <Check className='w-4 h-4 text-green-600' />
                                        ) : (
                                            <Copy className='w-4 h-4' />
                                        )}
                                    </Button>
                                </div>

                                <div className='flex items-center justify-between'>
                                    <div>
                                        <div className='text-xs text-muted-foreground mb-1'>
                                            Account Number
                                        </div>
                                        <div className='font-mono text-lg text-foreground'>
                                            90 868 0771
                                        </div>
                                    </div>
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        onClick={() =>
                                            copyToClipboard(
                                                '908680771',
                                                'pastoral-account'
                                            )
                                        }>
                                        {copiedField === 'pastoral-account' ? (
                                            <Check className='w-4 h-4 text-green-600' />
                                        ) : (
                                            <Copy className='w-4 h-4' />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className='bg-accent/50 border border-border rounded-lg p-6'>
                        <div className='flex gap-3'>
                            <Info className='w-5 h-5 text-accent-foreground flex-shrink-0 mt-0.5' />
                            <div>
                                <h3 className='text-lg font-semibold text-accent-foreground mb-2'>
                                    Thank You for Your Support
                                </h3>
                                <p className='text-accent-foreground/80 text-sm'>
                                    For any questions about giving or to discuss
                                    other ways to support our ministry, please
                                    don't hesitate to contact us.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
