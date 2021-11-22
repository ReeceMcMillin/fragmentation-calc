<script>
    import { empty } from "svelte/internal";
import { packetStore } from "./packetStore";

    class Network {
        constructor() {
            this.mtu = 600;
            this.packets = packetStore;
        }

        empty() {
            return this.packets == [];
        }

        push(packet) {
            this.packets.push(packet);
        }

        reset() {
            this.packets.reset();
        }

        fragment(packet) {
            this.reset();
            let total_offset = packet.offset * 8;
            let remaining_data = packet.total;

            while (remaining_data > this.mtu) {
                let max_data_size = this.mtu - packet.header * 4;
                let frag_data_size = max_data_size - (max_data_size % 8);
                let frag_total_size = frag_data_size + packet.header * 4;
                remaining_data -= frag_data_size;

                this.push({
                    header: packet.header,
                    total: frag_total_size,
                    offset: total_offset / 8,
                    data: frag_total_size - (packet.header * 4),
                });

                total_offset += frag_data_size;
            }
            this.push({
                header: packet.header,
                total: remaining_data,
                offset: total_offset / 8,
                data: remaining_data - (packet.header * 4),
            });
        }
    }

    export let network = new Network();
</script>

<div class="network container">
    <form>
        <div class="row">
            <div class="col-lg-4 col-lg-offset-4">
                <label for="mtu">MTU</label>
                <input
                    type="number"
                    class="form-control"
                    id="mtu"
                    placeholder="MTU"
                    bind:value={network.mtu}
                />
            </div>
        </div>
    </form>
<p></p>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Header</th>
                <th scope="col">Total</th>
                <th scope="col">Data</th>
                <th scope="col">Offset</th>
            </tr>
        </thead>
        <tbody>
            {#each $packetStore as p, i}
                <tr>
                    <td>{i+1}</td>
                    <td>{p.header}</td>
                    <td>{p.total}</td>
                    <td>{p.data}</td>
                    <td>{p.offset}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    table {
        margin-top: 2em;
        margin-bottom: 2em;
    }
</style>