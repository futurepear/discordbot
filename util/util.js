function parseMS(ms){
  return {
    ms: ms,
    days: function(){
      return Math.floor(this.ms/(1000*60*60*24));
    },
    hours: function(){
      return Math.floor(this.ms/(1000*60*60)) - this.days()*24;
    },
    minutes: function(){
      return Math.floor(this.ms/(1000*60)) - this.hours()*60 - this.days()*60*24;
    },
    seconds: function(){
      return Math.floor(this.ms/1000) - this.minutes()*60 - this.hours()*60*60 - this.days()*60*60*24;
    },
    toOBJ: function(){
      return {
        days: this.days(),
        hours: this.hours(),
        minutes: this.minutes(),
        seconds: this.seconds()
      }
    },
    simplify: function(all){
      let obj = this.toOBJ();
      let res = {};
      for(let i in obj){
        if(obj[i] != 0){
          if(!all){
            return {i: obj[i]};
          } else{
            res[i] = obj[i];
          }
        }
      }
      return res;
    },
    stringify: function(){
      let obj = this.toOBJ();
      let res = "";
      for(let i in obj){
        if(obj[i] != 0)
          res += obj[i] + " " + i + ' ';
      }
      return res;
    }
  }
}

module.exports = {
  parseMS,
}