export class Event {

    public eventId: number;
    public eventTitle: string;
    public eventDescription: string;
    public eventDate: string;
    public eventTime: string;
    public lat: number;
    public lng: number;

    constructor(
        eventId: number, 
        eventTitle: string, 
        eventDescription: string, 
        eventDate: string, 
        eventTime: string, 
        lat: number, 
        lng: number
    ) {
        this.eventId = eventId;
        this.eventTitle = eventTitle;
        this.eventDescription = eventDescription;
        this.eventDate = eventDate;
        this.eventTime = eventTime;
        this.lat = lat;
        this.lng = lng;
    }


}
