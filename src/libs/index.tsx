import type { PlayerType, TileType } from "../types";

export function staticAsset(assetName: string): string {
    return `${import.meta.env.BASE_URL}${assetName}`
}

function threeTileMatchBy(a: TileType, b: TileType, c: TileType, player: PlayerType): boolean {
    return player !== undefined && a.state === player && b.state === player && c.state === player;
}

export function checkForWinBy(tiles: TileType[], player: PlayerType): boolean {
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
    return tiles.map((_,i) => tiles[indices[i]]).find(tile => tile.state === undefined);
}

function isCrucial(tiles: TileType[], index: number, player: PlayerType) {
    const copy = tiles.map(tile => ({...tile}));
    copy[index].state = player;
    if(checkForWinBy(copy, player)) return true;
    else return false;
}

export function nextIntelligentMove(tiles: TileType[], me: PlayerType, opponent: PlayerType): TileType | undefined {
    for(let i=0; i<9; ++i) {
        const tile = tiles[i];
        if(tile.state === undefined) {
            if(isCrucial(tiles, i, me)) return tile;
        }
    }
    //const opponent = me ==='First'? 'Second': 'First'
    for(let i=0; i<9; ++i) {
        const tile = tiles[i];
        if(tile.state === undefined) {
            if(isCrucial(tiles, i, opponent)) return tile;
        }
    }
    console.log('next move randomly: ', tiles);
    return tiles[4].state === undefined ? tiles[4]: nextRandomMove(tiles);
}
