import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center space-x-2">
      <Link href={"/sign-in"}>
        <Button>Sign in</Button>
      </Link>
      <Link href={"/sign-up"}>
        <Button>Sign up</Button>
      </Link>
    </div>
  );
}
