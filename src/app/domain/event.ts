export class Event {

    public id: number;
    public event_title: string;
    public event_description: string;
    public event_date: string;
    public event_time: string;
    public event_address: string;
    public lat: number;
    public long: number;

    constructor(
        eventId: number,
        eventTitle: string,
        eventDescription: string,
        eventDate: string,
        eventTime: string,
        eventAddress: string,
        lat: number,
        lng: number
    ) {
        this.id = eventId;
        this.event_title = eventTitle;
        this.event_description = eventDescription;
        this.event_date = eventDate;
        this.event_time = eventTime;
        this.event_address = eventAddress;
        this.lat = lat;
        this.long = lng;
    }


}
