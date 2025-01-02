import {State} from "../../types/state";
import {NameSpace} from "../../shared/const";
import {SortOption} from "../../pages/main/shared/sort-option";
import {City} from "../../models/city";

export const getSortOption = (state: State): SortOption => state[NameSpace.Navigation].sortOption;
export const getCurrentCity = (state: State): City => state[NameSpace.Navigation].currentCity;
