import AppLayout from '@/layouts/app-layout';

export default function Referral(){
    return <AppLayout breadcrumbs={[
        {
            title: 'SGHPP',
            href: '/'
        },{
        title: 'Referral',
            href: ''
        }
    ]}>
        <h1>Applications</h1>
    </AppLayout>
}
