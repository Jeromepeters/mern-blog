import React from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Navbar, Avatar, Dropdown, TextInput, Button } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";

export default function Header() {
  const location = useLocation();
  console.log("location: ", location.pathname);
  return (
    <Navbar className=" py-2 px-10 shadow-lg">
      <Link
        to="/"
        className="self-center whitespace-nowrap font-semibold text-sm md:text-xl dark:text-white "
      >
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 rounded-lg text-white py-1 px-2">
          Sahand's
        </span>
        Blog
      </Link>
      <div className="flex order-3 gap-2 hidden">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
      </div>
      <TextInput
        id="search"
        type="text"
        rightIcon={AiOutlineSearch}
        placeholder="Search..."
        className="hidden lg:inline"
      />
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" pill color="gray">
          <FaMoon />
        </Button>
        <Link>
          <Button gradientDuoTone="purpleToBlue" outline>
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active={location.pathname === "/"}>
          Home
        </Navbar.Link>

        <Navbar.Link href="/about" active={location.pathname === "/about"}>
          About
        </Navbar.Link>
        <Navbar.Link href="/project" active={location.pathname === "/project"}>
          Project
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
