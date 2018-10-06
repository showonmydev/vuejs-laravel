export default {

    props: ['locations', 'alerts', 'campaign_id', 'questions'],

    template: '<div id="wink-map"></div>',

    data: () => {
        return {
            mapdiv: '',
            map: {}
        }
    },

    ready(){
        this.locations = JSON.parse(this.locations);
        this.alerts = JSON.parse(this.alerts);
        this.questions = JSON.parse(this.questions);

        this.gpsQuestions = this.questions.filter(function(question) {
            return question.input_type === 10;
        });

        this.loadMap();
        this.loadMarkers();
    },

    methods: {

        loadMap () {

            let centerLat = this.locations[0].latitude;
            let centerLong = this.locations[0].longitude;

            if(parseInt(centerLat) === 0 && parseInt(centerLong) === 0 && this.gpsQuestions.length > 0){
                // We have a question with a GPS point, so lets set the map center to the first one
                let gpsAnswer = this.gpsQuestions[0].answers[0];
                centerLat = gpsAnswer.answer_gpslat;
                centerLong = gpsAnswer.answer_gpslong;
            }

            this.mapdiv = document.getElementById('wink-map');
            this.map = new google.maps.Map(this.mapdiv, {
                center: new google.maps.LatLng(centerLat, centerLong),
                zoom: 9
            });
        },

        loadMarkers (){
            for (let campaignLocation of this.locations) {

                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(campaignLocation.latitude, campaignLocation.longitude),
                    map: this.map,
                    location_id: campaignLocation.id,
                    campaign_id: this.campaign_id,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                });

                google.maps.event.addListener(marker, 'click', function () {
                    alert('Will trigger loading this campaigns responses for this location');
                    //window.location.href = 'http://'+window.location.hostname + ':3000/reports/location/' + this.location_id + '/' + this.campaign_id;
                });
            }

            for (let campaignAlert of this.alerts) {

                console.log("alerts");

                console.log(campaignAlert);

                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(campaignAlert.location.latitude, campaignAlert.location.longitude),
                    map: this.map,
                    location_id: campaignAlert.location.id,
                    campaign_id: this.campaign_id,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                });

                google.maps.event.addListener(marker, 'click', function () {
                    alert('This is an alert');
                    //window.location.href = 'http://'+window.location.hostname + ':3000/reports/location/' + this.location_id + '/' + this.campaign_id;
                });
            }

            // List out the responses if we have a GPS response
            for (let gpsQuestion of this.gpsQuestions) {

                console.log("this.gpsQuestions",this.gpsQuestions);

                let answers = gpsQuestion.answers;
                
                for (let answer of answers){
                    let marker = new google.maps.Marker({
                        position: new google.maps.LatLng(answer.answer_gpslat, answer.answer_gpslong),
                        map: this.map,
                        campaign_id: answer.campaign_id,
                        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                    });
                }

            }
            
        }
        
    }
}