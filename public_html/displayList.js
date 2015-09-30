//modified displayList from Erik Harpstead


"use strict";
(function () {

        var DisplayList = (function () {
        var can = null;
        var ctx = null;
        var dl = [];
        function DisplayList() {
            this.log = false;
        }
        
        DisplayList.prototype.setup = function(canvas) {
            can = canvas;
            ctx = canvas.getContext("2d");
        };
        
        DisplayList.prototype.addGraphicalObject = function (go) {
                dl.push(go);
                this.redraw();
           
        };
        
        DisplayList.prototype.redraw = function () {
            if(can) {
                ctx.clearRect(0, 0, can.width, can.height);
                for (var i = 0; i < dl.length; i++) {
                    if(dl[i].draw) {
                        dl[i].draw(ctx);
                    }
                }
            }
        };
        
        DisplayList.prototype.removeGraphicalObject = function(go) {
            var dex = dl.indexOf(go);
            if(dex >= 0) {
                var ret = dl.splice(dex,1)[0];
                this.redraw();
                return ret;
            }
            else {
                return null;
            }
        };
        
        DisplayList.prototype.getObjectContaining = function (x,y) {
            if(can) {
                for (var i = dl.length-1; i >= 0; i--) {
                    if(dl[i].contains(x,y)){
                            return dl[i];
                        }
                    }
                }
            return null;
        };


        
        DisplayList.prototype.getObject = function(i){
                return dl[i];
            
        };
        
        //getObject returns the object in the DisplayList array in position i
        
        return DisplayList;
    })();
    
    window.dl = new DisplayList();
})();