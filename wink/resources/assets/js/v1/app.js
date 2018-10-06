/**
 * Created by phil on 15/03/13.
 */
var AppSettings = {
    DEBUGMODE: true //change to turn on/off console.log statements
};
var Debug = {
    log: function (string, variable) {
        if (AppSettings.DEBUGMODE) {
            try { console.log(string, variable); }
            catch (e) { }
        }
    },
    warn: function (string, variable) {
        if (AppSettings.DEBUGMODE) {
            try { console.warn(string, variable); }
            catch (e) { }
        }
    }
};

console.log('working');

var Header = {
    init: function(){
        Header.tabs();
    },
    tabs: function(){
        $(".header__tabs a").on('click', function (event) {
            event.preventDefault(); // Stop native action
            $this = $(this);
            $tab = $this.data('tab');
            $('.header__tab a').removeClass('active'); // remove class from any current active
            $this.addClass('active'); // add class to new current
            $('.tab-pane').hide(); // hide the current content
            $('#'+$tab).fadeIn(500).addClass('active'); // show the new content
        });
    }
};

var Campaign = {

    init: function(){
        Campaign.watchForType();
        Campaign.addOptions();
        Campaign.addOption();
        Campaign.updateOption();
    },
    processInputs: function($inputs){
        var values = {};
        $inputs.each(function() {
            values[this.name] = $(this).val();
            if(this.name === 'checkbox'){
                values[this.name] = $(this).is(':checked') ? true : false;
            }
        });
        return values;
    },
    watchForType: function(){
        // When someone changes the question type select
        $('.question-add select').on("change", function(e){
            // If the value is Dropdown

            $('.show-alert__text, .show-alert__select, .show-alert__input').show();
            $('.show-alert__text-notavailable').hide();
            $('#collapseOptions').collapse('hide');
            $("[class*='show-alert__type-']").hide();

            if(this.value == 1){
                $('.show-alert__type-text').show();
            } else if(this.value == 2) {
                $('#collapseOptions').collapse('show');
                $('.show-alert__type-dropdown').show();
            } else if(this.value == 6 || this.value == 9 || this.value == 10) {
                $('.show-alert__text, .show-alert__select, .show-alert__input').hide();
                $('.show-alert__text-notavailable').show();
            } else if(this.value == 7){
                $('.show-alert__type-boolean').show();
            } else if(this.value == 8){
                $('.show-alert__type-rating').show();
            }
        });
        $('.question-edit select').on("change", function(e){
            var index = $(this).parents('.question-edit').data('index');
            Debug.log(index);
            // If the value is Dropdown
            if(this.value == 2){
                $('#collapseOptions'+index).collapse('show');
            } else {
                $('#collapseOptions'+index).collapse('hide');
            }
        });
    },
    addOptions: function(){
        var max_fields = 20; //maximum input boxes allowed
        var wrapper    = $(".option_input_fields_wrap"); //Fields wrapper
        var add_button = $(".add_field_button"); //Add button ID
        var x          =1;
        
        $(add_button).click(function(e){ //on add input button click
            e.preventDefault();

            $thisQuestionOptions = $(this).parents('.collapseOptions');
            x = $thisQuestionOptions.find('input[type=text]').length; //initlal text box count
            var inputValue = $(this).parents('.option_input_fields_wrap').find('input').last().val();
            if(x < max_fields && inputValue != ""){ //max input box allowed
                var newID = $thisQuestionOptions.attr('id')+'option'+x;
                $thisQuestionOptions.find(".add_field_button").before('<div id="'+newID+'" data-index="'+x+'"><input type="text" name="option[]" placeholder="Type your option and press enter"/><span class="remove_field ion-ios-trash-outline"></span></div>'); //add input box
                $('#' + newID + ' input[type=text]').focus();
                var $optionValues = $(this).parent().find('input');
                var optionValue = $optionValues.eq(x - 1).val();
                $thisQuestionOptions.parent().find('.show-alert__select-reference').append(
                    $('<option></option>').val(optionValue).html(optionValue)
                );
                x++; //text box increment
            }
        });
        
        $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
            e.preventDefault();
            var $this = $(this);
            var $parent = $this.parent();
            $thisQuestionOptions = $this.parents('.collapseOptions');
            $options = $thisQuestionOptions.parent().find('.show-alert__select-reference option');
            console.log($options.lenght);
            ($options.length) ? $options[$parent.data('index') + 1].remove() : null;
            $parent.remove();
        })
    },
    addQuestion: function(){
        // On #questionForm submit send the response to the server. 
        // On return add the line view
        // $( ".questionForm" ).submit(function( event ) {
        //     event.preventDefault();

        //     Debug.log("questionForm Submit");
            
        //     $form = $(this);
        //     var $inputs = $('.questionForm :input');

        //     Debug.log($inputs);

        //     var values = Campaign.processInputs($inputs);

        //     Debug.log(values);

        //     var optionsArray = [];
        //     $('.option_input_fields_wrap input[type="text"]').each(function(i){
        //         if(this.value !== ""){
        //             optionsArray.push(this.value);
        //         }
        //     });

        //     if(optionsArray.length > 0){
        //         values.optionsArray = optionsArray;
        //     }

        //     var required = (values.required === "on") ? "Yes" : "No";

        //     $.ajax({
        //         type: "POST",
        //         url: "/"+$form.attr('action'),
        //         data: values
        //     }).done(function(data) {
        //         $("#questionForm").trigger('reset');
        //         $('#collapseOptions').collapse('hide');
        //         location.reload();
        //     });
        // });
    },
    updateQuestion: function (){
        // On #questionUpdateForm submit send the details to the server for updating
        $( ".questionUpdateForm" ).submit(function(event) {
            event.preventDefault();
            
            $form = $(this);

            Debug.log($form.data('index'));

            var $inputs = $form.find(':input');
            var values = Campaign.processInputs($inputs);
            var optionsArray = [];
            $('.questionUpdateForm[data-index='+$form.data('index')+'] .option_input_fields_wrap input[type="text"]').each(function(i){
                if(this.value !== ""){
                    Debug.log(this.value);
                    optionsArray.push(this.value);
                }
            });

            if(optionsArray.length > 0){
                values.optionsArray = optionsArray;
            }

            $.ajax({
                type: "POST",
                url: "/"+$form.attr('action'),
                data: values
            }).done(function() {
                location.reload();
            });
        });
    },
    addOption: function(){
        // On #questionForm submit send the response to the server. 
        // On return add the line view
        $( ".optionForm" ).submit(function( event ) {
            event.preventDefault();

            Debug.log('option form');
            
            $form = $(this);
            var $inputs = $form.find(':input');
            var values = Campaign.processInputs($inputs);

            Debug.log(values);

            $.ajax({
                type: "POST",
                url: "/"+$form.attr('action'),
                data: values
            }).done(function() {
                $form.trigger('reset');
                $("#"+$form.parent().attr('id')).collapse('hide');
            });
        });
    },
    updateOption: function (){
        // On #questionUpdateForm submit send the details to the server for updating
        $( ".optionUpdateForm" ).submit(function(event) {
            event.preventDefault();
            
            $form = $(this);
            var $inputs = $form.find(':input');
            var values = Campaign.processInputs($inputs);

            $.ajax({
                type: "POST",
                url: "/"+$form.attr('action'),
                data: values
            }).done(function() {
                $("#"+$form.parent().attr('id')).collapse('hide');
            });
        });
    }
};

var Dashboard = {

    init: function(){
        $('[data-toggle="popover"]').popover({html:true});
        //Dashboard.tableSort();
    },
    tableSort: function(){
        var options = {
            valueNames: [ 'name', 'brand', 'activity' ]
        };

        new List('dashboard-all', options);
        new List('dashboard-draft', options);
        new List('dashboard-active', options);
        new List('dashboard-complete', options);
    }
};

var LaunchButton = {

    // Set value of hidden field launch_campaign = 'true'
    
    init: function(){


        $(document).on("click", '.campaign--launch', function(e) {

            Debug.log("launch");

            var launch_campaign = $('input[name="launch_campaign"]').val();

            if (launch_campaign == 'false') {
                e.preventDefault();
                $('input[name="launch_campaign"]').val('true');
                setTimeout(function() {
                    $( ".campaign__form" ).submit();
                }, 200);
            }
        });

        $(document).on("click", '.campaign--schedule', function(e) {

            Debug.log("schedule");

            var schedule_campaign = $('input[name="schedule_campaign"]').val();

            if (schedule_campaign == 'false') {
                e.preventDefault();
                $('input[name="schedule_campaign"]').val('true');
                setTimeout(function() {
                    $( ".campaign__form" ).submit();
                }, 200);
            }
        });

        $(document).on("click", '.campaign--save', function(e) {

            Debug.log("save");

            var launch_campaign = $('input[name="launch_campaign"]').val();

            if (launch_campaign == 'true') {
                e.preventDefault();
                $('input[name="launch_campaign"]').val('false');
                setTimeout(function() {
                    $( ".campaign__form" ).submit();
                }, 200);
            }
        });

        $(document).on("click", '.campaign--update', function(e) {

            Debug.log("update");

            var update_campaign = $('input[name="update_campaign"]').val();

            if (update_campaign == 'false') {
                e.preventDefault();
                $('input[name="update_campaign"]').val('true');
                setTimeout(function() {
                    $( ".campaign__form" ).submit();
                }, 200);
            }
        });

    }

};

var Reports = {

    init: function() {
        // Chart Global Settings
        Chart.defaults.global.responsive = true;
        Chart.defaults.global.tooltipFillColor = "rgba(0,0,0,0.2)";
        Chart.defaults.global.tooltipTemplate = "<%if (label){%><%=label%>: <%}%><%= value %>";
        Chart.defaults.global.tooltipXOffset = 50;

        Reports.prepCharts();
        Reports.dataWidth();
        Reports.activeTab();

    },
    prepCharts: function(){
        $(".report-mini__chart").each(function(){
            $this = $(this);
            ($this.data('type') === 'pie') ? Reports.pieChart($this): false;
            ($this.data('type') === 'bar') ? Reports.barChart($this): false;

        });
    },
    barChart: function(){
        var ctx = $this.get(0).getContext("2d");
        var data = $this.data('data');
        var colours = $this.data('colors').split(',');
        var labels_array = [];
        var data_array = [];
        var i = 0;
        $.each(data, function(key, value){
            labels_array.push(key);
            data_array.push(value);
            i++;
        });
        var data = {
            labels: labels_array,
            datasets: [{
                fillColor: colours[0],
                strokeColor: colours[1],
                highlightFill: colours[2],
                highlightStroke: colours[3],
                data: data_array
            }]
        };
        var thisChart = new Chart(ctx).Bar(data);
    },
    pieChart: function($this){
        var ctx = $this.get(0).getContext("2d");
        var data = $this.data('data');
        var colours = $this.data('colors').split(',');
        var data_array = [];
        var i = 0;
        $.each(data, function(key, value){
            data_array.push({
                color: colours[i],
                value: value,
                label: key
            });
            i++;
        });
        var thisChart = new Chart(ctx).Pie(data_array);
        $this.parent().next().html(thisChart.generateLegend());
    },
    dataWidth: function(){
        var number = $('.report-data__header > .report-data__cell').length;
        $('.report-data__header, .report-data__body').css({
            width: number*200+"px"
        });
    },
    activeTab: function(){
        if(window.location.hash) {
            $('.header__tabs a[href="#'+window.location.hash.substring(1)+'"]').tab('show')
        }
    }

};

var Main = {
    run: function () {
        Debug.log('App is running');
        Header.init();
        Campaign.init();
        Dashboard.init();
        LaunchButton.init();
        Reports.init();
    }
};

// This function kicks off the application
$(document).ready(Main.run);