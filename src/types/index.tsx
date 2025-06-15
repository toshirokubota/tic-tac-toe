
// export type TurnType = 'First' | 'Second';
//export type TileState = TurnType | undefined;

export const imageNames: string[] = ['/images/icon-x.svg', '/images/icon-o.svg'];
export type PlayerType = {
    image: string,
    cpu: boolean,
    you: boolean,
    wins: number,
    ties: number
}
export type TileType = {
    state: PlayerType | undefined;
    id: number;
}

