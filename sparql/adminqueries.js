var adminquery = {};

/*adminquery.getModules =
"select ?module"+"\n"+ 
"where{"+"\n"+
"?module <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/clls/module#Module> "+"\n"+"}";

adminquery.getSemesters =
"select ?sem"+"\n"+ 
"where{"+"\n"+
"?sem <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/clls/semester#Semester> "+"\n"+"}";
*/
adminquery.getAdmin = 
"select ?title ?module ?semester ?date"+"\n"+
"where {"+"\n"+
"?lecturename <http://purl.org/clls/lecture#date> ?date ."+"\n"+
"?lecturename <http://purl.org/dc/terms/title> ?title ."+"\n"+
"?lecturename <http://purl.org/clls/lecture#module> ?module ."+"\n"+
"?lecturename <http://purl.org/clls/lecture#semster> ?semester . "+"\n"+"}";

console.log(adminquery.getAdmin);

module.exports.adminquery = adminquery;
