// import

module.exports = function(inmw, bimw, mwscope){

    // inmw is the base array of simple inbound middleware

    // bimw are bidirectional middlewares.
    // two parts: ins run on in
    // outs must be grafted into the res.json in order to run in order


    // mwscope is a local variable scope for middleware variables
    // use this to store the results of costly initializations
    // or values needed over multiple middlewares

    bimw.forEach(function(bi){
	inmw.push(function(req, res, next){
	    if(bi.inbound) bi.inbound(req, res, mwscope);

	    var resjson = res.json;
	    res.json = function(jj){
		if(bi.outbound) bi.outbound(req, res, mwscope, jj, function(jr){
		    resjson.apply(res, [jr]);
		});
		else resjson.apply(res, [jj]); 
	    };

	    next();
	});
    });

    return inmw;
};
