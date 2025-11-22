"use client";

import { NavLink } from "@mantine/core";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navItems, supplierNavItems } from "@/lib/utils/constants";
import { useAppSelector } from "@/lib/redux/hooks";

export function Navigation() {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  
  // Determine if user is a supplier
  const isSupplier = user?.roles?.[0]?.name === "SUPPLIER";
  const currentNavItems = isSupplier ? supplierNavItems : navItems;
  const baseHref = isSupplier ? "" : "/application";

  return (
    <>
      {currentNavItems.map((item) => {
        if (item.children) {
          return (
            <NavLink
              key={item.href}
              label={item.label}
              leftSection={<item.icon size={20} stroke={1.5} />}
              active={item.children.some(child => pathname === `${baseHref}${child.href}`)}
              variant="filled"
              mb={4}
            >
              {item.children.map((child) => (
                <NavLink
                  key={child.href}
                  component={Link}
                  href={`${baseHref}${child.href}`}
                  label={child.label}
                  active={pathname === `${baseHref}${child.href}`}
                  variant="filled"
                />
              ))}
            </NavLink>
          );
        }
        
        return (
          <NavLink
            key={item.href}
            component={Link}
            href={item.href}
            label={item.label}
            leftSection={<item.icon size={20} stroke={1.5} />}
            active={pathname === item.href}
            variant="filled"
            mb={4}
          />
        );
      })}
    </>
  );
}
