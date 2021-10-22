import {createAction} from '@ngrx/store';

export enum SeasonActions {
    SEASON_SELECTED = '[Season] Season selected'
}

export const SeasonSelected = createAction(SeasonActions.SEASON_SELECTED);
