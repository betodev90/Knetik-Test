export class Device {
    constructor(
        public id: string,
        public location: number,
        public mac_address: string,
        public connected: boolean,
        public parent_location: number,
        public updated_at: string,
        public signal: number
    ) { }
}
