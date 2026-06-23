"use client"
import { Person, HouseFill, ChartLineArrowUp, Persons, SquareDashedText, CirclePlusFill, StarFill, ArrowUpRightFromSquare, CreditCard, Bug, BookOpen, FloppyDisk } from "@gravity-ui/icons";
import { Avatar, Button, Drawer } from "@heroui/react";
import { LayoutSideContentLeft } from '@gravity-ui/icons';
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function DashboardSidebar() {

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const adminNavLinks = [
    { icon: HouseFill, href: "/", label: "Home" },
    { icon: Person, href: "/dashboard/admin", label: "My Profile" },
    { icon: ChartLineArrowUp, href: "/dashboard/admin/analytics", label: "Admin Analytics" },
    { icon: Persons, href: "/dashboard/admin/all-user", label: "All Users" },
    { icon: SquareDashedText, href: "/dashboard/admin/all-prompts", label: "All Prompts" },
    { icon: CreditCard, href: "/dashboard/admin/all-payments", label: "All Payments" },
    { icon: Bug, href: "/dashboard/admin/reported-prompts", label: "Reported Prompts" },
  ];

  const userNavLinks = [
    { icon: HouseFill, href: "/", label: "Home" },
    { icon: Person, href: "/dashboard/user", label: "My Profile" },
    { icon: CirclePlusFill, href: "/dashboard/user/prompts", label: "Add Prompts" },
    { icon: BookOpen, href: "/dashboard/user/my-prompts", label: "My Prompts" },
    { icon: FloppyDisk, href: "/dashboard/user/saved-prompts", label: "Saved Prompts" },
    { icon: StarFill, href: "/dashboard/user/my-reviews", label: "My Reviews" },
  ];

  const creatorNavLinks = [
    { icon: HouseFill, href: "/", label: "Home" },
    { icon: Person, href: "/dashboard/creator", label: "My Profile" },
    { icon: ArrowUpRightFromSquare, href: "/dashboard/creator/creator-home", label: "Creator Home" },
    { icon: CirclePlusFill, href: "/dashboard/creator/add-prompts", label: "Add Prompts" },
    { icon: BookOpen, href: "/dashboard/creator/my-prompts", label: "My Prompts" },
  ];


  const navLinksMap = {
    user: userNavLinks,
    creator: creatorNavLinks,
    admin: adminNavLinks
  }

  const navItems = navLinksMap[user?.role || 'user'];

  const navContent = <nav className="flex flex-col gap-1">
    {navItems.map((item) => (
      <Link
        key={item.label}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
        href={item.href}
      >
        <item.icon className="size-5 text-muted" />
        {item.label}
      </Link>
    ))}
  </nav>



  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">

        {/* Logo Section */}
        <div className="flex items-center justify-between shrink-0 mb-5 sm:mb-3 lg:mb-5">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600">
            <Sparkles className="h-6 w-6 text-purple-400" />
            <span>PromptVerse</span>
          </Link>
          {user?.plan && (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize tracking-wide transition-colors ${user.plan.toLowerCase() === 'premium'
              ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900'
              : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700'
              }`}>
              {user.plan}
            </span>
          )}
        </div>

        {/* User Info Card Wrapper */}
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-900/40 dark:bg-zinc-800/20 border border-zinc-800/80 dark:border-zinc-700/30 shadow-xs backdrop-blur-xs transition-all hover:bg-zinc-800/50 hover:border-zinc-700/60">

          {/* Avatar Section */}
          <div className="shrink-0">
            <Avatar className="h-9 w-9 border border-zinc-700/50 shadow-inner">
              <Avatar.Image alt="Profile Logo" src={user?.image} />
              <Avatar.Fallback className="bg-purple-500/10 text-purple-400 font-semibold text-xs">
                {user?.name?.charAt(0)?.toUpperCase()}
              </Avatar.Fallback>
            </Avatar>
          </div>

          {/* User Info Section */}
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-semibold text-zinc-100 truncate tracking-wide">
              {user?.name || 'Anonymous'}
            </span>
            <span className={`text-[11px] font-medium capitalize tracking-wider ${user?.role?.toLowerCase() === 'admin' ? 'text-red-400/90' :
                user?.role?.toLowerCase() === 'creator' ? 'text-purple-400/95' :
                  'text-zinc-400'
              }`}>
              {user?.role || 'Guest'}
            </span>
          </div>
        </div>

        {navContent}
      </aside>

      <Drawer>
        <Button className={"lg:hidden"} variant="secondary">
          <LayoutSideContentLeft />
          {/* Sidebar */}
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}