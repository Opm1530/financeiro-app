'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Users, Briefcase, Calendar } from 'lucide-react'

export function MainNav() {
    const pathname = usePathname()

    const routes = [
        {
            href: '/',
            label: 'Dashboard',
            icon: LayoutDashboard,
            active: pathname === '/',
        },
        {
            href: '/clients',
            label: 'Clients',
            icon: Users,
            active: pathname.startsWith('/clients'),
        },
        {
            href: '/services',
            label: 'Services',
            icon: Briefcase,
            active: pathname.startsWith('/services'),
        },
        {
            href: '/social-media',
            label: 'Social Media',
            icon: Calendar,
            active: pathname.startsWith('/social-media'),
        },
    ]

    return (
        <nav className="flex items-center space-x-4 lg:space-x-6">
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "flex items-center text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "text-primary" : "text-muted-foreground"
                    )}
                >
                    <route.icon className="mr-2 h-4 w-4" />
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}
