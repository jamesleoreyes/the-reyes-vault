import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@src/components/ui/tooltip";
import { Constants, UserRoleEnum } from "@supabase/types";


interface RoleSelectProps {
  role: UserRoleEnum;
  onValueChange: (value: UserRoleEnum) => void;
  disabled: boolean;
}

export function RoleSelect({ role, onValueChange, disabled }: RoleSelectProps) {
  const select = (
    <Select
      name="role"
      value={role}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        {Constants.public.Enums.user_role.map(roleValue => (
          <SelectItem key={roleValue} value={roleValue}>
            {roleValue.charAt(0).toUpperCase() + roleValue.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  if (disabled) {
    return (
      <>
        <input type="hidden" name="role" value={role} />
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <span>{select}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>You cannot change your own role.</p>
          </TooltipContent>
        </Tooltip>
      </>
    );
  }

  return select;
}