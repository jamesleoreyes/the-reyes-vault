import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { RoleEnum } from "@/types/enums";


interface RoleSelectProps {
  role: RoleEnum;
  onValueChange: (value: RoleEnum) => void;
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
        <SelectItem value={RoleEnum.MEMBER}>Member</SelectItem>
        <SelectItem value={RoleEnum.ADMIN}>Admin</SelectItem>
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