(function($) {
  $(function() {

 /* Settings
    =============================================== */
    // If no URL is hardcoded in the url variable then the user will be prompted
    // to enter a URL which will be stored in localStorage
    // example: http://192.168.1.50
    var url = '';
    var speed = 1000;

 /* Variables
    =============================================== */
    var $loader = $('.progress');
    var localStorageUrl = localStorage.getItem( 'url' );
    var $btn;
    var speed_slider = $('#speed_slider');
    $('.ask-ip').on('click',promptUserForUrl);
    var modelIsVisable = false;

    $('.add-gesture').on('click', addNewGesture);
    $('.remove-gesture').on('click', function(e){removeLastGesture(false)});
    $('.clear-gesture').on('click', function(e){removeLastGesture(true);});
    $('.send-gesture').on('click',function(e){sendGesture();});
    speed_slider.on('input', function(e){
        var el = $(this);
        setSpeedFromSlider(el.val());
    });

    var iconSelects = [];
    var totalAdded = 0;
    var iconSelect_icons = [];
    var selectHtml = ''
    var selectsList=[]
    var stepsList = [
        {'icon': 'assets/steps-swing.png','cmd':'M', 'arg1':8, 'arg2':1000, 'name':'Swing'},
        {'icon': 'assets/steps-jitter.png','cmd':'M', 'arg1':19, 'arg2':1000, 'name':'Jitter'},
        {'icon': 'assets/steps-flapping.png','cmd':'M', 'arg1':12, 'arg2':1000, 'name':'Flapping L'},
        {'icon': 'assets/steps-flapping.png','cmd':'M', 'arg1':13, 'arg2':1000, 'name':'Flapping R'},
        {'icon': 'assets/steps-moon.png','cmd':'M', 'arg1':6, 'arg2':1000, 'name':'MoonWalker L'},
        {'icon': 'assets/steps-moon.png','cmd':'M', 'arg1':7, 'arg2':1000, 'name':'MoonWalker R'},
        {'icon': 'assets/steps-ascending.png','cmd':'M', 'arg1':20, 'arg2':1000, 'name':'Ascending Turn'},
        {'icon': 'assets/steps-tiptoe.png','cmd':'M', 'arg1':14, 'arg2':1000, 'name':'Tiptoe swing'},
        {'icon': 'assets/steps-shakeleg.png','cmd':'M', 'arg1':17, 'arg2':1000, 'name':'Shake Leg L'},
        {'icon': 'assets/steps-shakeleg.png','cmd':'M', 'arg1':18, 'arg2':1000, 'name':'Shake Leg R'},
        {'icon': 'assets/steps-bend.png','cmd':'M', 'arg1':15, 'arg2':1000, 'name':'Bend L'},
        {'icon': 'assets/steps-bend.png','cmd':'M', 'arg1':16, 'arg2':1000, 'name':'Bend R'},
        {'icon': 'assets/steps-jump.png','cmd':'M', 'arg1':11, 'arg2':1000, 'name':'Jump'},
        {'icon': 'assets/steps-updown.png','cmd':'M', 'arg1':5, 'arg2':1000, 'name':'Up Down'},
        {'icon': 'assets/steps-crusaito.png','cmd':'M', 'arg1':9, 'arg2':1000, 'name':'Crusaito L'},
        {'icon': 'assets/steps-crusaito.png','cmd':'M', 'arg1':10, 'arg2':1000, 'name':'Crusaito R'}
                ];
    var musicList = [
        {'icon': 'assets/sounds-connect.png','cmd':'K', 'arg1':1, 'name':'Connect'},
        {'icon': 'assets/sounds-fart2.png','cmd':'K', 'arg1':14, 'name':'Fart2'},
        {'icon': 'assets/sounds-surprised.png','cmd':'K', 'arg1':3, 'name':'Surprised'},
        {'icon': 'assets/sounds-ohooh1.png','cmd':'K', 'arg1':4, 'name':'Ohooh 1'},
        {'icon': 'assets/sounds-ohooh2.png','cmd':'K', 'arg1':5, 'name':'Ohooh 2'},
        {'icon': 'assets/sounds-cuddle.png','cmd':'K', 'arg1':6, 'name':'Cuddle'},
        {'icon': 'assets/sounds-sleep.png','cmd':'K', 'arg1':7, 'name':'Sleep'},
        {'icon': 'assets/sounds-happy.png','cmd':'K', 'arg1':8, 'name':'Happy'},
        {'icon': 'assets/sounds-superhappy.png','cmd':'K', 'arg1':9, 'name':'Super Happy'},
        {'icon': 'assets/sounds-happyshort.png','cmd':'K', 'arg1':10, 'name':'Short Happy'},
        {'icon': 'assets/sounds-sad.png','cmd':'K', 'arg1':11, 'name':'Sad'},
        {'icon': 'assets/sounds-confused.png','cmd':'K', 'arg1':12, 'name':'Confused'}];

 /* Functions
    =============================================== */
    function onInit() {
            createTabular($('.steps-container'), stepsList, 4, 'btn-steps');
            createTabular($('.music-container'), musicList, 4, 'btn-music', true);
            // iconSelect_icons.push({'iconFilePath': 'assets/blank.png', 'iconValue':0});
            selectHtml = '<select id="gesture0" class="input-field col s12 icons">'
                            +'<option value="0" data-icon="assets/blank.png">None</option>';
            for(s of stepsList.concat(musicList)){
                // iconSelect_icons.push({'iconFilePath': s['icon'], 'iconValue': getCommandFromObject(s)});
                selectHtml+='<option value="'+getCommandFromObject(s)+'" data-icon="'+s['icon']+'">'+s['name']+'</option>';
            }
            selectHtml+= '</select>';

            $('.sidenav').sidenav();
            $('.tabs').tabs({swipeable: true});
            $('.dropdown-trigger').dropdown();
            $('select').formSelect();
            $('.modal').modal();
            
			checkForUrl();

			// listen for button clicks
            $btn = $('.btn-command')
			$btn.on('click', function() {
                command = getCommand($(this));
				if (command) {
					sendCommand(command);
				}
      });

      $('.speed-slow').on('click', function(){
        setSpeedFromMillis(2000);
      });
      $('.speed-medium').on('click', function(){
        setSpeedFromMillis(1000);
      });
      $('.speed-fast').on('click', function(){
          setSpeedFromMillis(700);
      });
    }

    function setSpeedFromMillis(val=1000){
        var min = parseInt(speed_slider.prop('min'));
        var max = parseInt(speed_slider.prop('max'));
        speed = parseInt(val);
        slideVal = parseInt( min + (max - min)/(3000 - 700)*(speed - 700) );
        $('.btn-steps').attr('data-arg2', speed).data('arg2', speed);
        speed_slider.val(slideVal);
    }
    function setSpeedFromSlider(val=1){
        val = parseInt(val);
        var min = parseInt(speed_slider.prop('min'));
        var max = parseInt(speed_slider.prop('max'));
        speed = parseInt(700 + (3000-700)/(max - min)*(val-min));
        $('.btn-steps').attr('data-arg2', speed).data('arg2', speed);
        speed_slider.val(val);
    }

    function editCommand(command){
        if(command[0]=='M')
            command=command.replace(/arg2=[0-9]*/, 'arg2='+speed);
        return command;
    }

    function getCommand(el){
        var command = el.data('command')+'?';      	
        var arg1 = el.data('arg1');
        var arg2 = el.data('arg2');
        var arg3 = el.data('arg3');
        var arg4 = el.data('arg4');
        if(arg1) command+='arg1='+arg1+'&';
        if(arg2) command+='arg2='+arg2+'&';
        if(arg3) command+='arg3='+arg3+'&';
        if(arg4) command+='arg4='+arg4+'&';

        return editCommand(command);
    }

    function getCommandFromObject(obj){
        var command = '';
        if(!obj['cmd'])
            return command;
        var arg1 = obj['arg1'];
        var arg2 = obj['arg2'];
        var arg3 = obj['arg3'];
        var arg4 = obj['arg4'];

        command += obj['cmd']+'?';    	
        if(arg1) command+='arg1='+arg1+'&';
        if(arg2) command+='arg2='+arg2+'&';
        if(arg3) command+='arg3='+arg3+'&';
        if(arg4) command+='arg4='+arg4+'&';

        return editCommand(command);
    }

    function createTabular(el, arr, rowSize=4, customClass="", addLabels=false){
        var child='<div class="row">';
        for(i=0; i<arr.length; ++i){
            if(i%rowSize == 0 && i!= 0){
                child+=('</div><div class="row">');
            }
            child+='<div class="col s'+12/rowSize+'"><a style=\'background-image: url("'+arr[i]['icon']+'");background-size: contain;\'';
            child+='class="'+customClass+' btn-command btn-floating btn-large waves-effect waves-light blue"';
            if(arr[i]['cmd'])
                child+= 'data-command="'+arr[i]['cmd']+'" ';
            if(arr[i]['arg1'])
                child+= 'data-arg1="'+arr[i]['arg1']+'" ';
            if(arr[i]['arg2'])
                child+= 'data-arg2="'+arr[i]['arg2']+'" ';
            if(arr[i]['arg3'])
                child+= 'data-arg3="'+arr[i]['arg3']+'" ';
            if(arr[i]['arg4'])
                child+= 'data-arg4="'+arr[i]['arg4']+'" ';
            
            child += '></a>';
            if(addLabels)
                child += '<label>'+ arr[i]['name'] +'</label>';
            child+='</div>';
        }
        child+=('</div>');
        el.append(child)
    }

    function addNewGesture(){
        var el = $(selectHtml.replace(/id="gesture[0-9]*"/, 'id=gesture'+(++totalAdded)));
        $('.choreography-container').append(el);
        el.on('change', function(e){
            console.log($(this).val());
        });
        el.formSelect();
        selectsList.push(el);
    }

    function removeLastGesture(all=false){
        while(selectsList.length != 0){
            selectsList.pop().parent().remove();
            if(!all) break;
        }
        if(all) totalAdded=0;
    }

    function sendGesture(index=0){
        if(index==selectsList.length){
            M.toast({html: 'Gesture Completed'});
            return;
        }
        if(selectsList[index].val=='0'){
            M.toast({html: 'Skipping Empty gesture'});
            sendGesture(index+1);
            return;
        }
        var command = selectsList[index].val();
        if(command[0]=='M')
            command=editCommand(selectsList[index].val());
        sendCommand(command, function(){sendGesture(index+1);});
        
    }

    function checkForUrl() {
        // if no url is found then prompt user to enter url
        if (!url) {
            if ( localStorageUrl ) {
                url = localStorageUrl;
            } else {
                promptUserForUrl();
                return;
            }
        }
    }

    function promptUserForUrl() {
    		if (modelIsVisable) {
    			// avoid multiple modals
					return;
    		}

    		modelIsVisable = true;

        var $modal = $('#modal-prompt').modal({
            dismissible: false,
            onCloseEnd: function() {
                setUrlInLocalStorage();
                modelIsVisable = false;
            }
        }); 
        $modal.modal('open');
    }

    function setUrlInLocalStorage() {
        // update global variable and store in local storage
        url = $( '#url' ).val();
        localStorage.setItem( 'url', url );        
    }

    function sendCommand(command, successFunc=function(){}) {
    	console.log('GET /' + command);
      
      $loader.show();

      $.ajax({ 
          type: 'GET',
          url: url + '/' + command,
          dataType: 'json',
          timeout: 5000,
          crossDomain: true,
          success: function(data) {
            console.log(data);
            successFunc()
          },
          error: function() {
              // Prompt user to re-enter URL:
              M.toast({html:'<i class="material-icons">close</i>&nbsp;&nbsp;&nbsp;No response from device',
                        classes: 'red lighten-1'});
              //setTimeout(function(){ promptUserForUrl(); }, 3000);
          },
          complete: function() {
              $loader.hide();
          }
      });
    }

    // Let's go!
    onInit();

  }); // end of document ready
})(jQuery); // end of jQuery name space
