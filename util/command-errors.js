module.exports = function(user){
  if(user == null)
    throw new Error("you do not own a farm, type /found to get started", {cause: user});
}