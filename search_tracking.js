//use web storage API to store search querys and send the querys to the datalayer when the session is closed. -->

    (function(window){


        if (window['Storage']) {
            
            sessionStorage.setItem('session', 'true');
            sessionStorage.setItem('url', url);

            addEvent(window, 'message', function(message) {

                try{
                
                    //sessionStorage persists until the brwoser is closed
                    var arrrayOfQuerys = [];
                    var nextQuery = null;
                    var oldQuery = null;
                    var query = JSON.parse(message.query);

                    if(query != oldQuery) {
                        var nextQuery = query;
                        arrrayOfQuerys.push(nextQuery);
                        var oldQuery = nextQuery;
                        sessionStorage.setItem('queryArray', arrrayOfQuerys);
                        console.log(arrrayOfQuerys);
                        
                    }

            
                }catch(e){};
            });


         
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
                };
            } 

        }   
     
        }
  
})(window); 
