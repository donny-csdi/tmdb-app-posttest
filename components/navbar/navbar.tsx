import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ModeToggle } from "../ui/theme";

export const logo = "/img/logo.png";

export default function NavbarHeader() {
  const router = useRouter();

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" color="foreground">
          <Image src={logo} alt="Logo" height={48} width={48} />
          <h1 className="px-2 font-bold text-inherit cursor-pointer">
            Donny`s Cinema
          </h1>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={router.pathname.includes("now-playing")}>
          <Link
            color={
              router.pathname.includes("now-playing") ? "primary" : "foreground"
            }
            href="now-playing"
            aria-current="page"
          >
            Now Playing
          </Link>
        </NavbarItem>
        <NavbarItem isActive={router.pathname.includes("popular")}>
          <Link
            color={
              router.pathname.includes("popular") ? "primary" : "foreground"
            }
            href="/popular"
          >
            Popular
          </Link>
        </NavbarItem>
        <NavbarItem isActive={router.pathname.includes("upcoming")}>
          <Link
            color={
              router.pathname.includes("upcoming") ? "primary" : "foreground"
            }
            href="upcoming"
          >
            Upcoming
          </Link>
        </NavbarItem>
        <NavbarItem isActive={router.pathname.includes("favorites")}>
          <Link
            color={
              router.pathname.includes("favorites") ? "primary" : "foreground"
            }
            href="favorites"
          >
            Favorites
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ModeToggle />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
