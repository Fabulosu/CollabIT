import '../globals.css'

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='bg-neutral-900 flex justify-center items-center h-screen'>{children}</div>
    )
}