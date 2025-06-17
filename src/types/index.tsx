

export type GamePhase = 'Setup' | 'Thinking1' | 'Played1' | 'Thinking2' | 'Played2' | 'Over' | 'Restart' | 'Idle';
export const imageNames: string[] = ['/images/icon-x.svg', '/images/icon-o.svg'];
export type PlayerType = {
    image: string,
    cpu: boolean,
    you: boolean,
    wins: number,
    ties: number
}
export type TileType = {
    state: number;
    id: number;
}

