import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";

export const Auth = (...roles: string[]) => {
  roles.push("Admin");
  return applyDecorators(Roles(roles), UseGuards(AuthGuard, RolesGuard));
};
