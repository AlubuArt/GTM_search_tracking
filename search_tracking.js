//use web storage API to store search querys and send the querys to the datalayer when the session is closed. -->
  

  
  (function(window) {
    
            var arrrayOfQuerys = [];
            var nextQuery = '';
            var oldQuery = '';
    

            addEvent(window, 'message', function(message) {
            localStorage.setItem('session', 'true');

                    //Parse the message object send from child container
              		var data = JSON.parse(message.data);
              		var dataLayer = window.dataLayer || (window.dataLayer = []);
              		var localSession = null;

                    //if the query isnt already in the storage, push the query into the array, and push the array to the datalayer
                    if(data.query != oldQuery) {
                        nextQuery = data.query;
                        arrrayOfQuerys.push(nextQuery);
                        oldQuery = nextQuery;
                      	console.log(oldQuery);
                      	localStorage.setItem('queryArray', arrrayOfQuerys);
                      	localSession = localStorage.getItem('queryArray');
                      	dataLayer.push({
                    	'event': data.event,
                    	'querys': localSession,
   
                    })}
                      
                    
              
              		
            });
    
    				
					
            
			console.log(arrrayOfQuerys);
    
    		

         
            // Cross-browser event listener
            function addEvent(el, evt, fn) {
                if (el.addEventListener) {
                el.addEventListener(evt, fn);
                } else if (el.attachEvent) {
                el.attachEvent('on' + evt, function(evt) {
                    fn.call(el, evt);
                });
                } else if (typeof el['on' + evt] === 'undefined' || el['on' + evt] === null) {
                el['on' + evt] = function(evt) {
                    fn.call(el, evt);
            }
                  
        }};
            

        
})(window);
