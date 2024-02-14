import { LogOutIcon } from 'lucide-react';

import { useAuth } from '../../app/hooks/useAuth';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './custom/dropdown-menu';

export function UserMenu() {
  const { signout, user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none" asChild>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-teal-100 bg-teal-0">
          <span className="text-sm font-medium tracking-[-0.5px] text-teal-900">
            {user?.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-32">
        <DropdownMenuItem
          className="flex cursor-pointer items-center justify-between"
          onSelect={signout}
        >
          Sair
          <LogOutIcon className="h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
