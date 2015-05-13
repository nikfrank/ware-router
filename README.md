ware-router allows you to have bi directional middleware


I'm too lazy to doc it right now, which would be longer than the code


you should read the code. it's very nice.




    // sample code
    //
    //
    // middleware in/out stack
    //
    //
    //

    var ii = [
	function(req, res, next){
	    console.log('normal 1');
	    next();
	},
	function(req, res, next){
	    console.log('normal 2');
	    next();
	}
    ];

    var bb = [{
	inbound:function(req, res, scope){
	    console.log('in 1');
	},
	outbound:function(req, res, scope, pon, json){
	    pon.a = 'a';
	    json(pon);
	}
    },{
	inbound:function(req, res, scope){
	    console.log('in 2');
	},
	outbound:function(req, res, scope, pon, json){
	    pon.b = 'b';
	    json(pon);
	}
    }];



    // call pre-db auth and custom middleware hooks
    // call db api work
    // call authFiltering and custom middleware post hooks
    app.get('/blah', ware(ii, bb, {}), function(req, res){
	return res.json({});
    });
