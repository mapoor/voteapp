
$(document).ready(function(){

    var p_id = 0;
    $("#fm_crt").submit(function(e){
        e.preventDefault();
        alert("Submitted");
        $.ajax({
        	type: "POST",
        	dataType: "json",
        	url: "/create",
        	data: $(".uk-form").serialize(),
        	success: function(d){
        		alert("ajax success function.");
        		p_id = d.p_id;
        		$("#gen_u").text(location.origin+"/poll?p_id="+p_id)
        		var modal = $.UIkit.modal("#gen_m");
	    		modal.show();
        	},
        	error: function(e,b,c){
        		alert("ajax error function.");
        		console.log(e);
        		console.log(b);
        	},
        	complete: function(){
        		//location.href = "/show?"+"id="+id;
        	}
        });
    });
    $("#gen_m").on({
    	"uk.modal.hide": function(){
    		location.href = "/show?"+"p_id="+p_id;
    	}
    });

    //make checkbox like radio
    var ckid = -1;
    for (var i = $(":checkbox").length - 1; i >= 0; i--) {
    	$(":checkbox")[i].checked = false; //init
    };
    $(":checkbox").click(function(){
    	if(ckid != -1)
	    	$(":checkbox")[ckid].checked = false;

    	var flg = 0;
    	var idx = 0;
    	$(":checkbox").each(function(){
    		if($(this)[0].checked == true){
    			ckid = idx;
    			flg = 1;
    		}
    		idx++;
    	});
    	if (flg == 0)
    		ckid = -1;
    });

    $("#fm_poll").submit(function(e){
        e.preventDefault();
        var flg = 0;
        var idx = 0;
        $(":checkbox").each(function(){
    		if($(this)[0].checked == true){
    			flg = idx+1;
    		}
    		idx++;
    	});
    	if(flg == 0){
    		var modal = $.UIkit.modal("#error_m");
    		modal.show();
    		return;
    	}

    	p_id = location.search.substring(1).split('=')[1];
        $.ajax({
        	type: "POST",
        	dataType: "json",
        	url: "/poll",
        	data: {"opt_idx":flg, "p_id":p_id},
        	success: function(d){
        		alert("ajax success function.");
        		res = d.result_code;
        		p_id = d.p_id
        		console.log(d.result_msg);
        	},
        	error: function(e,b,c){
        		alert("ajax error function.");
        		console.log(e);
        		console.log(b);
        	},
        	complete: function(){
        		location.href = "/show?"+"p_id="+p_id;
        	}
        });

    });
});

