import Link from "next/link";
import {Button, buttonVariants} from "@/components/ui/button";
import ToggleTheme from './ToggleTheme';
import UserMenu from "@/components/layout/UserMenu";

const Header = () => {
  
  return (
    // <nav className={`flex justify-between p-2 max-w-4/5 mx-auto ${shouldAnimate ? 'animate-header-from-top' : '-translate-y-full'}`}>
    <nav className="flex justify-between p-2 max-w-4/5 mx-auto">
      <Button asChild variant="outline">
        <Link href="/">Home</Link>
      </Button>
      <div className="flex gap-2 items-center">
        <ToggleTheme/>
        <Link className={buttonVariants({variant: 'default'})} href="/tickets">Tickets</Link>
        <UserMenu />
      </div>
    </nav>
  );
};

export default Header;