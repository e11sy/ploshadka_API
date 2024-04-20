import type { Repositories } from '@repository/index.js';
import AuthService from "./service/auth.js";

export interface DomainServices {
  eventsService: EventsService;

  userService: UserService;

  authService: AuthService;
};
