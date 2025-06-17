import type { GamePhase, PlayerType, TileType } from "../types";

export function staticAsset(assetName: string): string {
    return `${import.meta.env.BASE_URL}${assetName}`
}

function threeTileMatchBy(a: TileType, b: TileType, c: TileType, player: number): boolean {
    return player >= 0 && a.state === player && 
        b.state === player && c.state === player;
}

export function checkForWinBy(tiles: TileType[], player: number): boolean {
    return threeTileMatchBy(tiles[0], tiles[1], tiles[2], player) ||
        threeTileMatchBy(tiles[3], tiles[4], tiles[5], player) ||
        threeTileMatchBy(tiles[6], tiles[7], tiles[8], player) ||
        threeTileMatchBy(tiles[0], tiles[3], tiles[6], player) ||
        threeTileMatchBy(tiles[1], tiles[4], tiles[7], player) ||
        threeTileMatchBy(tiles[2], tiles[5], tiles[8], player) ||
        threeTileMatchBy(tiles[0], tiles[4], tiles[8], player) ||
        threeTileMatchBy(tiles[2], tiles[4], tiles[6], player);
}

function randomShuffleIndices(N: number): number[] {
    const numbers = Array.from({ length: N }, (_, i) => i);
    // Random shuffle using sort
    return numbers.sort(() => Math.random() - 0.5);
}

export function nextRandomMove(tiles: TileType[]): TileType | undefined{
    const indices = randomShuffleIndices(9);
    return tiles.map((_,i) => tiles[indices[i]]).find(tile => tile.state < 0);
}

function isCrucial(tiles: TileType[], index: number, player: number) {
    const copy = tiles.map(tile => ({...tile}));
    copy[index].state = player;
    if(checkForWinBy(copy, player)) return true;
    else return false;
}

export function nextIntelligentMove(tiles: TileType[], me: number, opponent: number): TileType | undefined {
    for(let i=0; i<9; ++i) {
        const tile = tiles[i];
        if(tile.state < 0) {
            if(isCrucial(tiles, i, me)) return tile;
        }
    }
    //const opponent = me ==='First'? 'Second': 'First'
    for(let i=0; i<9; ++i) {
        const tile = tiles[i];
        if(tile.state < 0) {
            if(isCrucial(tiles, i, opponent)) return tile;
        }
    }
    console.log('next move randomly: ', tiles);
    return tiles[4].state < 0 ? tiles[4]: nextRandomMove(tiles);
}

//I have flattened nested objects, so JSON.stringify() will do, but heck.
export const customStringify = (players: PlayerType[], tiles: TileType[], 
    turn: number, winner: number, phase: GamePhase) => {
    const obj = {players, tiles, turn, winner, phase};
    //console.log('customStringify()', players, tiles, turn, winner, phase);
    return JSON.stringify(obj);
}
//Again, I have flattened nested objects, so JSON.parse() will do, but heck.
export const customParse = (str: string) => {
    return JSON.parse(str);
    // console.log('customParse: ', parsed);
    // const players: PlayerType[] = parsed.players;
    // const turn: number = parsed.turn;
    // const winner: number = parsed.winner;
    // const tiles: TileType[] = parsed.tiles;
    // const phase: GamePhase = parsed.phase;
    // return {players, tiles, turn, winner, phase};
}