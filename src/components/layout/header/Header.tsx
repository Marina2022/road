import Link from "next/link";
import {Button, buttonVariants} from "@/components/ui/button";
import ToggleTheme from './ToggleTheme';
import UserMenu from "@/components/layout/header/UserMenu";
import {getAuth} from "@/features/auth/authActions";

const Header = async () => {
  
  const auth = await getAuth()

  
  return (
    <nav className="flex justify-between p-2 max-w-4/5 mx-auto">    
      <Button asChild variant="outline">
        <Link href="/public">Home</Link>
      </Button>
      <div className="flex gap-2 items-center">
        <ToggleTheme/>        
        <UserMenu user={auth.user} />
      </div>
    </nav>
  );
};

export default Header;