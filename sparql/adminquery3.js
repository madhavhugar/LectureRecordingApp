var adminquery3 = {};
adminquery3.getSemesters =
"select ?sem"+"\n"+ 
"where{"+"\n"+
"?sem <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/clls/semester#Semester> "+"\n"+"}";

module.exports.adminquery3 = adminquery3;
