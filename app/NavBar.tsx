"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
const Navbar = () => {
  const currentPath = usePathname();
  // console.log(currentPath)

  const links = [
    {
      name: "Dashboard",
      href: "/",
    },

    {
      name: "Issues",
      href: "/issues",
    },
  ];

  return (
    <nav className="flex space-x-6 h-14 px-5 border-b mb-5 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classNames({
              "text-zinc-900": currentPath === link.href,
              "text-zinc-500": currentPath !== link.href,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};
export default Navbar;
