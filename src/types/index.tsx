
export type TurnType = 'First' | 'Second';
export type TileState = TurnType | undefined;

export type TileType = {
    state: TileState;
    id: number;
}
