"use client"
import { Person, ChartLineArrowUp, Persons, SquareDashedText, CirclePlusFill, StarFill, ArrowUpRightFromSquare, CreditCard, Bug, BookOpen, FloppyDisk } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { LayoutSideContentLeft } from '@gravity-ui/icons';
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export function DashboardSidebar() {

  const { data: session, isPending } = authClient.useSession();
    const user = session?.user;


  const adminNavLinks = [
    { icon: Person, href: "/dashboard/admin", label: "My Profile" },
    { icon: ChartLineArrowUp, href: "/dashboard/admin/analytics", label: "Admin Analytics" },
    { icon: Persons, href: "/dashboard/admin/all-user", label: "All Users" },
    { icon: SquareDashedText, href: "/dashboard/admin/all-prompts", label: "All Prompts" },
    { icon: CreditCard, href: "/dashboard/admin/all-payments", label: "All Payments" },
    { icon: Bug, href: "/dashboard/admin/reported-prompts", label: "Reported Prompts" },
  ];


  const userNavLinks = [
    { icon: Person, href: "/dashboard/user", label: "My Profile" },
    { icon: CirclePlusFill, href: "/dashboard/user/prompts", label: "Add Prompts" },
    { icon: BookOpen, href: "/dashboard/user/my-prompts", label: "My Prompts" },
    { icon: FloppyDisk, href: "/dashboard/user/saved-prompts", label: "Saved Prompts" },
    { icon: StarFill, href: "/dashboard/user/my-reviews", label: "My Reviews" },

  ];

  const creatorNavLinks = [
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
        {navContent}
      </aside>
      <Drawer>
        <Button className={"lg:hidden"} variant="secondary">
          <LayoutSideContentLeft />
          Sidebar
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