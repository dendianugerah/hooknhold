import { Package2 } from "lucide-react";
import Link from "next/link";

export default function NavbarSection() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center max-w-7xl mx-auto">
      <Link className="flex items-center justify-center" href="/">
        <Package2 className="h-6 w-6" />
        <span className="sr-only">Hooknhold</span>
      </Link>
      <nav className="ml-auto flex items-center">
        <Link
          className="text-sm font-medium rounded-lg hover:bg-gray-100 px-3 py-2"
          href="/#feature"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium ml-6 rounded-lg hover:bg-gray-100 px-3 py-2"
          href="/sign-in"
        >
          Sign In
        </Link>
      </nav>
    </header>
  );
}
