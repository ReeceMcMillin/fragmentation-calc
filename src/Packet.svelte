<script>
    class Packet {
        constructor(header, total, offset) {
            this.header = header;
            this.total = total;
            this.offset = offset;
            this.data = this.total - this.header * 4;
        }
    }

    export let packet = new Packet(5, 1200, 0);
</script>

<div class="form-inline container">
    <form>
        <div class="row">
            <div class="col">
                <label for="header">Header</label>
                <input
                    type="number"
                    class="form-control"
                    id="header"
                    bind:value={packet.header}
                    placeholder="Header"
                />
            </div>
            <div class="col">
                <label for="total">Total Length</label>
                <input
                    type="number"
                    class="form-control"
                    id="total"
                    bind:value={packet.total}
                    placeholder="Total"
                    label="Total"
                />
            </div>
            <div class="col">
                <label for="offset">Offset</label>
                <input
                    type="number"
                    class="form-control"
                    id="offset"
                    bind:value={packet.offset}
                    placeholder="Offset"
                />
            </div>
        </div>
    </form>
</div>
