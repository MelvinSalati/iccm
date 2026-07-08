import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import bg from '../assets/images/bg.jpg'

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Log in" />

            {/* Fixed Header with Coat of Arms and Title */}
            <div className="fixed top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-center gap-4">
                        {/* Zambian Coat of Arms - Replace with your actual image path */}
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/2/28/Coat_of_arms_of_Zambia.svg"
                            alt="Zambian Coat of Arms"
                            className="h-16 w-auto"
                        />
                        <div className="text-center">
                            <h1 className="text-xl md:text-2xl font-bold text-blue-800">
                                Integrated Cervical Cancer Management System
                            </h1>
                            <p className="text-sm text-gray-600">
                                Ministry of Health, Zambia
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Main Content - No Scrolling */}
            <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${bg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    {/* Dark Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* Content Container with Glassmorphism Effect */}
                <div className="relative z-10 w-full max-w-md px-4 mt-20">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">
                                Welcome Back
                            </h2>
                            <p className="text-white/80">
                                Enter your credentials to access your account
                            </p>
                        </div>

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email" className="text-white">
                                                Email address
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                placeholder="email@example.com"
                                                className="bg-white/90 border-white/20 focus:bg-white"
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        <div className="grid gap-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="password" className="text-white">
                                                    Password
                                                </Label>
                                                {canResetPassword && (
                                                    <TextLink
                                                        href={request()}
                                                        className="text-sm text-white/80 hover:text-white transition-colors"
                                                        tabIndex={5}
                                                    >
                                                        Forgot password?
                                                    </TextLink>
                                                )}
                                            </div>
                                            <PasswordInput
                                                id="password"
                                                name="password"
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                placeholder="Password"
                                                className="bg-white/90 border-white/20 focus:bg-white"
                                            />
                                            <InputError message={errors.password} />
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                tabIndex={3}
                                                className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                                            />
                                            <Label htmlFor="remember" className="text-white/90">
                                                Remember me
                                            </Label>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="mt-4 w-full bg-white text-black hover:bg-white/90 transition-all duration-200"
                                            tabIndex={4}
                                            disabled={processing}
                                            data-test="login-button"
                                        >
                                            {processing && <Spinner />}
                                            {processing ? 'Logging in...' : 'Log in'}
                                        </Button>
                                    </div>

                                    <div className="text-center text-sm text-white/80">
                                        Don't have an account?{' '}
                                        <TextLink
                                            href={register()}
                                            tabIndex={5}
                                            className="text-white font-semibold hover:underline"
                                        >
                                            Sign up
                                        </TextLink>
                                    </div>

                                    {status && (
                                        <div className="mt-4 text-center text-sm font-medium text-green-400 bg-green-900/50 rounded-lg p-3">
                                            {status}
                                        </div>
                                    )}
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

Login.layout = {
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
};
