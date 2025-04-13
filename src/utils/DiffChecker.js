import LineState from "./LineState";

export default class DiffChecker {
    constructor() {
        this.original = [];
        this.modified = [];
        this.lcs = [];
    }

    generateLcs(original, modified) {
        this.original = [...original];
        this.modified = [...modified];
        const m = this.original.length;
        const n = this.modified.length;

        /*
        const LCSTable = new Array(m + 1).fill(null).map(() => new Array(n + 1));

        for (let i = 0; i <= m; i++) {
            for (let j = 0; j <= n; j++) {
                if (i === 0 || j === 0)
                    LCSTable[i][j] = 0;
                else if (this.original[i - 1] === this.modified[j - 1])
                    LCSTable[i][j] = LCSTable[i - 1][j - 1] + 1;
                else
                    LCSTable[i][j] = Math.max(LCSTable[i - 1][j], LCSTable[i][j - 1]);
            }
        }

        let i = m, j = n;
        const result = [];

        while (i > 0 && j > 0) {
            if (this.original[i - 1] === this.modified[j - 1]) {
                result.push(this.original[i - 1]);

                i--;
                j--;
            }

            else if (LCSTable[i - 1][j] > LCSTable[i][j - 1])
                i--;
            else
                j--;
        }
        this.lcs = result.reverse();
        */

        const indexes = new Set();
        const result = [];
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (this.original[i] === this.modified[j] && !indexes.has(j)) {
                    indexes.add(j);
                    result.push(this.original[i]);
                    break;
                }
            }
        }

        this.lcs = result;
    }

    getInBetween(from, str, array) {
        let c = 0;
        for (let i = from; i < array.length; i++) {
            if (array[i] === str) {
                break;
            }
            c++;
        }

        return c;
    }

    getDiff(base, cmp, state) {
        const result = [];
        const lcsCopy = [...this.lcs];
        let auxIdx = 0, c = 0;

        for (let i = 0; i < base.length; i++) {
            const iLcs = lcsCopy.indexOf(base[i]);
            if (iLcs !== -1) {
                lcsCopy.splice(iLcs, 1);
                const n = this.getInBetween(auxIdx, base[i], cmp);
                auxIdx += n + 1;

                for (let j = 0; j < n - c; j++) {
                    result.push({state: LineState.EMPTY, text: "."});
                }
                c = 0;
                result.push({state: LineState.EQUAL, text: base[i]});
            }
            else {
                c++;
                result.push({state: state, text: base[i]});
            }
        }

        for (let i = 0; i < this.getInBetween(auxIdx, null, cmp) - c; i++) {
            result.push({state: LineState.EMPTY, text: "."});
        }

        return result;
    }

    getModifiedDiff() {
        return this.getDiff(this.modified, this.original, LineState.ADDED);
    }

    getOriginalDiff() {
        return this.getDiff(this.original, this.modified, LineState.REMOVED);
    }
}