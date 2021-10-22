import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Season} from '../../data/models/season.model';
import {createReducer, on} from '@ngrx/store';
import {SeasonSelected} from './season.actions';

export interface SeasonsState extends EntityState<Season> {
    selectedSeasonId: string | null;
}

export const adapter: EntityAdapter<Season> = createEntityAdapter<Season>();
export const initialState: SeasonsState = adapter.getInitialState({
    selectedSeasonId: null
});

const _seasonReducer = createReducer(initialState,
    on(SeasonSelected, (state) => {
        return state;
    })
);

export function seasonReducers(state, action) {
    return _seasonReducer(state, action);
}
