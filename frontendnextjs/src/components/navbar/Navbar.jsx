import Link from "next/link";
import React from "react";
import styles from "./page.module.css";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Dashboard",
    url: "/dashboard",
  },
];
const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link href="/" className="text-2xl font-bold text-gray-500">
        {/* <span className="text-purple-700">C</span>reate
        <span className="text-purple-700">R</span>ead
        <span className="text-purple-700">U</span>pdate
        <span className="text-purple-700">D</span>elete */}
        CRUD
      </Link>
      <div className={styles.leftlinks}>
        {links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.links}>
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
