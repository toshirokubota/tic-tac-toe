
// export type TurnType = 'First' | 'Second';
//export type TileState = TurnType | undefined;

export const imageNames: string[] = ['/images/icon-o.svg', '/images/icon-x.svg'];
export type PlayerType = {
    image: string,
    cpu: boolean,
    wins: number,
    ties: number
}
export type TileType = {
    state: PlayerType | undefined;
    id: number;
}

