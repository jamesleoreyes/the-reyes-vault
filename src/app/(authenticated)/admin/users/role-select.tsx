import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Role } from "@/types/enums";


interface RoleSelectProps {
  role: Role;
  onValueChange: (value: Role) => void;
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
        <SelectItem value={Role.MEMBER}>Member</SelectItem>
        <SelectItem value={Role.ADMIN}>Admin</SelectItem>
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