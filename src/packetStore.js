import { writable } from 'svelte/store';

class PacketStore {
    constructor() {
        this.packets = writable([]);
    }

    push(packet) {
        this.packets.update((v) => [...v, packet]);
    }

    get() {
        return this.packets;
    }

    subscribe(run) {
        return this.packets.subscribe(run);
    }

    reset() {
        this.packets.set([]);
    }
}

export const packetStore = new PacketStore;