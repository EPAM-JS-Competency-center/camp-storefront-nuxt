export interface StorageType {
    getItem(item: string): string | null;
    setItem(item: string, value: string): void;
    removeItem(item: string): void;
}

export function getStorage(): StorageType {
    if (process.client) {
        return window.localStorage
    } else {
        return {
            getItem: () => null,
            setItem: () => undefined,
            removeItem: () => undefined
        }
    }
}
