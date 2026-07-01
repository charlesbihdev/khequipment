import { Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { login } from '@/routes';

export default function ForgotPassword() {
    return (
        <>
            <Head title="Forgot password" />

            <div className="space-y-4 text-center text-sm text-muted-foreground">
                <p>Password reset is temporarily unavailable.</p>
                <TextLink
                    href={login()}
                    className="text-brand-steel decoration-brand-gold/50 hover:text-brand-gold"
                >
                    Return to log in
                </TextLink>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Forgot password',
    description: 'Enter your email to receive a password reset link',
};
