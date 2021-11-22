class Packet {
    constructor(header, total, offset) {
        this.header = header;
        this.total = total;
        this.offset = offset;
        this.data = this.total - (this.header * 4);
    }
}

class Network {
    constructor(mtu) {
        this.mtu = mtu;
        this.packets = [];
    }

    fragment (packet) {
        let total_offset = packet.offset * 8;
        let remaining_data = packet.total;
        while (remaining_data > this.mtu) {
            let max_data_size = this.mtu - (packet.header * 4);
            let frag_data_size = max_data_size - (max_data_size % 8);
            let frag_total_size = frag_data_size + (packet.header * 4);
            remaining_data -= frag_data_size;
    
            let fragment = new Packet(packet.header, frag_total_size, total_offset / 8);
            total_offset += frag_data_size;
            this.packets.push(fragment);
        }
        this.packets.push(new Packet(packet.header, remaining_data, total_offset / 8))
    }
}

function fragment_single_network (packet, network) {
    console.log("\tNetwork with MTU", network.mtu);
    network.fragment(packet);
    console.log("\t", network.packets);
    return network.packets;
}

function fragment_multiple_networks (packet, networks) {
    let packets = [packet];
    let network_outputs = [];
    networks.forEach((network, index) => {
        console.log("\tNetwork", index, "with MTU", network.mtu);
        packets.forEach(packet => {
            network.fragment(packet);
        })
        packets = network.packets;
        console.log("\t", network.packets);
        network_outputs.push(network.packets);
    });
    return network_outputs;
}

export { Packet, Network, fragment_single_network, fragment_multiple_networks };

// var original = new Packet(5, 800, 0);

// let network_a = new Network(200);
// let network_b = new Network(150);
// let network_c = new Network(110);

// let hw3 = new Network(600);
// let packet6 = new Packet(5, 1200, 253);

// let networks = [network_a, network_b];

// console.log("Single network (HW4): ")
// fragment_single_network(packet6, hw3);

// console.log("Multiple networks (Midterm 2): ")
// fragment_multiple_networks(original, networks);


// network_a.fragment(original);

// network_a.packets.forEach(packet => {
//     network_b.fragment(packet);
// })

// console.log(network_a.packets);
// console.log(network_b.packets);

// hw3.fragment(packet6);
// console.log(hw3.packets);
