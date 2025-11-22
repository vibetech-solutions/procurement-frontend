"use client";

import { NavLink } from "@mantine/core";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navItems } from "@/lib/utils/constants";

export function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {navItems.map((item) => {
        if (item.children) {
          return (
            <NavLink
              key={item.href}
              label={item.label}
              leftSection={<item.icon size={20} stroke={1.5} />}
              active={item.children.some(child => pathname === `/application${child.href}`)}
              variant="filled"
              mb={4}
            >
              {item.children.map((child) => (
                <NavLink
                  key={child.href}
                  component={Link}
                  href={`/application${child.href}`}
                  label={child.label}
                  active={pathname === `/application${child.href}`}
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
            href={`/application${item.href}`}
            label={item.label}
            leftSection={<item.icon size={20} stroke={1.5} />}
            active={pathname === `/application${item.href}`}
            variant="filled"
            mb={4}
          />
        );
      })}
    </>
  );
}
