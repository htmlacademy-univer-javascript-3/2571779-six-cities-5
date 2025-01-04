import {State} from '../../types/state';
import {AuthorizationStatus, NameSpace} from '../../shared/const';
import {User} from '../../models/user';

export const getLocalUser = (state: State): User | null => state[NameSpace.User].localUser;
export const getAuthStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authStatus;
