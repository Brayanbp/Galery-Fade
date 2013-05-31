(function($){
	var galeryFade=function(that,options){
		var opt={
				"panel":".gf-panel",
				"duration":2500
			};
		this.settings=$.extend(opt,options);
		this.architecture={};
		this._this=that;
	};
	galeryFade.prototype.init=function(){
		var that=this;
		that._this.each(function(index,value){
			that.construct($(that.settings["panel"],value),$(value),index);
			that.animate(index);
		});
	};
	galeryFade.prototype.construct=function(obj,parent,index){		
		var that=this,
			ind=index || 0,
			count=obj.length, //Cantidad de paneles
			panel=[]; //Array con instancias de paneles
		obj.each(function(index,value){
			panel.push($(value)); //Objeto Panel
			panel[index].css({"position":"absolute","top":"0","left":"0","z-index":(count-index)});
		});
		that.architecture[ind]={
			"parent":parent,
			"count":count,
			"panel":panel,
			"current":0
		};
	};
	galeryFade.prototype.animate=function(index){
		var that=this,
			count=that.architecture[index]["count"],
			active=that.architecture[index]["current"],
			current=((active+1)<count)?(active+1):0,
			parent=that.architecture[index]["parent"],
			pini=that.architecture[index]["panel"][active],
			pfinish=that.architecture[index]["panel"][current],
			reorder=function(excep){
				var arr=that.architecture[index]["panel"],
					zi=0;
				for(i=0;i<arr.length;i++){
					zi=(excep==i)?1:(parseFloat(arr[i].css("z-index"))+1);
					arr[i].css("z-index",zi);
				}
			};
			pini.animate({opacity:0},that.settings["duration"],function(){
				reorder(active);
				pini.css("opacity","1");
				that.architecture[index]["current"]=current;
				that.animate(index);
			});
	};
	$.fn.galeryFade = function( methods ) {
		if(typeof methods=="undefined" || methods.constructor==Object){
			var galery=new galeryFade(this,methods);
			galery.init();
		}else{
			$.error( 'El parametro proporcionado ' +  method + ' esta mal declarado o no es un objeto' );
		}
	};
})(jQuery);

$(function() {
    $(".galery-fade").galeryFade();
 });